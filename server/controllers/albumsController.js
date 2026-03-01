import Albums from "../models/Albums.js";
import Artistes from "../models/Artistes.js";

// GET /api/albums — Récupérer tous les albums
export const getAllAlbums = async (req, res) => {
  try {
    const albums = await Albums.find();
    return res.status(200).json(albums);
  } catch (error) {
    console.error("Erreur getAllAlbums:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/albums/:id — Récupérer un album par ID
export const getAlbumById = async (req, res) => {
  try {
    const album = await Albums.findById(req.params.id);
    if (!album) {
      return res.status(404).json({ message: "Album introuvable" });
    }
    return res.status(200).json(album);
  } catch (error) {
    console.error("Erreur getAlbumById:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// POST /api/albums — Créer un album et l'associer à un artiste
export const createAlbum = async (req, res) => {
  try {
    const { title, artist, image, price, priceValue, isFree, year, description, previewUrl, artisteId } = req.body;

    if (!title || !artist || !image || !price || priceValue === undefined) {
      return res.status(400).json({ message: "Les champs title, artist, image, price et priceValue sont requis" });
    }

    const newAlbum = new Albums({
      title: title.trim(),
      artist: artist.trim(),
      image: image.trim(),
      price: price.trim(),
      priceValue: Number(priceValue),
      isFree: isFree ?? false,
      year: year?.trim() || "",
      description: description?.trim() || "",
      previewUrl: previewUrl?.trim() || "",
    });

    await newAlbum.save();

    // Associer l'album à l'artiste si un artisteId est fourni
    if (artisteId) {
      await Artistes.findByIdAndUpdate(
        artisteId,
        { $push: { albums: newAlbum._id } }
      );
    }

    return res.status(201).json(newAlbum);
  } catch (error) {
    console.error("Erreur createAlbum:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// PUT /api/albums/:id — Mettre à jour un album
export const updateAlbum = async (req, res) => {
  try {
    const { title, artist, image, price, priceValue, isFree, year, description, previewUrl } = req.body;

    const album = await Albums.findByIdAndUpdate(
      req.params.id,
      {
        ...(title && { title: title.trim() }),
        ...(artist && { artist: artist.trim() }),
        ...(image && { image: image.trim() }),
        ...(price && { price: price.trim() }),
        ...(priceValue !== undefined && { priceValue: Number(priceValue) }),
        ...(isFree !== undefined && { isFree }),
        ...(year && { year: year.trim() }),
        ...(description !== undefined && { description: description.trim() }),
        ...(previewUrl !== undefined && { previewUrl: previewUrl.trim() }),
      },
      { new: true, runValidators: true }
    );

    if (!album) {
      return res.status(404).json({ message: "Album introuvable" });
    }

    return res.status(200).json(album);
  } catch (error) {
    console.error("Erreur updateAlbum:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE /api/albums/:id — Supprimer un album et le retirer de l'artiste associé
export const deleteAlbum = async (req, res) => {
  try {
    const album = await Albums.findByIdAndDelete(req.params.id);
    if (!album) {
      return res.status(404).json({ message: "Album introuvable" });
    }

    // Retirer la référence de l'album dans tous les artistes
    await Artistes.updateMany(
      { albums: req.params.id },
      { $pull: { albums: req.params.id } }
    );

    return res.status(200).json({ message: "Album supprimé avec succès" });
  } catch (error) {
    console.error("Erreur deleteAlbum:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
