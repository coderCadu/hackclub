import migrationRunner from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(req, res) {
  const migrations = await migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    migrationsTable: "pgmigrations",
    dir: join('infra', 'migrations'),
    direction: "up",
    verbose: true,
  })

  res.status(200).json(migrations);
}
