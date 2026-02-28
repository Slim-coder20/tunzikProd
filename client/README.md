# Tunzik Production — Client

Site web de **Tunzik Production**, association d'aide au spectacle vivant basée à Paris depuis 2017. La plateforme présente les artistes du label, leur discographie, et permet aux visiteurs de devenir adhérents ou de contacter l'association.

---

## Stack technique

| Outil | Version | Rôle |
|-------|---------|------|
| [React](https://react.dev) | 19.2 | UI |
| [Vite](https://vitejs.dev) | 7.3 | Bundler / Dev server |
| [Tailwind CSS](https://tailwindcss.com) | 4.1 | Styles |
| [React Router DOM](https://reactrouter.com) | 7.13 | Routing |
| [React Hook Form](https://react-hook-form.com) | 7.71 | Gestion des formulaires |
| [React Hot Toast](https://react-hot-toast.com) | 2.6 | Notifications |
| [Lucide React](https://lucide.dev) | 0.574 | Icônes |

---

## Prérequis

- **Node.js** ≥ 18
- **npm** ≥ 9

---

## Installation

```bash
# Cloner le dépôt
git clone https://github.com/Slim-coder20/tunzikProd.git
cd tunzikProd/client

# Installer les dépendances
npm install
```

---

## Scripts disponibles

```bash
# Démarrer le serveur de développement (http://localhost:5173)
npm run dev

# Build de production
npm run build

# Prévisualiser la build de production
npm run preview

# Linter
npm run lint
```

---

## Structure du projet

```
client/
├── public/                     # Assets statiques (servis à la racine /)
│   ├── favicon.png
│   ├── artistes/               # Photos des artistes
│   ├── audio/                  # Fichiers audio (previews)
│   ├── heroSection/            # Image hero
│   └── latestRelease/          # Pochettes d'albums
│
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
    │   ├── About.jsx           # Section "À propos" (réutilisée en home)
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
    ├── App.jsx                 # Routing principal
    └── main.jsx                # Point d'entrée
```

---

## Pages et routes

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

Les données (artistes, albums, liens sociaux) sont centralisées dans **`src/data/artistes.js`**.

Pour ajouter un artiste, il suffit d'ajouter une entrée dans le tableau exporté :

```js
// src/data/artistes.js
export const artistes = [
  {
    id: 3,
    name: "Nom de l'artiste",
    image: "/artistes/nom-artiste.jpg",   // fichier dans public/artistes/
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
        image: "/latestRelease/cover-album.jpg", // fichier dans public/latestRelease/
        year: "2024",
        price: "15€",
        previewUrl: "/audio/extrait.mp3",        // fichier dans public/audio/
      },
    ],
  },
];
```

---

## Formulaires

Les pages **Contact**, **Adhésion** et **Newsletter** utilisent `react-hook-form` avec :
- Validation en temps réel (champs requis, format email, regex téléphone/code postal)
- Notifications via `react-hot-toast` à la soumission
- Reset automatique du formulaire après succès

> **Note :** Les formulaires affichent actuellement un toast de confirmation mais n'envoient pas encore de données vers un backend. L'intégration d'une API REST est prévue.

---

## Assets

Les fichiers dans `public/` sont accessibles via des **chemins absolus** depuis la racine :

```
/favicon.png
/artistes/slimabida.png
/latestRelease/cover-asymetrie.jpeg
/audio/asymetrie.mp3
/heroSection/heroSection.jpeg
```

> Ne pas utiliser de chemins relatifs (`../public/...`) dans les composants — Vite sert le dossier `public/` directement à la racine.

---

## Contact

**Tunzik Production**
tunzikprod@gmail.com
