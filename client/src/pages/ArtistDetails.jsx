import { useRef, useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Facebook, Instagram, Youtube, ArrowLeft, Play, Pause, MapPin, Music } from "lucide-react";
import { artistesService } from "../services/artistesService";

const socialLinksConfig = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
];

const ArtistDetails = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    artistesService
      .getById(id)
      .then((data) => setArtist(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const togglePlay = (album) => {
    if (!album.previewUrl) return;
    if (playingId === album._id) {
      audioRef.current.pause();
      setPlayingId(null);
    } else {
      setPlayingId(album._id);
      audioRef.current.src = album.previewUrl;
      audioRef.current.play();
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-500" />
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
        <h1 className="text-3xl font-semibold text-slate-800">Artiste introuvable</h1>
        <p className="text-slate-500">Cet artiste n'existe pas ou a été retiré.</p>
        <NavLink
          to="/artistes"
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          <ArrowLeft size={16} />
          Retour aux artistes
        </NavLink>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <audio ref={audioRef} onEnded={() => setPlayingId(null)} />

      {/* Hero */}
      <section className="bg-slate-900 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <NavLink
            to="/artistes"
            className="mb-10 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Retour aux artistes
          </NavLink>

          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-12">
            <img
              src={artist.image}
              alt={artist.name}
              className="h-48 w-48 shrink-0 rounded-2xl object-cover shadow-2xl ring-2 ring-white/10 md:h-56 md:w-56"
            />

            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <span className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-400">
                {artist.genre}
              </span>
              <h1 className="text-4xl font-bold text-white md:text-5xl">
                {artist.name}
              </h1>

              {artist.city && (
                <div className="mt-3 flex items-center gap-1.5 text-slate-400">
                  <MapPin size={14} />
                  <span className="text-sm">{artist.city}</span>
                </div>
              )}

              <div className="mt-6 flex gap-3">
                {artist.socialLinks.map((link) => {
                  const config = socialLinksConfig.find((c) => c.label === link.label);
                  const Icon = config?.icon;
                  if (!Icon) return null;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:bg-white/15 hover:text-white"
                    >
                      <Icon size={18} strokeWidth={1.8} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenu */}
      <section className="mx-auto max-w-5xl px-4 py-16">
        {/* Biographie */}
        <div className="mb-16">
          <h2 className="mb-4 text-2xl font-semibold text-slate-800">Biographie</h2>
          <p className="max-w-3xl text-base leading-relaxed text-slate-500">
            {artist.bio}
          </p>
        </div>

        {/* Discographie */}
        {artist.albums?.length > 0 && (
          <div>
            <div className="mb-8 flex items-center gap-3">
              <Music size={20} className="text-blue-600" />
              <h2 className="text-2xl font-semibold text-slate-800">Discographie</h2>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {artist.albums.map((album) => (
                <div key={album._id} className="group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
                    <img
                      src={album.image}
                      alt={album.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {album.previewUrl && (
                      <div
                        onClick={() => togglePlay(album)}
                        className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity ${
                          playingId === album._id
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <div className="rounded-full bg-white p-4 text-blue-600 shadow-lg">
                          {playingId === album._id ? (
                            <Pause fill="currentColor" size={22} />
                          ) : (
                            <Play fill="currentColor" size={22} />
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-3 space-y-1">
                    <h3 className="font-semibold text-slate-800">{album.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">{album.year}</span>
                      <span className="text-sm font-bold text-blue-600">{album.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ArtistDetails;
