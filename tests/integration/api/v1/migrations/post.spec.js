import orchestrator from "tests/orchestrator.js";

describe("When test apiStatus features", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
  });

  describe("When apiStatus method return created status code", () => {
    let response;
    let responseBody;

    beforeEach(async () => {
      await orchestrator.clearDatabaseService();
      response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST",
      });
      responseBody = await response.json([]);
    });

    describe("Should return created", () => {
      it("And POST to /api/v1/migrations should return created status", async () => {
        expect(response.status).toBe(201);
      });
    });

    describe("Should have content in body response", () => {
      it("And POST to /api/v1/migrations should return has a body", async () => {
        expect(responseBody).toBeDefined();
      });
    });

    describe("Should verify if has returned an array", () => {
      it("And POST to /api/v1/migrations should return an array exists in response", async () => {
        expect(Array.isArray(responseBody)).toBe(true);
      });
    });

    describe("Should verify returned object has path, name and timestamp properties", () => {
      it("And POST to /api/v1/migrations should return an object with his propertys path, name and timestamp", async () => {
        expect(Object.keys(responseBody[0])).toStrictEqual([
          "path",
          "name",
          "timestamp",
        ]);
      });
    });
  });

  describe("When apiStatus method return success status code", () => {
    let response;
    let responseBody;

    beforeEach(async () => {
      response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "POST",
      });
      responseBody = await response.json([]);
    });

    describe("Should return success", () => {
      it("And POST to /api/v1/migrations should return success", async () => {
        expect(response.status).toBe(200);
      });
    });

    describe("Should have a body in response", () => {
      it("And POST to /api/v1/migrations should return be defined", async () => {
        expect(responseBody).toBeDefined();
      });
    });

    describe("Should verify returned array existance", () => {
      it("And POST to /api/v1/migrations should return an array", async () => {
        expect(Array.isArray(responseBody)).toBe(true);
      });
    });

    describe("Should verify the array length equal 0", () => {
      it("And POST to /api/v1/migrations should return an array with length 0", async () => {
        expect(responseBody.length).toBe(0);
      });
    });
  });
});
