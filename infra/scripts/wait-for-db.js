const { exec } = require("node:child_process");

function checkProgress() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkProgress();
      return;
    }

    console.log("\n🟢 Postgres is ready and accepting connections\n");
  }
}

process.stdout.write("\n\n🔴 Waiting postgres accept connections");

checkProgress();
