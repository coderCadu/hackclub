import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(req, res) {
  const defaultMigrationsOptions = {
    databaseUrl: process.env.DATABASE_URL,
    dryRun: req.method === "GET" ? true : false,
    migrationsTable: "pgmigrations",
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
  };

  const migrations = await migrationRunner(defaultMigrationsOptions);

  if (req.method === "GET") {
    return res.status(200).json(migrations);
  }

  if (req.method === "POST") {
    if (migrations.length > 0) {
      return res.status(201).json(migrations);
    }
    return res.status(200).json(migrations);
  }

  return res.status(405).end();
}
