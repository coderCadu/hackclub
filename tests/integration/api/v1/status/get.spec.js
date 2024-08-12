describe("api/v1/status", () => {
  let response;

  beforeEach(async () => {
    jest.clearAllMocks();
    response = await fetch("http://localhost:3000/api/v1/status");
  });

  it("GET to /api/v1/status should return 200", async () => {
    expect(response.status).toBe(200);
  });

  it("GET to /api/v1/status should return and be defined", async () => {
    const responseBody = await response.json();
    expect(responseBody).toBeDefined();
  });

  it("GET to /api/v1/status should return body with a ISO 8601 date", async () => {
    const responseBody = await response.json();
    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
    expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  });
});
