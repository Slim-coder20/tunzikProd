import { api } from "./api.js";

export const artistesService = {
  getAll() {
    return api.request("/api/artistes");
  },
  getById(id) {
    return api.request(`/api/artistes/${id}`);
  },
};
