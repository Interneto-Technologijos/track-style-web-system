const http = require("http");

const express = require("express");

const styleEngine = require("../domain/style-engine");

const app = express();

const spotify = require("../data/spotify");

app.get("/api/tracks/:trackId/styles", async (req, res) => {
  if (!/[a-zA-Z0-9]{22}/.test(req.params.trackId)) {
    res.status(400).send({ message: "Invalid track ID" });
    return;
  }
  res.send(await styleEngine(req.params.trackId));
});

app.get("/api/tracks", async (req, res) => {
  if (!req.query.q || !/.{3,100}/.test(req.query.q)) {
    res.status(400).send({ message: "Invalid query" });
    return;
  }
  const tracks = await spotify.searchTracksByQuery(req.query.q);
  res.send(
    tracks.map((track) => ({
      id: track.id,
      name: track.artists[0].name + " - " + track.name,
    }))
  );
});

let server = null;

module.exports.listen = (port = "12345") =>
  new Promise((resolve) => {
    console.log(`Starting API server on port ${port}`);
    server = http.createServer(app);
    server.listen(port);
    resolve();
  });

module.exports.close = () => new Promise((resolve) => server.close(resolve));
