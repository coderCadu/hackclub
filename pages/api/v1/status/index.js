import database from "infra/database";

async function apiStatus(req, res) {
  const result = await database.query("SELECT 1 + 1 as sum");
  console.log(result.rows[0].sum);
  res.status(200).json({ status: "ok" });
}

export default apiStatus;
