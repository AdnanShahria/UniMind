# UniMind Unified Architecture & API Documentation

This document consolidates the API, Database, Frontend, Dashboard, and Scale Architecture for the UniMind platform.

---

## 1. System Scale & Performance Analysis (500k Concurrent Users)

**Supabase Free Tier Limits vs 500k User Workload:**
*   **Realtime Connections:** Free tier allows **200 concurrent connections**. 500,000 active concurrent users will instantly crash this limit.
*   **Auth (Monthly Active Users):** Free tier is limited to **50,000 MAU**. 500,000 users is 10x over the limit.
*   **Database Storage:** Free tier is limited to **500 MB**. 2,500,000 daily inserts (notes, posts, comments) will rapidly exhaust this.
*   **API Requests & Bandwidth:** API requests are technically unlimited, but Egress (bandwidth) is capped at **5 GB/month**. 35 million daily requests will almost certainly exceed this egress limit within hours.
*   **Project Pausing:** Free tier projects pause after 1 week of inactivity (though with 500k users, inactivity isn't the problem).

**Conclusion on Free Tier:** Yes, a 500k concurrent user base will completely crush the Supabase Free Tier within minutes. You would need to upgrade to at least a Supabase Team/Enterprise Plan or self-host Supabase on robust AWS/GCP infrastructure to handle this scale.

**Scale Optimizations (Implemented vs Needed):**
*   **WebSocket Broadcasts:** We optimized this in `TopBar.tsx` using `filter: user_id=eq.${user.id}`. This prevents global fan-outs and limits broadcasts to O(1).
*   **Trigger Locks:** The current `notify_on_announcement` trigger loops over community members, which blocks DB transactions. **Optimization Needed:** Move to an async message queue or use bulk `INSERT...SELECT` operations.
*   **RLS Query Cost:** Optimized using indices (`idx_notes_author`, `idx_community_members_user`) to prevent heavy nested loops. 

---

## 2. Backend API Worker (`api/src/index.ts`)

The secure backend API server routes, middleware CORS configurations, and automatic offline fallback layers run inside a Cloudflare Worker on port `8787`.

### Server Routing & HTTP Methods
| Endpoint | HTTP Method | Description |
| :--- | :--- | :--- |
| `/` or `/status` | `GET` | Health status and environment config verification. |
| `/auth/register` | `POST` | Registers a new user. Falls back to local in-memory DB if offline. |
| `/auth/login` | `POST` | Authorizes existing user. Falls back to local in-memory DB if offline. |

*   **CORS:** Automatically handles local development fetch calls (`Access-Control-Allow-Origin: *`).
*   **Mock Fallback DB:** A local `Map<string, any>` stores mock users. If Supabase is offline, the API seamlessly falls back to this memory map, allowing offline registration and login.

---

## 3. Database API Integration

The database layer connects to Supabase PostgREST, mapping Postgres tables to RESTful endpoints.

*   **Credentials:** Stored in `.dev.vars` (`DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`).
*   **Storage (R2):** Uses Cloudflare R2 bucket (`unimind`) for files.

### Supabase Auth Pipelines
*   **Signup (`POST /auth/v1/signup`):** Registers via HTTPS. A PostgreSQL trigger copies auth data to the public `users` table.
*   **Login (`POST /auth/v1/token?grant_type=password`):** Returns a JWT `access_token` and `refresh_token` for session persistence.

---

## 4. Frontend Auth Pipeline (`AuthPage.tsx`)

The frontend coordinates with the Backend API Worker to manage user authentication state.

*   **Client Validation:** Enforces non-empty name/institution/major, regex email validation, 6+ character passwords, and TOS checkbox validation.
*   **Offline Robustness:** If the Cloudflare Worker API is down, the frontend enters Simulation Mode. It provisions a local mock profile and proceeds to the workspace smoothly to ensure 100% stable presentation during development.

---

## 5. Dashboard Data Architecture (`DashboardPage.tsx`)

The Dashboard pulls personalized metrics and feeds from Supabase while maintaining fallback integrity.

*   **User Resolution:** Calls `supabase.auth.getUser()`. If missing, falls back to "Welcome back, Scholar".
*   **Recent Activity:** Fetches the top 5 recent posts (`SELECT content, created_at, type FROM posts`). 
*   **Mock Fallbacks:** If the `posts` array returns empty (new database), the UI dynamically populates with a rich predefined array of mock data to ensure a "wow" factor during demos.
*   **Future Stats:** Elements like "Notes Uploaded", "AI Queries", and "Study Streak" are static placeholders pending future schema rollouts and `COUNT()` aggregations.
