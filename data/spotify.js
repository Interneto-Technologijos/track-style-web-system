require("dotenv").config();

const fetch = require("node-fetch");

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

let accessToken = null;

const refreshAccessToken = async () => {
  const response = await fetch(`https://accounts.spotify.com/api/token`, {
    method: "post",
    headers: {
      "Content-Type": `application/x-www-form-urlencoded`,
      Authorization: `Basic ${btoa(clientId + ":" + clientSecret)}`,
    },
    body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
  });
  accessToken = (await response.json()).access_token;
};

module.exports.getTrackFeatures = async (trackId) => {
  if (!accessToken) {
    await refreshAccessToken();
  }
  const response = await fetch(
    `https://api.spotify.com/v1/audio-features/${trackId}`,
    {
      method: "get",
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  if (response.status === 401) {
    await refreshAccessToken();
    return module.exports.getTrackFeatures(trackId);
  }
  return response.json();
};

module.exports.searchTracksByQuery = async (query) => {
  if (!accessToken) {
    await refreshAccessToken();
  }
  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${query}&type=track&limit=3`,
    {
      method: "get",
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  if (response.status === 401) {
    await refreshAccessToken();
    return module.exports.searchTracksByQuery(trackId);
  }
  return (await response.json()).tracks.items;
};
