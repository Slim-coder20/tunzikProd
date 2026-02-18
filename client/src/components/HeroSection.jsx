import React from "react";

const HeroSection = () => {
  return (
    <section className="flex flex-col max-md:gap-12 md:flex-row pb-20 items-center justify-between mt-10 px-4 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-col items-center md:items-start text-white">
        {/* H1 Percutant */}
        <h1 className="text-center md:text-left text-5xl leading-tight md:text-7xl md:leading-[1.1] font-bold max-w-2xl text-gray-700">
          Propulsez la scène <span className="text-blue-500">émergente.</span>
        </h1>

        {/* Ton paragraphe sur Tunzik */}
        <p className="text-center md:text-left text-base md:text-lg text-slate-400 max-w-lg mt-6 leading-relaxed">
          Tunzik Production accompagne les talents de demain, de la création
          scénique à la production d'albums. Ensemble, faisons vibrer le
          spectacle vivant.
        </p>

        {/* Double CTA pour l'UX */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 w-full md:w-auto">
          <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-medium active:scale-95 transition-all rounded-full px-8 h-12 shadow-lg shadow-blue-500/20 cursor-pointer">
            Devenir Adhérent
          </button>
          <button className="w-full sm:w-auto px-8 h-12 rounded-full border border-slate-700 text-slate-300 font-medium bg-transparent hover:bg-slate-700/50 hover:text-white hover:border-slate-400 transition-all duration-300 active:scale-95 cursor-pointer">
            Explorer le Label
          </button>
        </div>
      </div>

      {/* Image Hero - On peut ajouter un petit effet de lueur derrière */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-blue-500 rounded-full blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <img
          src="../public/heroSection/heroSection.jpeg"
          alt="Tunzik Showcase"
          className="relative max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg drop-shadow-2xl rounded-lg"
        />
      </div>
    </section>
  );
};

export default HeroSection;
