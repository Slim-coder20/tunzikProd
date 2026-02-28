import { useState, useRef } from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { NavLink } from "react-router-dom";
import { artistes } from "../data/artistes";

const socialLinksConfig = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Youtube, label: "YouTube" },
];

function ArtistCard({ artist }) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    const bounds = divRef.current?.getBoundingClientRect();
    if (bounds) {
      setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    }
  };

  return (
    <NavLink to={`/artistes/${artist.id}`}>
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="relative min-h-96 w-80 overflow-hidden rounded-xl bg-white p-0.5 text-gray-800 shadow-lg shadow-slate-200/60 backdrop-blur-md cursor-pointer transition hover:shadow-xl"
      >
        {visible && (
          <div
            className="pointer-events-none absolute z-0 size-60 blur-xl transition-opacity duration-300"
            style={{
              top: position.y - 120,
              left: position.x - 120,
              background:
                "linear-gradient(to right, rgb(96 165 250), rgb(99 102 241))",
            }}
          />
        )}

        <div className="relative z-10 flex h-full min-h-96 w-full flex-col items-center rounded-[10px] bg-white p-6 text-center">
          <div className="shrink-0">
            <img
              src={artist.image}
              alt={artist.name}
              className="h-24 w-24 rounded-full border-2 border-slate-100 object-cover shadow-md"
            />
          </div>
          <h2 className="mt-4 mb-2 shrink-0 text-2xl font-bold text-gray-800">
            {artist.name}
          </h2>
          {artist.bio ? (
            <p
              className="mb-4 min-w-0 flex-1 px-2 text-sm leading-relaxed text-gray-500 line-clamp-4"
              title={artist.bio}
            >
              {artist.bio}
            </p>
          ) : (
            <div className="min-h-18 flex-1" />
          )}
          <div className="mt-auto flex shrink-0 items-center justify-center gap-4 pt-4">
            {artist.socialLinks.map((link, index) => {
              const config = socialLinksConfig.find(
                (c) => c.label === link.label,
              );
              const Icon = config?.icon;
              if (!Icon) return null;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-full p-2 text-indigo-600 transition hover:-translate-y-0.5 hover:bg-indigo-50 hover:text-indigo-700"
                >
                  <Icon className="size-6" strokeWidth={1.8} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </NavLink>
  );
}

const Artistes = () => {
  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <h1 className="mb-10 text-center text-5xl font-medium text-slate-800">
          Nos Artistes
        </h1>

        <div className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {artistes.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artistes;
