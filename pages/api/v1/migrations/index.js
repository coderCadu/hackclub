import { createRouter } from "next-connect";
import migrationRunner from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";
import { onNoMatchHandler, onErrorHandlerDatabase } from "infra/controller.js";
const router = createRouter();

router.use((_, res, next) => {
  res.on("finish", async () => {
    await database.releaseConnection();
  });
  next();
});

router.get(getHandler).post(postHandler);

async function getHandler(req, res) {
  const client = await database.getNewClient();
  const defaultMigrationsOptions = {
    dbClient: client,
    dryRun: true,
    migrationsTable: "pgmigrations",
    dir: resolve("infra", "migrations"),
    direction: "up",
    verbose: true,
  };

  const migrations = await migrationRunner(defaultMigrationsOptions);

  await client?.end();

  return res.status(200).json(migrations);
}

async function postHandler(req, res) {
  const client = await database.getNewClient();
  const defaultMigrationsOptions = {
    dbClient: client,
    dryRun: false,
    migrationsTable: "pgmigrations",
    dir: resolve("infra", "migrations"),
    direction: "up",
    verbose: true,
  };

  const migrations = await migrationRunner(defaultMigrationsOptions);

  await client?.end();

  if (migrations.length > 0) {
    return res.status(201).json(migrations);
  }

  return res.status(200).json(migrations);
}

export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandlerDatabase,
});
