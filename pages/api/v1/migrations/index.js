import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";

export default async function migrations(req, res) {
  const allowedMethod = ["GET", "POST"];
  if (!allowedMethod.includes(req.method)) {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  let client;
  try {
    client = await database.getNewClient();
    const defaultMigrationsOptions = {
      dbClient: client,
      dryRun: req.method === "GET" ? true : false,
      migrationsTable: "pgmigrations",
      dir: resolve("infra", "migrations"),
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
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}
