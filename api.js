const http = require("http");

const express = require("express");

const styleEngine = require("./style-engine");

const app = express();

app.get("/api/tracks/:trackId/styles", async (req, res) => {
  if (!/[a-zA-Z0-9]{22}/.test(req.params.trackId)) {
    res.status(400).send({ message: "Invalid track ID" });
    return;
  }
  res.send(await styleEngine(req.params.trackId));
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
