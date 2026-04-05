import { api } from "./api.js"; 

export const stripeService = {
  createCheckoutSessionOrder(items, customerEmail) {
    return api.request("/api/stripe/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ items, customerEmail }),
    });
  },

  createCheckoutSessionAdhesion(adhesionData) {
    return api.request("/api/stripe/create-checkout-session-adhesion", {
      method: "POST",
      body: JSON.stringify(adhesionData),
    });
  },
};