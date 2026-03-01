import express from "express";
import { createAdhesion, getAllAdhesion } from "../controllers/adhesionController.js";

const adhesionRouter = express.Router();

// Route publique : soumission du formulaire d'adhésion
adhesionRouter.post("/", createAdhesion);

// Route admin : récupération de toutes les adhésions
adhesionRouter.get("/", getAllAdhesion);

export default adhesionRouter;
