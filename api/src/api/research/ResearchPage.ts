import { Client } from "@libsql/client/web";
import { corsHeaders, verifyToken } from "../../utils";

export const handleResearchPageRoute = async (url: URL, request: Request, db: Client | null): Promise<Response | null> => {
  if (url.pathname === '/api/dynamic/research_papers') {
    const payload = verifyToken(request);
    if (!payload) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    if (request.method === "GET") {
      if (db) {
        try {
          const userId = url.searchParams.get("eqValue") || payload.userId;
          const res = await db.execute({
            sql: "SELECT * FROM research_papers WHERE user_id = ? ORDER BY created_at DESC",
            args: [userId]
          });
          return new Response(JSON.stringify({ success: true, data: res.rows }), { 
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
    }
  }
  return null;
};
