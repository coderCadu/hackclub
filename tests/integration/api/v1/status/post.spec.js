import orchestrator from "tests/orchestrator.js";

describe("GET /api/v1/status", () => {
  beforeAll(async () => {
    await orchestrator.waitForAllServices();
  });

  describe("When apiStatus received a Not Allowed", () => {
    let response;

    beforeEach(async () => {
      jest.clearAllMocks();
      response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });
    });

    describe("Should return 'Method Not Allowed' status", () => {
      it("And POST to /api/v1/status should return 405 status", async () => {
        expect(response.status).toBe(405);
      });

      it("And POST to /api/v1/status should return 'Method Not Allowed'", () => {
        expect(response.statusText).toBe("Method Not Allowed");
      });

      it("And POST to /api/v1/status should return proper error message", async () => {
        const responseBody = await response.json();

        expect(responseBody).toEqual({
          name: "Method Not Allowed",
          message: "An internal error occurred",
          action: "Please send requests using allowed methods",
          status_code: 405,
        });
      });

      it("And POST to /api/v1/status should return an object with specific properties", async () => {
        const responseBody = await response.json();

        expect(Object.keys(responseBody)).toStrictEqual([
          "name",
          "message",
          "action",
          "status_code",
        ]);
      });
    });
  });
});
