import React from "react";
import { Play, ArrowRight, Pause } from "lucide-react";
import { useRef, useState } from "react";

const LatestRelease = () => {
  // State //
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

  //Création d'une fonction pour le lancer le player sur la carte d'un album //
  const togglePlay = (album) => {
    if (playingId === album.id) {
      // Si on clic sur le même on met en pause
      audioRef.current.pause();
      setPlayingId(null);
    } else {
      // Si on clique sur un nouveau ou si rien ne jouait
      setPlayingId(album.id);
      audioRef.current.src = album.previewUrl;
      audioRef.current.play();
    }
  };

  const albums = [
    {
      id: 1,
      title: "Vers où single",
      artist: "Jazz Oil",
      image: "/latestRelease/cover-versOuSingle.jpg",
      price: "free",
      previewUrl: "/audio/VersOu.wav",
    },

    {
      id: 2,
      title: "Lamma",
      artist: "Jazz Oil",
      image: "/latestRelease/cover-jazzoil-lamma.jpeg",
      price: "15€",
      previewUrl: "",
    },
    {
      id: 3,
      title: "Fréquences Basses",
      artist: "Slim Abida",
      image: "/latestRelease/cover-frequenceBasses.png",
      price: "15€",
      previewUrl: "/audio/road.mp3",
    },
    {
      id: 4,
      title: "Asymetrie",
      artist: "Slim Abida",
      image: "/latestRelease/cover-asymetrie.jpeg",
      price: "15€",
      previewUrl: "/audio/asymetrie.mp3",
    },

    {
      id: 5,
      title: "The Beginings Single Bientôt disponible",
      artiste: "Slim Abida",
      image: "/latestRelease/cover-contrast.jpeg",
      price: "free",
      previewUrl: "",
    },
  ];
  return (
    <section className="py-20 bg-white px-4 md:px-16 lg:px-24">
      {/* Balise audio masquée */}
      <audio ref={audioRef} onEnded={() => setPlayingId(null)} />

      <div className="flex justify-between items-end mb-10">
        <div>
          <span className="text-blue-600 font-bold tracking-widest uppercase text-xs">
            Le Label
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mt-2">
            Dernières Sorties
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {albums.map((album) => (
          <div key={album.id} className="group cursor-pointer">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 mb-4 shadow-sm">
              <img
                src={album.image}
                alt={album.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay avec bouton Play/Pause dynamique */}
              <div
                onClick={(e) => {
                  e.stopPropagation(); // Empêche de cliquer sur la carte entière
                  togglePlay(album);
                }}
                className={`absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center ${playingId === album.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
              >
                <div className="bg-white p-4 rounded-full text-blue-600 shadow-lg">
                  {playingId === album.id ? (
                    <Pause fill="currentColor" size={24} />
                  ) : (
                    <Play fill="currentColor" size={24} />
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-bold text-lg text-slate-800">
                {album.title}
              </h3>
              <p className="text-slate-500 font-medium">{album.artist}</p>
              <p className="text-blue-600 font-bold">{album.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestRelease;
