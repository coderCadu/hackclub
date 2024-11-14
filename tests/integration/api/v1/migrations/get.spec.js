import orchestrator from "tests/orchestrator.js";

describe("GET /api/v1/migrations", () => {
  describe("When apiStatus method return success", () => {
    let response;
    let responseBody;

    beforeAll(async () => {
      await orchestrator.waitForAllServices();
      await orchestrator.clearDatabaseService();
    });

    beforeEach(async () => {
      jest.clearAllMocks();
      response = await fetch("http://localhost:3000/api/v1/migrations");
      responseBody = await response.json([]);
    });

    describe("Should return success", () => {
      it("And GET to /api/v1/migrations should return success", async () => {
        expect(response.status).toBe(200);
      });
    });

    describe("Should have existing body", () => {
      it("And GET to /api/v1/migrations should return be defined", async () => {
        expect(responseBody).toBeDefined();
      });
    });

    describe("Should verify if an array is returned", () => {
      it("And GET to /api/v1/migrations should return an array", async () => {
        expect(Array.isArray(responseBody)).toBe(true);
      });

      it("And GET to /api/v1/migrations should return an array with migrations data", async () => {
        expect(responseBody.length).toBeGreaterThan(0);
      });
    });
  });
});
