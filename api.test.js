const request = require("supertest");

const api = require("./api");

describe("Tracks styles API", () => {
  const tracksStylesAPI = request(`http://localhost:12345/api`);

  beforeAll(async () => {
    await api.listen();
  });

  afterAll(async () => {
    await api.close();
  });

  it("should return 404 in case track ID is not provided", async () => {
    await tracksStylesAPI.get("/tracks//styles").expect(404);
  });

  it("should return 400 in case track ID is 'invalid'", async () => {
    const response = await tracksStylesAPI
      .get("/tracks/invalid/styles")
      .expect(400);
    expect(response.body).toEqual({
      message: "Invalid track ID",
    });
  });

  it("should return styles in case track ID is '11dFghVXANMlKmJXsNCbNl'", async () => {
    const response = await tracksStylesAPI
      .get("/tracks/11dFghVXANMlKmJXsNCbNl/styles")
      .expect(200);
    expect(response.body).toEqual({
      rock: expect.any(Number),
      rnb: expect.any(Number),
      pop: expect.any(Number),
      rap: expect.any(Number),
      electro: expect.any(Number),
      classical: expect.any(Number),
    });
  });
});
