# Tunzik Production

Site web de **Tunzik Production**, association d'aide au spectacle vivant basée à Paris depuis 2017. La plateforme présente les artistes du label, leur discographie, et permet aux visiteurs de devenir adhérents ou de contacter l'association.

---

## Architecture du projet

Le projet est organisé en monorepo avec deux dossiers distincts :

```
tunzikProd/
├── client/   # Frontend React
└── server/   # Backend Node.js / Express
```

---

## Stack technique

### Client (Frontend)

| Outil | Version | Rôle |
|-------|---------|------|
| [React](https://react.dev) | 19.2 | UI |
| [Vite](https://vitejs.dev) | 7.3 | Bundler / Dev server |
| [Tailwind CSS](https://tailwindcss.com) | 4.1 | Styles |
| [React Router DOM](https://reactrouter.com) | 7.13 | Routing |
| [React Hook Form](https://react-hook-form.com) | 7.71 | Gestion des formulaires |
| [React Hot Toast](https://react-hot-toast.com) | 2.6 | Notifications |
| [Lucide React](https://lucide.dev) | 0.574 | Icônes |

### Server (Backend)

| Outil | Version | Rôle |
|-------|---------|------|
| [Node.js](https://nodejs.org) | ≥ 18 | Runtime |
| [Express](https://expressjs.com) | 5.2 | Serveur HTTP |
| [Mongoose](https://mongoosejs.com) | 9.2 | ODM MongoDB |
| [Nodemailer](https://nodemailer.com) | 8.0 | Envoi d'emails |
| [JSON Web Token](https://github.com/auth0/node-jsonwebtoken) | 9.0 | Authentification |
| [dotenv](https://github.com/motdotla/dotenv) | 17.3 | Variables d'environnement |
| [cors](https://github.com/expressjs/cors) | 2.8 | CORS |
| [nodemon](https://nodemon.io) | 3.1 | Rechargement automatique |

---

## Prérequis

- **Node.js** ≥ 18
- **npm** ≥ 9
- **MongoDB** (local ou [MongoDB Atlas](https://www.mongodb.com/atlas))

---

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/Slim-coder20/tunzikProd.git
cd tunzikProd
```

### Client

```bash
cd client
npm install
npm run dev
# → http://localhost:5173
```

### Server

```bash
cd server
npm install
npm run dev
# → http://localhost:PORT (défini dans .env)
```

### Variables d'environnement (server)

Créer un fichier `.env` à la racine du dossier `server/` :

```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/tunzikprod
JWT_SECRET=votre_secret_jwt
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app
```

---

## Structure détaillée

### Client

```
client/
├── public/                     # Assets statiques (servis à la racine /)
│   ├── favicon.png
│   ├── artistes/               # Photos des artistes
│   ├── audio/                  # Fichiers audio (previews)
│   ├── heroSection/            # Image hero
│   └── latestRelease/          # Pochettes d'albums
└── src/
    ├── data/
    │   └── artistes.js         # Source de données des artistes et albums
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── HeroSection.jsx
    │   ├── LatestRelease.jsx   # Grille d'albums avec player audio
    │   ├── ScrollArtists.jsx   # Carousel auto-scroll
    │   ├── NewsLetter.jsx
    │   ├── About.jsx
    │   └── ProductCard.jsx     # Grille de produits (page Label)
    ├── pages/
    │   ├── Home.jsx
    │   ├── About.jsx
    │   ├── Artistes.jsx
    │   ├── ArtistDetails.jsx
    │   ├── Label.jsx
    │   ├── Adhesion.jsx
    │   └── Contact.jsx
    ├── context/
    │   └── CartContext.jsx     # Context panier (en cours)
    ├── App.jsx
    └── main.jsx
```

### Server

```
server/
├── config/                     # Configuration (DB, etc.)
├── controllers/                # Logique métier
├── routes/                     # Définition des routes API
├── DB/                         # Connexion MongoDB
└── index.js                    # Point d'entrée Express
```

---

## Pages et routes (Client)

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Accueil : hero, dernières sorties, artistes, newsletter |
| `/a-propos` | About | Présentation de l'association |
| `/artistes` | Artistes | Liste des artistes du label |
| `/artistes/:id` | ArtistDetails | Biographie et discographie d'un artiste |
| `/label` | Label | Boutique / catalogue d'albums |
| `/adhesion` | Adhesion | Formulaire d'adhésion à l'association |
| `/contact` | Contact | Formulaire de contact |

---

## Données des artistes

Les données (artistes, albums, liens sociaux) sont centralisées dans **`client/src/data/artistes.js`**.

Pour ajouter un artiste, il suffit d'ajouter une entrée dans le tableau exporté :

```js
// client/src/data/artistes.js
{
  id: 3,
  name: "Nom de l'artiste",
  image: "/artistes/nom-artiste.jpg",   // fichier dans client/public/artistes/
  genre: "Genre musical",
  city: "Ville",
  bio: "Biographie complète...",
  socialLinks: [
    { href: "https://facebook.com/...", label: "Facebook" },
    { href: "https://instagram.com/...", label: "Instagram" },
    { href: "https://youtube.com/...", label: "YouTube" },
  ],
  albums: [
    {
      id: 1,
      title: "Titre de l'album",
      image: "/latestRelease/cover-album.jpg", // fichier dans client/public/latestRelease/
      year: "2024",
      price: "15€",
      previewUrl: "/audio/extrait.mp3",        // fichier dans client/public/audio/
    },
  ],
}
```

---

## Scripts disponibles

### Client

```bash
npm run dev       # Serveur de développement (http://localhost:5173)
npm run build     # Build de production
npm run preview   # Prévisualiser la build
npm run lint      # Linter ESLint
```

### Server

```bash
npm run dev       # Démarrage avec nodemon (rechargement automatique)
```

---

## Contact

**Tunzik Production**
tunzikprod@gmail.com
