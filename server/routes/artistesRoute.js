import express from "express";
import {
  getAllArtistes,
  getArtisteById,
  createArtiste,
  updateArtiste,
  deleteArtiste,
} from "../controllers/artistesController.js";

const artistesRouter = express.Router();

// Routes publiques
artistesRouter.get("/", getAllArtistes);
artistesRouter.get("/:id", getArtisteById);

// Routes admin
artistesRouter.post("/", createArtiste);
artistesRouter.put("/:id", updateArtiste);
artistesRouter.delete("/:id", deleteArtiste);

export default artistesRouter;
