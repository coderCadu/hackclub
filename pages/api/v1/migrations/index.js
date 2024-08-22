import migrationRunner from "node-pg-migrate";

async function migrations(req, res) {
  res.status(200).json([]);
}

export default migrations;
