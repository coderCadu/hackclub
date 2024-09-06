import database from "infra/database";

async function clearDatabase() {
  return database.query("DROP SCHEMA public CASCADE; CREATE SCHEMA public;");
}

describe("POST /api/v1/migrations", () => {
  describe("When test the success of apiStatus method", () => {
    let response;
    let responseBody;

    beforeEach(async () => {
      jest.clearAllMocks();
      await clearDatabase();
      response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST",
      });
      responseBody = await response.json([]);
    });

    describe("Should return 200", () => {
      it("And POST to /api/v1/migrations should return 200", async () => {
        expect(response.status).toBe(200);
      });
    });

    describe("Should have responseBody", () => {
      it("And POST to /api/v1/migrations should return be defined", async () => {
        expect(responseBody).toBeDefined();
      });
    });

    describe("Should verify returned array", () => {
      it("And POST to /api/v1/migrations should return an array", async () => {
        expect(Array.isArray(responseBody)).toBe(true);
      });
    });

    describe("Should verify returned object with specific properties", () => {
      it("And POST to /api/v1/migrations should return an object with his propertys path, name and timestamp", async () => {
        expect(Object.keys(responseBody[0])).toStrictEqual([
          "path",
          "name",
          "timestamp",
        ]);
      });
    });
  });
});
