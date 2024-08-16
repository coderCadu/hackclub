import database from "infra/database";

async function apiStatus(req, res) {
  const maxConnections = await database.query("SHOW max_connections;");
  const openedCoonectionsResult = await database.query(
    "SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'hackclub';",
  );
  const openedCoonections = openedCoonectionsResult.rows[0].count;
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersion = databaseVersionResult.rows[0].server_version;

  const updatedAt = new Date().toISOString();
  res.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: parseInt(maxConnections.rows[0].max_connections),
        opened_connections: openedCoonections,
        version: databaseVersion,
      },
    },
  });
}

export default apiStatus;
