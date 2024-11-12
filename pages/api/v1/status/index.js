import database from "infra/database";

async function apiStatus(req, res) {
  const { maxConnections, openedCoonections, databaseVersion } =
    await database.databaseStatus();

  const updatedAt = new Date().toISOString();

  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: parseInt(maxConnections),
        opened_connections: openedCoonections,
        version: databaseVersion,
      },
    },
  });
}

export default apiStatus;
