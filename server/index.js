import "./loadEnv.js";

import express from "express";
import { handleStripeWebhook } from "./controllers/stripeController.js";
import mongoose from 'mongoose';
import cors from 'cors';
import { connectMongo } from './DB/mongoDB.js';
import contactRouter from './routes/contactRoute.js';
import newsLetterRouter from './routes/newsLetterRoute.js';
import artistesRouter from './routes/artistesRoute.js';
import albumsRouter from './routes/albumsRoute.js';
import { createAdhesion, getAllAdhesion } from './controllers/adhesionController.js';
import stripeRouter from './routes/stripeRoute.js';

/**
 * Initialize Express App
 */
const app = express();


// Webhook Stripe : body brut obligatoire 
app.post("/api/webhooks/stripe", express.raw({type: "application/json"}),
handleStripeWebhook
);

/**
 * Middleware
 */
app.use(cors());
app.use(express.json());

// Middleware pour forcer l'encodage UTF-8 dans les réponses
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  next();
});

// Connect to MongoDB
connectMongo();

// Adhésion : routes enregistrées directement sur app (évite tout souci de montage)
app.post('/api/adhesion', createAdhesion);
app.get('/api/adhesion', getAllAdhesion);

// Stripe : création des sessions Checkout (panier + adhésion)
app.use('/api/stripe', stripeRouter);

// Autres routes API
app.use('/api/contact', contactRouter);
app.use('/api/newsletter', newsLetterRouter);
app.use('/api/artistes', artistesRouter);
app.use('/api/albums', albumsRouter);

// Route racine
app.get("/", (req, res) => {
  res.send("Tunzik Production Welcome Page");
});

// 404 : renvoie du JSON pour les appels API
app.use((req, res) => {
  res.status(404).json({
    message: "Route non trouvée",
    path: req.method + " " + req.originalUrl,
  });
});

// Start the server 
app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${process.env.PORT} and http://localhost:${process.env.PORT}`);
});