import { api } from "./api.js";

export const adhesionService = {
  createAdhesion(adhesion) {
    return api.request("/api/adhesion", {
      method: "POST",
      body: JSON.stringify(adhesion),
    });
  },
  getAllAdhesions() {
    return api.request("/api/adhesion");
  },
};