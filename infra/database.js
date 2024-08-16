const { Client } = require("pg");

async function query(queryObject) {
  let result;

  const client = new Client({
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "password",
    host: process.env.POSTGRES_HOST || "localhost",
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DB || "hackclub",
  });

  try {
    await client.connect();
    result = await client.query(queryObject);
  } catch (error) {
    console.log(error);
  } finally {
    await client.end();
    return result;
  }
}

async function databaseStatus() {
  const maxConnectionsResult = await this.query("SHOW max_connections;");
  const maxConnections = maxConnectionsResult.rows[0].max_connections;

  const openedCoonectionsResult = await this.query(
    "SELECT count(*)::int FROM pg_stat_activity WHERE datname = 'hackclub';",
  );
  const openedCoonections = openedCoonectionsResult.rows[0].count;

  const databaseVersionResult = await this.query("SHOW server_version;");
  const databaseVersion = databaseVersionResult.rows[0].server_version;

  return { maxConnections, openedCoonections, databaseVersion };
}

export default {
  query,
  databaseStatus,
};
