const fetch = require("node-fetch");

const token =
  "BQBYK8nwohZWBaZ6Ov-WiVSa6UpWnqrmGbY8JO7lG3BVJVB1O7Kv3e5I55X3i_WKNeB8WEeKP49x2Q7peO8jWxuALiEgm0qUs_gWQREhrqfcdBMPRYSYSH9RfRkMrDuw5z0IhrZFOqCiTk3b";

module.exports.getTrackFeatures = async (trackId) => {
  const response = await fetch(
    `https://api.spotify.com/v1/audio-features/${trackId}`,
    {
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.json();
};
