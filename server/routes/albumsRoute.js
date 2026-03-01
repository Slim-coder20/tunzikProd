import express from "express";
import {
  getAllAlbums,
  getAlbumById,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from "../controllers/albumsController.js";

const albumsRouter = express.Router();

// Routes publiques
albumsRouter.get("/", getAllAlbums);
albumsRouter.get("/:id", getAlbumById);

// Routes admin
albumsRouter.post("/", createAlbum);
albumsRouter.put("/:id", updateAlbum);
albumsRouter.delete("/:id", deleteAlbum);

export default albumsRouter;
