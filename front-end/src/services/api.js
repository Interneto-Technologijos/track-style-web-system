const API = "http://localhost:8080/api";

export const searchTracks = (query) =>
  fetch(`${API}/tracks?q=${query}`).then((response) => response.json());

export const getTrackStyles = (trackId) =>
  fetch(`${API}/tracks/${trackId}/styles`).then((response) => response.json());
