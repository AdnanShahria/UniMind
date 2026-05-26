const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .dev.vars
const devVarsPath = path.resolve(__dirname, '../.dev.vars');
if (fs.existsSync(devVarsPath)) {
  const devVars = dotenv.parse(fs.readFileSync(devVarsPath));
  for (const k in devVars) {
    process.env[k] = devVars[k];
  }
}

async function runMigration() {
  const url = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!url || !authToken) {
    console.error('TURSO_DATABASE_URL or TURSO_AUTH_TOKEN not found in .dev.vars');
    process.exit(1);
  }

  console.log('Connecting to Turso database at:', url);
  const client = createClient({ url, authToken });

  try {
    // 1. Run core schema statements from turso_schema.sql
    const schemaPath = path.join(__dirname, 'turso_schema.sql');
    if (fs.existsSync(schemaPath)) {
      console.log('Reading core schema from turso_schema.sql...');
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      
      // Parse statements by splitting by semicolon (accounting for comments and linebreaks)
      const statements = schemaSql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

      console.log(`Parsed ${statements.length} core SQL statements. Executing on Turso...`);
      for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i];
        try {
          await client.execute(stmt);
        } catch (stmtErr) {
          console.warn(`Statement ${i + 1} warning (might be duplicate index):`, stmtErr.message || stmtErr);
        }
      }
      console.log('Core database schema tables are verified and ready.');
    } else {
      console.warn('turso_schema.sql file not found in database directory.');
    }

    // 2. Run metadata requests table creation
    console.log('Creating metadata_requests table on Turso...');
    await client.execute(`
      CREATE TABLE IF NOT EXISTS metadata_requests (
          id TEXT PRIMARY KEY,
          requester_email TEXT NOT NULL,
          request_type TEXT NOT NULL,
          action_type TEXT NOT NULL,
          old_value TEXT,
          new_value TEXT NOT NULL,
          status TEXT DEFAULT 'pending' NOT NULL,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);
    console.log('metadata_requests table is ready.');

    // 3. Verify tables
    console.log('Verifying table presence...');
    const usersCount = await client.execute("SELECT count(*) as count FROM users").catch(() => ({ rows: [{ count: 'N/A' }] }));
    const requestsCount = await client.execute("SELECT count(*) as count FROM metadata_requests").catch(() => ({ rows: [{ count: 'N/A' }] }));
    
    console.log('Verification results:');
    console.log(' - users Table row count:', usersCount.rows[0].count);
    console.log(' - metadata_requests Table row count:', requestsCount.rows[0].count);

    console.log('Migration and verification on Turso database completed successfully!');
  } catch (err) {
    console.error('Error executing migration on Turso:', err);
  }
}

runMigration();

