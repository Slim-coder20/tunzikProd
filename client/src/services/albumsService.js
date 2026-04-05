import { api } from "./api.js";

export const albumsService = {
  getAll() {
    return api.request("/api/albums");
  },

  getById(id) {
    return api.request(`/api/albums/${id}`);
  },
};