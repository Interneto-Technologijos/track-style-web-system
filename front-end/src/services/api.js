const API = "http://localhost:8081/api";

export const searchTracks = (query) =>
  fetch(`${API}/tracks?q=${query}`).then((response) => response.json());

export const getTrackStyles = (trackId) =>
  fetch(`${API}/tracks/${trackId}/styles`).then((response) => response.json());

export const suggestTrackStyles = (trackId, styles) =>
  fetch(`${API}/tracks/${trackId}/styles`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(styles),
  }).then((response) => response.json());
