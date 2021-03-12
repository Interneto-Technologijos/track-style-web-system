const styleEngine = require("./style-engine");

describe("Style Engine", () => {
  describe("Rock style", () => {
    describe("Tears Don't Fall - Bullet For My Valentine", () => {
      const trackId = "1kdiiFGX1Htx0aVZYaDwEJ";
      it(`should return Rock style for track ID '${trackId}'`, async () => {
        const style = await styleEngine(trackId);
        expect(style.rock).toBeCloseTo(1, 0);
        expect(style.rnb).toBeCloseTo(0, 0);
        expect(style.pop).toBeCloseTo(0, 0);
        expect(style.rap).toBeCloseTo(0, 0);
        expect(style.electro).toBeCloseTo(0, 0);
        expect(style.classical).toBeCloseTo(0, 0);
      });
    });
  });

  it("should return Pop style for track ID '11dFghVXANMlKmJXsNCbNl'", async () => {
    const style = await styleEngine("11dFghVXANMlKmJXsNCbNl");
    expect(style.rock).toBeCloseTo(0, 0);
    expect(style.rnb).toBeCloseTo(0, 0);
    expect(style.pop).toBeCloseTo(1, 0);
    expect(style.rap).toBeCloseTo(0, 0);
    expect(style.electro).toBeCloseTo(0, 0);
    expect(style.classical).toBeCloseTo(0, 0);
  });
});
