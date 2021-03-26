const request = require("supertest");

const api = require("./api");

describe("API", () => {
  const tracksStylesAPI = request(`http://localhost:12345/api`);

  beforeAll(async () => {
    await api.listen();
  });

  afterAll(async () => {
    await api.close();
  });

  describe("Tracks styles API", () => {
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

  describe("Tracks search API", () => {
    it("should return 400 in case search text is missing", async () => {
      const response = await tracksStylesAPI.get("/tracks").expect(400);
      expect(response.body).toEqual({
        message: "Invalid query",
      });
    });
    it("should return 'Nirvana' tracks", async () => {
      const response = await tracksStylesAPI
        .get("/tracks?q=Nirvana")
        .expect(200);
      expect(response.body).toEqual([
        {
          id: "1f3yAtsJtY87CTmM8RLnxf",
          name: "Nirvana - Smells Like Teen Spirit",
        },
        {
          id: "0MKGH8UMfCnq5w7nG06oM5",
          name: "Nirvana - Come As You Are",
        },
        {
          id: "7KMp6pMdsijbLEDEgB5R6C",
          name: "INNA - Nirvana",
        },
      ]);
    });
  });
});
