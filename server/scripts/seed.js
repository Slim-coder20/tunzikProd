import mongoose from "mongoose";
import dotenv from "dotenv";
import Albums from "../models/Albums.js";
import Artistes from "../models/Artistes.js";

dotenv.config();

// ─── Données Albums ───────────────────────────────────────────────────────────

const albumsData = [
  // Slim Abida
  {
    title: "Contrast",
    artist: "Slim Abida",
    description: "",
    image: "/latestRelease/cover-contrast.jpeg",
    price: "Gratuit",
    priceValue: 0,
    isFree: true,
    year: "2024",
    previewUrl: "",
  },
  {
    title: "Asymetrie",
    artist: "Slim Abida",
    description: "Asymetrie de Slim Abida sortie le 27/05/2022",
    image: "/latestRelease/cover-asymetrie.jpeg",
    price: "15€",
    priceValue: 15,
    isFree: false,
    year: "2022",
    previewUrl: "/audio/asymetrie.mp3",
  },
  {
    title: "Fréquences Basses",
    artist: "Slim Abida",
    description: "Fréquences Basses de Slim Abida sortie le 21/02/2020",
    image: "/latestRelease/cover-frequenceBasses.png",
    price: "15€",
    priceValue: 15,
    isFree: false,
    year: "2020",
    previewUrl: "/audio/road.mp3",
  },
  {
    title: "The Beginings",
    artist: "Slim Abida",
    description: "Nouveau Single bientôt disponible",
    image: "/latestRelease/cover-contrast.jpeg",
    price: "Gratuit",
    priceValue: 0,
    isFree: true,
    year: "",
    previewUrl: "",
  },
  // Jazz Oil
  {
    title: "Vers où (Single)",
    artist: "Jazz Oil",
    description: "Single de Jazz Oil sortie le 21/12/2024",
    image: "/latestRelease/cover-versOuSingle.jpg",
    price: "Gratuit",
    priceValue: 0,
    isFree: true,
    year: "2023",
    previewUrl: "/audio/VersOu.wav",
  },
  {
    title: "Lamma",
    artist: "Jazz Oil",
    description: "Lamma de Jazz Oil sortie le 25/03/2016",
    image: "/latestRelease/cover-jazzoil-lamma.jpeg",
    price: "15€",
    priceValue: 15,
    isFree: false,
    year: "2021",
    previewUrl: "",
  },
];

// ─── Données Artistes ─────────────────────────────────────────────────────────

const artistesData = [
  {
    name: "Slim Abida",
    image: "/artistes/slimabida.png",
    genre: "Jazz-Fusion",
    city: "Paris",
    bio: "Bassiste, compositeur et architecte sonore, Slim Abida s'est imposé en une décennie comme une figure incontournable du Jazz-Fusion contemporain en France. Avec quatre albums à son actif (dont le très attendu Contrast), il déconstruit les genres pour bâtir une musique électrique, nerveuse et profondément cinématographique.",
    socialLinks: [
      { href: "https://www.facebook.com/slimabidaproject/", label: "Facebook" },
      { href: "https://www.instagram.com/slimabidaproject/", label: "Instagram" },
      { href: "https://www.youtube.com/@slimabida6045", label: "YouTube" },
    ],
    albumTitles: ["Contrast", "Asymetrie", "Fréquences Basses", "The Beginings"],
  },
  {
    name: "Jazz Oil",
    image: "/artistes/jazzoilband.jpeg",
    genre: "Jazz Oriental",
    city: "Paris",
    bio: "Le groupe a été fondé à Tunis en 2008 autour d'un duo inattendu d'instruments : la basse et le Quanun. Un voyage sonore entre l'orient et l'occident qui transcende les frontières musicales et culturelles.",
    socialLinks: [
      { href: "https://www.facebook.com/jazzoil.fr/?locale=fr_FR", label: "Facebook" },
      { href: "https://www.instagram.com/jazzoil/?hl=fr", label: "Instagram" },
      { href: "https://www.youtube.com/@jazzoil4455", label: "YouTube" },
    ],
    albumTitles: ["Vers où (Single)", "Lamma"],
  },
];

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✓ Connecté à MongoDB");

  // Nettoyage des collections
  await Albums.deleteMany({});
  await Artistes.deleteMany({});
  console.log("✓ Collections vidées");

  // Insertion des albums
  const insertedAlbums = await Albums.insertMany(albumsData);
  console.log(`✓ ${insertedAlbums.length} albums insérés`);

  // Map title → _id pour retrouver les refs facilement
  const albumMap = {};
  insertedAlbums.forEach((album) => {
    albumMap[album.title] = album._id;
  });

  // Insertion des artistes avec les _id des albums
  const artistesWithRefs = artistesData.map(({ albumTitles, ...artiste }) => ({
    ...artiste,
    albums: albumTitles.map((title) => albumMap[title]).filter(Boolean),
  }));

  const insertedArtistes = await Artistes.insertMany(artistesWithRefs);
  console.log(`✓ ${insertedArtistes.length} artistes insérés`);

  await mongoose.disconnect();
  console.log("✓ Seed terminé avec succès");
}

seed().catch((err) => {
  console.error("Erreur seed:", err);
  process.exit(1);
});
