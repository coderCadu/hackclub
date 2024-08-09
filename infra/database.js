import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "hackclub",
    password: "password",
    port: 5432,
  });
  await client.connect();
  const result = await client.query(queryObject);
  await client.end();
  return result;
}

export default {
  query,
};
