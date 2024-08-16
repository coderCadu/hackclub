describe("api/v1/status", () => {
  let response;

  beforeEach(async () => {
    jest.clearAllMocks();
    response = await fetch("http://localhost:3000/api/v1/status");
  });

  describe('Should return "200"', () => {
    it("And GET to /api/v1/status should return 200", async () => {
      expect(response.status).toBe(200);
    });
  });

  describe("Should have responseBody", () => {
    it("And GET to /api/v1/status should return be defined", async () => {
      const responseBody = await response.json();
      expect(responseBody).toBeDefined();
    });

    describe("And GET to /api/v1/status should return an api data", () => {
      it("And GET to /api/v1/status should return body with a ISO 8601 date", async () => {
        const responseBody = await response.json();
        const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
        expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
      });

      it("And GET to /api/v1/status should return body with a number of max connections", async () => {
        const responseBody = await response.json();
        expect(responseBody.dependencies.database.max_connections).toBe(100);
      });

      it("And GET to /api/v1/status should return body with a number of opened connections", async () => {
        const responseBody = await response.json();
        expect(responseBody.dependencies.database.opened_connections).toBe(1);
      });

      it("And GET to /api/v1/status should return body with a database version", async () => {
        const responseBody = await response.json();
        expect(responseBody.dependencies.database.version).toBe("16.0");
      });
    });
  });

  describe("Should verify returned object with specific properties", () => {
    beforeEach(async () => {
      jest.clearAllMocks();
    });

    it("And GET to /api/v1/status should return an object with an updated_at and dependencies property", async () => {
      const responseBody = await response.json();
      expect(Object.keys(responseBody)).toStrictEqual([
        "updated_at",
        "dependencies",
      ]);
    });

    it("And GET to /api/v1/status should return an object with a dependencies property that has a database property", async () => {
      const responseBody = await response.json();
      expect(Object.keys(responseBody.dependencies)).toStrictEqual([
        "database",
      ]);
    });

    it("And GET to /api/v1/status should return an object with a dependencies property that has a database property that has an opened_connections property", async () => {
      const responseBody = await response.json();
      expect(Object.keys(responseBody.dependencies.database)).toStrictEqual([
        "max_connections",
        "opened_connections",
        "version",
      ]);
    });
  });
});
