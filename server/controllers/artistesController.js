import Artistes from "../models/Artistes.js";

// GET /api/artistes — Récupérer tous les artistes (albums peuplés)
export const getAllArtistes = async (req, res) => {
  try {
    const artistes = await Artistes.find().populate("albums");
    return res.status(200).json(artistes);
  } catch (error) {
    console.error("Erreur getAllArtistes:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// GET /api/artistes/:id — Récupérer un artiste par ID (albums peuplés)
export const getArtisteById = async (req, res) => {
  try {
    const artiste = await Artistes.findById(req.params.id).populate("albums");
    if (!artiste) {
      return res.status(404).json({ message: "Artiste introuvable" });
    }
    return res.status(200).json(artiste);
  } catch (error) {
    console.error("Erreur getArtisteById:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// POST /api/artistes — Créer un artiste
export const createArtiste = async (req, res) => {
  try {
    const { name, image, genre, city, bio, socialLinks } = req.body;

    if (!name || !image || !genre || !city || !bio) {
      return res.status(400).json({ message: "Les champs name, image, genre, city et bio sont requis" });
    }

    const newArtiste = new Artistes({
      name: name.trim(),
      image: image.trim(),
      genre: genre.trim(),
      city: city.trim(),
      bio: bio.trim(),
      socialLinks: socialLinks || [],
    });

    await newArtiste.save();
    return res.status(201).json(newArtiste);
  } catch (error) {
    console.error("Erreur createArtiste:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// PUT /api/artistes/:id — Mettre à jour un artiste
export const updateArtiste = async (req, res) => {
  try {
    const { name, image, genre, city, bio, socialLinks } = req.body;

    const artiste = await Artistes.findByIdAndUpdate(
      req.params.id,
      {
        ...(name && { name: name.trim() }),
        ...(image && { image: image.trim() }),
        ...(genre && { genre: genre.trim() }),
        ...(city && { city: city.trim() }),
        ...(bio && { bio: bio.trim() }),
        ...(socialLinks && { socialLinks }),
      },
      { new: true, runValidators: true }
    ).populate("albums");

    if (!artiste) {
      return res.status(404).json({ message: "Artiste introuvable" });
    }

    return res.status(200).json(artiste);
  } catch (error) {
    console.error("Erreur updateArtiste:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE /api/artistes/:id — Supprimer un artiste
export const deleteArtiste = async (req, res) => {
  try {
    const artiste = await Artistes.findByIdAndDelete(req.params.id);
    if (!artiste) {
      return res.status(404).json({ message: "Artiste introuvable" });
    }
    return res.status(200).json({ message: "Artiste supprimé avec succès" });
  } catch (error) {
    console.error("Erreur deleteArtiste:", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
