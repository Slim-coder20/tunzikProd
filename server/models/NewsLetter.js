import mongoose from "mongoose";

// Schema pour le modèle NewsLetter
const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Création et exportation du modèle
const NewsLetter = mongoose.model("NewsLetter", newsletterSchema);

export default NewsLetter;
