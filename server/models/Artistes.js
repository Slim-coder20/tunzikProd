import mongoose from "mongoose";

// Schema pour le modèle Artiste
const artisteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  socialLinks: [
    {
      href: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
    },
  ],
  albums: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Albums",
    },
  ],
});

// Création et exportation du modèle
const Artistes = mongoose.model("Artistes", artisteSchema);

export default Artistes;
