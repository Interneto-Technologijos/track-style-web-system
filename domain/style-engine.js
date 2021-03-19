const brain = require("brain.js");
const async = require("async");

const spotify = require("../data/spotify");

const convertTempo = (tempo) => tempo / 500;

const createNetwork = async (tracks) => {
  const net = new brain.NeuralNetwork({
    binaryThresh: 0.5,
    hiddenLayers: [8],
    activation: "sigmoid",
  });

  net.train(
    (
      await async.mapLimit(tracks, 10, async (track) => ({
        output: track.output,
        features: await spotify.getTrackFeatures(track.trackId),
      }))
    ).map((outputAndFeatures) => ({
      input: [
        outputAndFeatures.features.danceability,
        outputAndFeatures.features.energy,
        outputAndFeatures.features.speechiness,
        outputAndFeatures.features.acousticness,
        outputAndFeatures.features.instrumentalness,
        outputAndFeatures.features.liveness,
        outputAndFeatures.features.valence,
        convertTempo(outputAndFeatures.features.tempo),
      ],
      output: outputAndFeatures.output,
    }))
  );

  return net;
};

module.exports = async (trackId) => {
  const net = await createNetwork([
    { trackId: "1kdiiFGX1Htx0aVZYaDwEJ", output: [1, 0, 0, 0, 0, 0] },
    { trackId: "2KH16WveTQWT6KOG9Rg6e2", output: [1, 0, 0, 0, 0, 0] },
    { trackId: "7AjfklMN4WpQYz5FkT4E66", output: [0, 1, 0, 0, 0, 0] },
    { trackId: "3YmgsYX80v0EtBZekgcB6w", output: [0, 1, 0, 0, 0, 0] },
    { trackId: "11dFghVXANMlKmJXsNCbNl", output: [0, 0, 1, 0, 0, 0] },
    { trackId: "7ef4DlsgrMEH11cDZd32M6", output: [0, 0, 1, 0, 0, 0] },
    { trackId: "6or1bKJiZ06IlK0vFvY75k", output: [0, 0, 0, 1, 0, 0] },
    { trackId: "4KkwBjTLeXmBSIwLFqwlKU", output: [0, 0, 0, 1, 0, 0] },
    { trackId: "1PH5Es89c1cENU8WVuWwbp", output: [0, 0, 0, 0, 1, 0] },
    { trackId: "33yAEqzKXexYM3WlOYtTfQ", output: [0, 0, 0, 0, 1, 0] },
    { trackId: "3s3UjoX5DRQhYSTLCvUZWG", output: [0, 0, 0, 0, 0, 1] },
    { trackId: "6cUCckpdlqHJ5Ascf2uH2A", output: [0, 0, 0, 0, 0, 1] },
  ]);

  // To export NN to file
  //console.log(net.toFunction().toString());

  const {
    danceability,
    energy,
    speechiness,
    acousticness,
    instrumentalness,
    liveness,
    valence,
    tempo,
  } = await spotify.getTrackFeatures(trackId);

  console.log(`${danceability},
${energy},
${speechiness},
${acousticness},
${instrumentalness},
${liveness},
${valence},
${tempo},
`);

  const [rock, rnb, pop, rap, electro, classical] = net.run([
    danceability,
    energy,
    speechiness,
    acousticness,
    instrumentalness,
    liveness,
    valence,
    convertTempo(tempo),
  ]);

  console.log(rock, rnb, pop, rap, electro, classical);

  return { rock, rnb, pop, rap, electro, classical };
};
