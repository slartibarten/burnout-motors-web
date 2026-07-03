import mysql from 'mysql2/promise';

// Returns a fresh connection per call. Callers must close it (try/finally +
// db.end()). Per-request connections are simpler and more robust than a cached
// singleton on Hostinger, where a long-lived connection goes stale/times out.
export function createDbConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    // Enable TLS with proper cert verification only when explicitly asked.
    // (DB runs on 127.0.0.1 loopback in production, so this stays off there.)
    ssl: process.env.DB_SSL === 'true' ? {} : undefined,
  });
}
