const { Client, Pool } = require("pg");

async function query(queryObject) {
  let result;

  const client = new Client({
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "password",
    host: process.env.POSTGRES_HOST || "localhost",
    port: process.env.POSTGRES_PORT || 5432,
    database: process.env.POSTGRES_DB || "hackclub",
  });

  const pool = new Pool({
    max: 20,
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

export default {
  query,
};
