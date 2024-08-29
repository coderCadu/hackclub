import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(req, res) {
  const migrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: req.method === "GET" ? true : false,
    migrationsTable: "pgmigrations",
    dir: join('infra', 'migrations'),
    direction: "up",
    verbose: true,
  })

  if (req.method === "GET") {
    return res.status(200).json(migrations);
  }

  if (req.method === "POST") {
    return res.status(200).json(migrations);
  }

  return res.status(405).end();
}
