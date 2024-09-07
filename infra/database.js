const { Client } = require("pg");

async function query(queryObject) {
  let result;

  const defaultDatabaseVariables = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    ssl: getSSLValues(),
  };

  const client = new Client(defaultDatabaseVariables);

  try {
    await client.connect();
    result = await client.query(queryObject);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
    return result;
  }
}

async function databaseStatus() {
  const maxConnectionsResult = await this.query("SHOW max_connections;");
  const maxConnections = maxConnectionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;
  const openedCoonectionsResult = await this.query({
    text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;`,
    values: [databaseName],
  });
  const openedCoonections = openedCoonectionsResult.rows[0].count;

  const databaseVersionResult = await this.query("SHOW server_version;");
  const databaseVersion = databaseVersionResult.rows[0].server_version;

  return { maxConnections, openedCoonections, databaseVersion };
}

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production" ? true : false;
}

export default {
  query,
  databaseStatus,
};
