import { Client } from "@libsql/client/web";
import { corsHeaders, verifyToken } from "../../utils";

export const handleCommunitiesPageRoute = async (url: URL, request: Request, db: Client | null): Promise<Response | null> => {
  if (url.pathname === '/api/communities/posts') {
    const payload = verifyToken(request);
    if (!payload) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    if (request.method === "GET") {
      const communityId = url.searchParams.get("communityId") || url.searchParams.get("eqValue");
      if (!communityId) {
        return new Response(JSON.stringify({ error: "Missing communityId param" }), { status: 400, headers: corsHeaders });
      }

      if (db) {
        try {
          const res = await db.execute({
            sql: `
              SELECT p.*, u.name as author_name, u.avatar_url as author_avatar
              FROM posts p
              LEFT JOIN users u ON p.author_id = u.id
              WHERE p.community_id = ?
              ORDER BY p.created_at DESC
            `,
            args: [communityId]
          });
          return new Response(JSON.stringify({ success: true, data: res.rows }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        } catch (err: any) {
          return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
        }
      }
      return new Response(JSON.stringify({ success: true, data: [] }), { status: 200, headers: corsHeaders });
    }
  }

  if (url.pathname === '/api/communities/members') {
    const payload = verifyToken(request);
    if (!payload) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    if (request.method === "GET") {
      const communityId = url.searchParams.get("communityId") || url.searchParams.get("eqValue");
      if (!communityId) {
        return new Response(JSON.stringify({ error: "Missing communityId param" }), { status: 400, headers: corsHeaders });
      }

      if (db) {
        try {
          const res = await db.execute({
            sql: `
              SELECT cm.role, cm.joined_at, u.name, u.major, u.institution, u.avatar_url, u.id as user_id
              FROM community_members cm
              JOIN users u ON cm.user_id = u.id
              WHERE cm.community_id = ?
              ORDER BY cm.joined_at ASC
            `,
            args: [communityId]
          });
          return new Response(JSON.stringify({ success: true, data: res.rows }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          });
        } catch (err: any) {
          return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
        }
      }
      return new Response(JSON.stringify({ success: true, data: [] }), { status: 200, headers: corsHeaders });
    }
  }

  if (url.pathname === '/api/dynamic/communities') {
    const payload = verifyToken(request);
    if (!payload) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    if (request.method === "GET") {
      if (db) {
        try {
          const commRes = await db.execute("SELECT * FROM communities ORDER BY created_at DESC");
          const communities = commRes.rows;

          const data = [];
          for (const c of communities) {
            // Fetch member count
            const mCountRes = await db.execute({
              sql: "SELECT count(*) as count FROM community_members WHERE community_id = ?",
              args: [c.id]
            });
            const memberCount = mCountRes.rows[0]?.count || 0;

            // Fetch post count
            const pCountRes = await db.execute({
              sql: "SELECT count(*) as count FROM posts WHERE community_id = ?",
              args: [c.id]
            });
            const postCount = pCountRes.rows[0]?.count || 0;

            // Fetch user membership
            const membershipRes = await db.execute({
              sql: "SELECT role, user_id FROM community_members WHERE community_id = ?",
              args: [c.id]
            });
            const memberships = membershipRes.rows;

            data.push({
              ...c,
              community_members: [{ count: memberCount }],
              posts: [{ count: postCount }],
              my_membership: memberships
            });
          }

          return new Response(JSON.stringify({ success: true, data }), { 
            status: 200, 
            headers: { 
              ...corsHeaders, 
              "Content-Type": "application/json" 
            } 
          });
        } catch (err: any) {
          return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
        }
      }
      return new Response(JSON.stringify({ success: true, data: [] }), { status: 200, headers: corsHeaders });
    }
  }
  return null;
};
