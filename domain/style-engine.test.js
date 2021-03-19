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

  describe("RnB style", () => {
    describe("Chris Brown - Exclusive (Expanded Edition)", () => {
      const trackId = "1vwUsp52io0AGQ5yv470IC";
      it(`should return RnB style for track ID '${trackId}'`, async () => {
        const style = await styleEngine(trackId);
        expect(style.rock).toBeCloseTo(0, 0);
        expect(style.rnb).toBeCloseTo(1, 0);
        expect(style.pop).toBeCloseTo(0, 0);
        expect(style.rap).toBeCloseTo(0, 0);
        expect(style.electro).toBeCloseTo(0, 0);
        expect(style.classical).toBeCloseTo(0, 0);
      });
    });
  });

  describe("RAP style", () => {
    describe("2pac - All Eyez On Me", () => {
      const trackId = "5e7ldn9Kwo8Aw9Z8ql9cDj";
      it(`should return RAP style for track ID '${trackId}'`, async () => {
        const style = await styleEngine(trackId);
        expect(style.rock).toBeCloseTo(0, 0);
        expect(style.rnb).toBeCloseTo(0, 0);
        expect(style.pop).toBeCloseTo(0, 0);
        expect(style.rap).toBeCloseTo(1, 0);
        expect(style.electro).toBeCloseTo(0, 0);
        expect(style.classical).toBeCloseTo(0, 0);
      });
    });
  });

  describe("Electronic style", () => {
    describe("Trauma - Worakls Remix", () => {
      const trackId = "1uXUZfJykefWuwj9VtyxIq";
      it(`should return Electro style for track ID '${trackId}'`, async () => {
        const style = await styleEngine(trackId);
        expect(style.rock).toBeCloseTo(0, 0);
        expect(style.rnb).toBeCloseTo(0, 0);
        expect(style.pop).toBeCloseTo(0, 0);
        expect(style.rap).toBeCloseTo(0, 0);
        expect(style.electro).toBeCloseTo(1, 0);
        expect(style.classical).toBeCloseTo(0, 0);
      });
    });
  });

  describe("POP style", () => {
    describe("Carly Rae Jepsen - Cut To The Feeling", () => {
      const trackId = "11dFghVXANMlKmJXsNCbNl";
      it(`should return POP style for track ID '${trackId}`, async () => {
        const style = await styleEngine("11dFghVXANMlKmJXsNCbNl");
        expect(style.rock).toBeCloseTo(0, 0);
        expect(style.rnb).toBeCloseTo(0, 0);
        expect(style.pop).toBeCloseTo(1, 0);
        expect(style.rap).toBeCloseTo(0, 0);
        expect(style.electro).toBeCloseTo(0, 0);
        expect(style.classical).toBeCloseTo(0, 0);
      });
    });
  });

  describe("Classical style", () => {
    describe("Frédéric Chopin - Nocturne No.2", () => {
      const trackId = "1VNvsvEsUpuUCbHpVop1vo";
      it(`should return Classical style for track ID '${trackId}`, async () => {
        const style = await styleEngine("11dFghVXANMlKmJXsNCbNl");
        expect(style.rock).toBeCloseTo(0, 0);
        expect(style.rnb).toBeCloseTo(0, 0);
        expect(style.pop).toBeCloseTo(0, 0);
        expect(style.rap).toBeCloseTo(0, 0);
        expect(style.electro).toBeCloseTo(0, 0);
        expect(style.classical).toBeCloseTo(1, 0);
      });
    });
  });
});
