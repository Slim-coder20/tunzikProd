import express from "express";
import {
  createCheckoutSessionOrder,
  createCheckoutSessionAdhesion,
} from "../controllers/stripeController.js";

const router = express.Router();

router.post("/create-checkout-session", createCheckoutSessionOrder);
router.post("/create-checkout-session-adhesion", createCheckoutSessionAdhesion);

export default router;