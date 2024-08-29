describe("GET /api/v1/migrations", () => {
  describe("When test the success of apiStatus method", () => {
    let response;
    let responseBody;

    beforeEach(async () => {
      jest.clearAllMocks();
      response = await fetch("http://localhost:3000/api/v1/migrations");
      responseBody = await response.json([]);
    });

    describe("Should return 200", () => {
      it("And GET to /api/v1/migrations should return 200", async () => {
        expect(response.status).toBe(200);
      });
    });

    describe("Should have responseBody", () => {
      it("And GET to /api/v1/migrations should return be defined", async () => {
        expect(responseBody).toBeDefined();
      });
    });

    describe("Should verify returned array", () => {
      it("And GET to /api/v1/migrations should return an array", async () => {
        expect(Array.isArray(responseBody)).toBe(true);
      })
    });
  });
});