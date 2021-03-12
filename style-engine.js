const brain = require("brain.js");

const spotify = require("./spotify");

module.exports = async (trackId) => {
  const net = new brain.NeuralNetwork({
    binaryThresh: 0.1,
    hiddenLayers: [7],
    activation: "sigmoid",
  });

  net.train([
    // 1kdiiFGX1Htx0aVZYaDwEJ
    {
      input: [
        0.212,
        0.926,
        //-3.378,
        0.14,
        0.000725,
        0.00000483,
        0.081,
        0.262,
        //162.103,
      ],
      output: [1, 0, 0, 0, 0, 0],
    },
    {
      input: [
        0.735,
        0.578,
        //-11.84,
        0.0461,
        0.514,
        0.0902,
        0.159,
        0.624,
        //98.002,
      ],
      output: [0, 0, 1, 0, 0, 0],
    },
  ]);

  const {
    danceability,
    energy,
    loudness,
    speechiness,
    acousticness,
    instrumentalness,
    liveness,
    valence,
    tempo,
  } = await spotify.getTrackFeatures(trackId);

  console.log(`${danceability},
${energy},
${loudness},
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
    //loudness,
    speechiness,
    acousticness,
    instrumentalness,
    liveness,
    valence,
    //tempo,
  ]);

  return { rock, rnb, pop, rap, electro, classical };
};
