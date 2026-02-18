import { Music2, Disc3, Sparkles, Award, Users2, BadgeCheck } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Music2,
      title: "Accompagnement des talents",
      description:
        "Nous accompagnons les artistes émergents de la scène à la production, avec un suivi personnalisé et des moyens adaptés.",
    },
    {
      icon: Disc3,
      title: "Production d'albums",
      description:
        "De la création scénique à l'album fini : enregistrement, mixage et sortie de projets musicaux de qualité.",
    },
    {
      icon: Sparkles,
      title: "Spectacle vivant",
      description:
        "Le live au cœur de notre démarche. Nous faisons vibrer la scène et créons des moments uniques avec le public.",
    },
    {
      icon: Award,
      title: "Qualité & exigence",
      description:
        "Une exigence artistique et technique pour chaque projet, afin de valoriser au mieux les talents que nous soutenons.",
    },
    {
      icon: Users2,
      title: "Communauté & partage",
      description:
        "Un collectif d'artistes et de professionnels qui partagent la même vision : faire grandir la scène émergente ensemble.",
    },
    {
      icon: BadgeCheck,
      title: "Professionnalisme",
      description:
        "Un cadre structuré et transparent pour les adhérents : contrats clairs, accompagnement juridique et administratif.",
    },
  ];

  return (
    <section className="relative bg-slate-900 max-w-full mx-auto px-4 md:px-8 py-16 md:py-24">
      <div className="size-[520px] -top-80 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-blue-500/10" />
      <div className="relative max-w-5xl mx-auto">
      <h2 className="text-3xl font-semibold text-center text-slate-100">
        Nos valeurs
      </h2>
      <p className="text-sm text-slate-400 text-center mt-2 max-w-lg mx-auto">
        Tunzik Production place l'artiste et le spectacle vivant au centre. Nos
        valeurs guident chaque projet que nous accompagnons.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 pt-16">
        {values.map(({ icon: Icon, title, description }) => (
          <div key={title} className="space-y-4">
            <div className="flex size-11 items-center justify-center rounded-lg bg-slate-800 border border-slate-700 text-blue-400">
              <Icon size={22} strokeWidth={1.8} />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-medium text-slate-200">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
