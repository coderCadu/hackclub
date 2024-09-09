import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(req, res) {
  const client = await database.getNewClient();
  const defaultMigrationsOptions = {
    dbClient: client,
    dryRun: req.method === "GET" ? true : false,
    migrationsTable: "pgmigrations",
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
  };

  const migrations = await migrationRunner(defaultMigrationsOptions);

  await client.end();

  if (req.method === "GET") {
    return res.status(200).json(migrations);
  }

  if (req.method === "POST") {
    if (migrations.length > 0) {
      return res.status(201).json(migrations);
    }
    return res.status(200).json(migrations);
  }

  const allowedMethod = ["GET", "POST"];
  if (!allowedMethod.contains(req.method)) {
    return res.status(405).send("Method Not Allowed");
  }

  return res.status(405).end();
}
