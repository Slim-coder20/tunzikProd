import { api } from "./api.js";

export const newsLetterService = {
  send(data) {
    return api.request("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
      }),
    });
  },
};