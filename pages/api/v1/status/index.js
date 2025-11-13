import { createRouter } from "next-connect";
import database from "infra/database";
import { onNoMatchHandler, onErrorHandlerInternal } from "infra/controller.js";

const router = createRouter();

router.get(getHandler);

async function getHandler(_, res) {
  const { maxConnections, openedConnections, databaseVersion } =
    await database.databaseStatus();

  const updatedAt = new Date().toISOString();

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: parseInt(maxConnections),
        opened_connections: openedConnections,
        version: databaseVersion,
      },
    },
  });
}

export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandlerInternal,
});
