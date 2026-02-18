import { Users2, Sparkles, Mic2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const points = [
  {
    icon: Users2,
    title: "Soutenir les artistes locaux",
    description:
      "Nous soutenons les artistes locaux pour qu'ils puissent se développer et se produire dans les meilleures conditions.",
  },
  {
    icon: Sparkles,
    title: "Promouvoir les artistes émergents",
    description:
      "Nous promouvons les artistes émergents pour qu'ils puissent se faire connaître et accéder à de nouvelles opportunités.",
  },
  {
    icon: Mic2,
    title: "Production de spectacles",
    description:
      "Nous produisons des spectacles pour que les artistes puissent présenter leur travail et toucher le public.",
  },
];

export default function About() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Fond décoratif */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 size-[520px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[200px]"
        aria-hidden
      />

      <div className="mx-auto max-w-5xl px-4 py-12 md:py-20">
        {/* En-tête */}
        <header className="text-center">
          <h1 className="text-3xl font-semibold text-slate-800 md:text-4xl">
            À propos de Tunzik Production
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
            Tunzik Production est une association d'aide au spectacle vivant qui
            a pour but de soutenir les artistes locaux et de promouvoir la
            culture dans toutes ces formes. Tunzik Production existe depuis 2017 et basé à Paris.
          </p>
        </header>

        {/* Contenu principal : visuel + mission */}
        <div className="mt-14 flex flex-col items-center gap-12 md:flex-row md:items-start md:gap-16 lg:gap-20">
          {/* Carte avec le logo */}
          <div className="flex shrink-0 flex-col items-center gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/50 ring-1 ring-slate-100 transition hover:shadow-xl hover:ring-slate-200 md:p-8">
              <img
                src="/favicon.png"
                alt="Tunzik Production"
                className="size-40 object-contain md:size-52"
              />
            </div>
            <p className="text-sm font-medium text-slate-600">
              Spectacle vivant & production
            </p>
          </div>

          {/* Mission + points */}
          <div className="flex-1 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold text-slate-800 md:text-3xl">
                Notre mission
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Soutenir les artistes locaux et promouvoir la culture locale à
                travers l'accompagnement, la production et la diffusion du
                spectacle vivant.
              </p>
            </div>

            <ul className="flex flex-col gap-8" role="list">
              {points.map(({ icon: Icon, title, description }) => (
                <li
                  key={title}
                  className="group flex items-start gap-4 rounded-xl p-3 transition hover:bg-slate-50 md:gap-5 md:p-4"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition group-hover:bg-blue-100 group-hover:ring-blue-200 md:size-12">
                    <Icon size={22} strokeWidth={1.8} aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="text-base font-medium text-slate-700">
                      {title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-500">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <NavLink
                to="/adhesion"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[0.98]"
              >
                Devenir adhérent
              </NavLink>
              <NavLink
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[0.98]"
              >
                Nous contacter
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
