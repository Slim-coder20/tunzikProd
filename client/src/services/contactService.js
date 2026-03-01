import { api } from "./api.js";

export const contactService = {
  send(data) {
    return api.request("/api/contact", {
      method: "POST",
      body: JSON.stringify({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        message: data.message,
      }),
    });
  },
};
