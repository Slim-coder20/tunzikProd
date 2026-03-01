import mongoose from "mongoose";

// Schema pour le modèle Album
const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  priceValue: {
    type: Number,
    required: true,
    default: 0,
  },
  isFree: {
    type: Boolean,
    required: true,
    default: false,
  },
  year: {
    type: String,
    default: "",
  },
  previewUrl: {
    type: String,
    default: "",
  },
});

// Création et exportation du modèle
const Albums = mongoose.model("Albums", albumSchema);

export default Albums;
