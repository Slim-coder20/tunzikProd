import React from "react";
import { NavLink } from "react-router-dom";
const HeroSection = () => {
  return (
    <section className="flex flex-col bg-slate-900 max-md:gap-12 md:flex-row pb-20 items-center justify-between pt-6 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col items-center md:items-start text-white">
        {/* H1 Percutant */}
        <h1 className="text-center md:text-left text-5xl leading-tight md:text-7xl md:leading-[1.1] font-bold max-w-2xl text-white">
          Propulser la scène <span className="text-blue-500">émergente.</span>
        </h1>

        {/* Ton paragraphe sur Tunzik */} 
        <p className="text-center md:text-left text-base md:text-lg text-white  max-w-lg mt-6 leading-relaxed">
          Tunzik Production accompagne les talents de demain, de la création
          scénique à la production d'albums. Ensemble, faisons vibrer le
          spectacle vivant.
        </p>

        {/* Double CTA pour l'UX */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full md:w-auto">
          <NavLink
            to="/adhesion"
            className="flex items-center justify-center w-full sm:w-auto h-12 rounded-full px-8 bg-blue-600 hover:bg-blue-500 text-white font-medium active:scale-95 transition-all shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            <span>Devenir Adhérent</span>
          </NavLink>
          <NavLink
            to="/label"
            className="flex items-center justify-center w-full sm:w-auto h-12 rounded-full px-8 border border-slate-700 text-slate-300 font-medium bg-transparent hover:bg-slate-700/50 hover:text-white hover:border-slate-400 transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <span>Explorer le Label</span>
          </NavLink>
        </div>
      </div>

      {/* Image Hero - On peut ajouter un petit effet de lueur derrière */}
      <div className="relative group">
        <div className="absolute rounded-full  group-hover:opacity-20 transition duration-1000"></div>
        <img
          src="../public/heroSection/heroSection.jpeg"
          alt="Tunzik Showcase"
          className="relative max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg  rounded-lg mt-7"
        />
      </div>
    </section>
  );
};

export default HeroSection;
