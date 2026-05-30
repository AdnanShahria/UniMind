import { verifyToken, corsHeaders } from '../utils';

export async function handleDynamicRoute(url: URL, request: Request, db: any): Promise<Response | null> {
  console.log("DYNAMIC HANDLER CALLED for URL:", url.pathname);
  const pathParts = url.pathname.split('/');
  if (pathParts.length === 4 && pathParts[1] === 'api' && pathParts[2] === 'dynamic') {
    const table = pathParts[3];
    const payload = verifyToken(request);
    
    // Only logged in users can access dynamic routes (except maybe some public GETs, but let's secure it for now)
    if (!payload) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    // Basic table name validation to prevent SQL injection
    if (!/^[a-zA-Z0-9_]+$/.test(table)) {
      return new Response(JSON.stringify({ error: "Invalid table name" }), { status: 400, headers: corsHeaders });
    }

    try {
      if (request.method === "GET") {
        const eqColumn = url.searchParams.get("eqColumn");
        const eqValue = url.searchParams.get("eqValue");
        let sql = `SELECT * FROM ${table}`;
        let args: any[] = [];
        
        if (eqColumn && eqValue) {
          // Validate column name
          if (!/^[a-zA-Z0-9_]+$/.test(eqColumn)) {
            return new Response(JSON.stringify({ error: "Invalid column name" }), { status: 400, headers: corsHeaders });
          }
          sql += ` WHERE ${eqColumn} = ?`;
          args.push(eqValue);
        }
        
        if (db) {
          const res = await db.execute({ sql, args });
          return new Response(JSON.stringify({ success: true, data: res.rows }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
        return new Response(JSON.stringify({ success: true, data: [] }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

      if (request.method === "POST" || request.method === "PUT") {
        const body: any = await request.json();
        
        // For updates, we expect an ID
        if (request.method === "PUT" || (body && body.id && Object.keys(body).length < 4)) {
            // It's a partial update
            const id = body.id;
            if (!id) {
                return new Response(JSON.stringify({ error: "Missing ID for update" }), { status: 400, headers: corsHeaders });
            }
            const updateKeys = Object.keys(body).filter(k => k !== 'id');
            if (updateKeys.length === 0) {
                 return new Response(JSON.stringify({ success: true, data: body }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
            }
            
            // Validate keys
            for (const key of updateKeys) {
               if (!/^[a-zA-Z0-9_]+$/.test(key)) {
                   return new Response(JSON.stringify({ error: "Invalid column name" }), { status: 400, headers: corsHeaders });
               }
            }
            
            const setClause = updateKeys.map(k => `${k} = ?`).join(', ');
            const args = updateKeys.map(k => body[k]);
            args.push(id);
            
            if (db) {
                await db.execute({
                    sql: `UPDATE ${table} SET ${setClause} WHERE id = ?`,
                    args: args
                });
            }
            return new Response(JSON.stringify({ success: true, data: body }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        } else {
            // It's an INSERT
            // Inject author_id or user_id for security
            if (table === 'posts' || table === 'notes' || table === 'comments') {
                 if (!body.author_id) body.author_id = payload.userId;
            } else if (table === 'communities') {
                 if (!body.created_by) body.created_by = payload.userId;
            } else {
                 if (!body.user_id) body.user_id = payload.userId;
            }
            if (!body.id) {
                 body.id = crypto.randomUUID();
            }

            const keys = Object.keys(body);
            // Validate keys
            for (const key of keys) {
               if (!/^[a-zA-Z0-9_]+$/.test(key)) {
                   return new Response(JSON.stringify({ error: "Invalid column name" }), { status: 400, headers: corsHeaders });
               }
            }
            const placeholders = keys.map(() => '?').join(', ');
            const args = keys.map(k => body[k]);
            
            if (db) {
                await db.execute({
                    sql: `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`,
                    args: args
                });
            }
            return new Response(JSON.stringify({ success: true, data: body }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
        }
      }

      if (request.method === "DELETE") {
        const eqColumn = url.searchParams.get("eqColumn");
        const eqValue = url.searchParams.get("eqValue");
        
        if (!eqColumn || !eqValue) {
            return new Response(JSON.stringify({ error: "Missing delete conditions" }), { status: 400, headers: corsHeaders });
        }
        if (!/^[a-zA-Z0-9_]+$/.test(eqColumn)) {
            return new Response(JSON.stringify({ error: "Invalid column name" }), { status: 400, headers: corsHeaders });
        }

        if (db) {
            await db.execute({
                sql: `DELETE FROM ${table} WHERE ${eqColumn} = ?`,
                args: [eqValue]
            });
        }
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }

    } catch (err: any) {
      console.error(`Dynamic API error [${table}]:`, err);
      return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
  }

  return null;
}
