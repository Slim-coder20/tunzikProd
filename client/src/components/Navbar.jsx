import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Globe } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Artistes', path: '/artistes' },
    { name: 'Label', path: '/label' },
    { name: 'Adhésion', path: '/adhesion' },
    { name: 'Contact', path: '/contact' },
  ];

  // Bloquer le scroll quand le menu mobile est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Fermer le menu en appuyant sur Échap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const mobileLinkClass = ({ isActive }) =>
    `block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-800
     ${isActive ? 'bg-slate-700/50 text-blue-400' : 'text-slate-300 hover:bg-slate-700/30 hover:text-white'}`;

  const desktopLinkClass = ({ isActive }) =>
    `relative py-1 text-sm font-medium transition-colors duration-200 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-0 after:bg-blue-400 after:transition-all after:duration-200 hover:after:w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded
     ${isActive ? 'text-blue-400 after:w-full' : 'text-slate-300 hover:text-white'}`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-slate-900/95 text-white shadow-lg shadow-black/10 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center gap-4 px-4 py-3 md:px-6">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg outline-none transition focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          aria-label="Tunzik Production - Accueil"
        >
          <img
            src="/favicon.png"
            alt=""
            className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-700 transition hover:ring-slate-500"
          />
          <span className="text-xl font-bold tracking-tight text-white md:text-2xl">
            Tunzik Production
          </span>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={desktopLinkClass}
              end={link.path === '/'}
            >
              {link.name}
            </NavLink>
          ))}
          <div className="ml-6 flex items-center gap-1 border-l border-slate-700 pl-6">
            <button
              type="button"
              className="rounded-full p-2.5 text-slate-400 transition hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              aria-label="Langue"
            >
              <Globe size={20} strokeWidth={1.8} />
            </button>
            <button
              type="button"
              className="rounded-full p-2.5 text-slate-400 transition hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              aria-label="Boutique"
            >
              <ShoppingBag size={20} strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-300 transition hover:bg-slate-800 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 md:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay mobile */}
      {isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden"
          aria-label="Fermer le menu"
          tabIndex={-1}
        />
      )}

      {/* Menu mobile */}
      {isOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          className="animate-nav-slide fixed left-4 right-4 top-20 z-50 flex flex-col gap-1 rounded-xl border border-slate-700/50 bg-slate-800/98 p-4 shadow-xl shadow-black/20 backdrop-blur-md md:hidden"
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={mobileLinkClass}
              end={link.path === '/'}
            >
              {link.name}
            </NavLink>
          ))}
          <div className="mt-2 flex gap-2 border-t border-slate-700 pt-3">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-slate-400 transition hover:bg-slate-700/50 hover:text-white"
              aria-label="Langue"
            >
              <Globe size={20} />
              <span className="text-sm">Langue</span>
            </button>
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-slate-400 transition hover:bg-slate-700/50 hover:text-white"
              aria-label="Boutique"
            >
              <ShoppingBag size={20} />
              <span className="text-sm">Boutique</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
