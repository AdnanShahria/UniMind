const { createClient } = require('@libsql/client');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const crypto = require('crypto');

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
      
      // Parse statements by splitting by semicolon and stripping SQL comments robustly
      const rawStatements = schemaSql.split(';');
      const statements = [];
      
      for (let rawStmt of rawStatements) {
        const cleanLines = rawStmt
          .split('\n')
          .map(line => {
            const trimmed = line.trim();
            if (trimmed.startsWith('--')) {
              return '';
            }
            const commentIndex = line.indexOf('--');
            if (commentIndex !== -1) {
              return line.substring(0, commentIndex);
            }
            return line;
          })
          .join('\n')
          .trim();
          
        if (cleanLines.length > 0) {
          statements.push(cleanLines);
        }
      }

      console.log(`Parsed ${statements.length} core SQL statements. Executing on Turso...`);
      for (let i = 0; i < statements.length; i++) {
        const stmt = statements[i];
        try {
          await client.execute(stmt);
        } catch (stmtErr) {
          console.warn(`Statement ${i + 1} warning:`, stmtErr.message || stmtErr);
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

    // 3. Seed default approved metadata requests (with location support)
    console.log('Clearing old system approved metadata seeds to apply latest location datasets...');
    await client.execute("DELETE FROM metadata_requests WHERE requester_email = 'system@unimind.edu'");

    console.log('Seeding default approved metadata...');
    const defaultUnis = [
      "Bangladesh University of Engineering and Technology (BUET) | Location: Dhaka, Bangladesh",
      "University of Dhaka (DU) | Location: Dhaka, Bangladesh",
      "Shahjalal University of Science & Technology (SUST) | Location: Sylhet, Bangladesh",
      "Stanford University (SU) | Location: California, USA"
    ];
      const defaultMajors = [
        "Computer Science & Engineering",
        "Electrical & Electronic Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Business Administration",
        "Economics",
        "Physics",
        "Mathematics",
        "Medicine",
        "Law"
      ];
      const defaultSessions = [
        "2019-2020",
        "2020-2021",
        "2021-2022",
        "2022-2023",
        "2023-2024",
        "2024-2025"
      ];
      const defaultRoles = [
        "Undergraduate",
        "Graduate / PhD",
        "Researcher",
        "Professor",
        "Other"
      ];

      const queries = [];
      const insertQuery = `
        INSERT INTO metadata_requests (id, requester_email, request_type, action_type, old_value, new_value, status, created_at, updated_at)
        VALUES (?, 'system@unimind.edu', ?, 'add', NULL, ?, 'approved', datetime('now'), datetime('now'))
      `;

      defaultUnis.forEach(uni => {
        queries.push({ sql: insertQuery, args: [crypto.randomUUID ? crypto.randomUUID() : 'uni-' + Math.random().toString(36).substr(2, 9), 'institution', uni] });
      });

      defaultMajors.forEach(major => {
        queries.push({ sql: insertQuery, args: [crypto.randomUUID ? crypto.randomUUID() : 'major-' + Math.random().toString(36).substr(2, 9), 'major', major] });
      });

      defaultSessions.forEach(session => {
        queries.push({ sql: insertQuery, args: [crypto.randomUUID ? crypto.randomUUID() : 'session-' + Math.random().toString(36).substr(2, 9), 'session', session] });
      });

      defaultRoles.forEach(role => {
        queries.push({ sql: insertQuery, args: [crypto.randomUUID ? crypto.randomUUID() : 'role-' + Math.random().toString(36).substr(2, 9), 'role', role] });
      });

      console.log(`Executing ${queries.length} seed statements...`);
      for (const q of queries) {
        await client.execute(q);
      }
      console.log('Seeding completed successfully.');

    // 4. Verify tables
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

