import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Users2, Sparkles, Mic2 } from "lucide-react";
import { adhesionService } from "../services/adhesionService.js";

const avantages = [
  {
    icon: Users2,
    title: "Accès à la communauté",
    description: "Rejoignez un réseau d'artistes et de passionnés de musique.",
  },
  {
    icon: Sparkles,
    title: "Événements en avant-première",
    description: "Accédez en priorité à nos concerts et événements exclusifs.",
  },
  {
    icon: Mic2,
    title: "Soutien à la création",
    description: "Contribuez directement au développement des artistes locaux.",
  },
];

const Adhesion = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      zip: "",
      city: "",
      typeOfAdhesion: "",
      paymentMethod: "",
      amount: 30,
      terms: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      // Ne pas envoyer "terms" à l'API : le backend attend seulement ces champs
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone.replace(/\s/g, ""),
        address: data.address,
        city: data.city,
        zip: data.zip,
        typeOfAdhesion: data.typeOfAdhesion,
        amount: Number(data.amount),
        paymentMethod: data.paymentMethod,
      };

      await adhesionService.createAdhesion(payload);

      toast.success("Demande d'adhésion envoyée !");
      reset();
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      const message = err.message || "Erreur lors de l'envoi de l'adhésion.";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* En-tête */}
      <section className="bg-slate-900 px-4 py-16 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
          Rejoignez-nous
        </span>
        <h1 className="mt-3 text-4xl font-bold text-white md:text-5xl">
          Devenir adhérent
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-400">
          Soutenez Tunzik Production et faites partie d'une association dédiée
          au spectacle vivant et aux artistes émergents.
        </p>
      </section>
      {/* Section du formulaire */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Formulaire */}
          <div>
            <h2 className="mb-1 text-2xl font-semibold text-slate-800">
              Formulaire d'adhésion
            </h2>
            <p className="mb-8 text-sm text-slate-500">
              Remplissez le formulaire ci-dessous pour rejoindre l'association.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              {/* Prénom / Nom */}
              <div className="mb-5 grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm text-gray-500">
                    Prénom
                  </label>
                  <input
                    type="text"
                    {...register("firstName", { required: "Prénom requis" })}
                    placeholder="David"
                    className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none transition-colors focus:border-blue-500"
                  />
                  {errors.firstName && (
                    <p className="mt-1 pl-1 text-left text-xs text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-500">
                    Nom
                  </label>
                  <input
                    type="text"
                    {...register("lastName", { required: "Nom requis" })}
                    placeholder="Dupont"
                    className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none transition-colors focus:border-blue-500"
                  />
                  {errors.lastName && (
                    <p className="mt-1 pl-1 text-left text-xs text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="mb-2 block text-sm text-gray-500">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email requis",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email invalide",
                    },
                  })}
                  placeholder="david@gmail.com"
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none transition-colors focus:border-blue-500"
                />
                {errors.email && (
                  <p className="mt-1 pl-1 text-left text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Téléphone */}
              <div className="mb-5">
                <label className="mb-2 block text-sm text-gray-500">
                  Numéro de téléphone
                </label>
                <div className="flex overflow-hidden rounded-lg border border-gray-300 transition-colors focus-within:border-blue-500">
                  <select className="cursor-pointer border-r border-gray-300 bg-white px-3 py-3 text-sm text-gray-500 outline-none">
                    <option value="FR">FR</option>
                  </select>
                  <input
                    type="tel"
                    {...register("phone", {
                      required: "Numéro de téléphone requis",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "10 chiffres requis (sans espace ni préfixe)",
                      },
                    })}
                    placeholder="612345678"
                    className="flex-1 px-3 py-3 text-sm outline-none"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 pl-1 text-left text-xs text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* Adresse */}
              <div className="mb-5">
                <label className="mb-2 block text-sm text-gray-500">
                  Adresse postale
                </label>
                <input
                  type="text"
                  {...register("address", { required: "Adresse requise" })}
                  placeholder="12 rue de la Paix"
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none transition-colors focus:border-blue-500"
                />
                {errors.address && (
                  <p className="mt-1 pl-1 text-left text-xs text-red-500">
                    {errors.address.message}
                  </p>
                )}
              </div>

              {/* Code postal / Ville */}
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm text-gray-500">
                    Code postal
                  </label>
                  <input
                    type="text"
                    {...register("zip", {
                      required: "Code postal requis",
                      pattern: {
                        value: /^\d{5}$/,
                        message: "Code postal invalide (5 chiffres)",
                      },
                    })}
                    placeholder="75001"
                    className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none transition-colors focus:border-blue-500"
                  />
                  {errors.zip && (
                    <p className="mt-1 pl-1 text-left text-xs text-red-500">
                      {errors.zip.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-500">
                    Ville
                  </label>
                  <input
                    type="text"
                    {...register("city", { required: "Ville requise" })}
                    placeholder="Paris"
                    className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none transition-colors focus:border-blue-500"
                  />
                  {errors.city && (
                    <p className="mt-1 pl-1 text-left text-xs text-red-500">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Type d'adhésion */}
              <div className="mb-5">
                <label className="mb-2 block text-sm text-gray-500">
                  Type d'adhésion
                </label>
                <select
                  {...register("typeOfAdhesion", {
                    required: "Veuillez choisir un type d'adhésion",
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none transition-colors focus:border-blue-500"
                >
                  <option value="">Choisir...</option>
                  <option value="Adhésion standard">
                    Adhésion standard - 30€/an
                  </option>
                  <option value="Adhésion bienfaiteur">
                    Adhésion bienfaiteur
                  </option>
                </select>
                {errors.typeOfAdhesion && (
                  <p className="mt-1 pl-1 text-left text-xs text-red-500">
                    {errors.typeOfAdhesion.message}
                  </p>
                )}
              </div>

              {/* Montant */}
              <div className="mb-5">
                <label className="mb-2 block text-sm text-gray-500">
                  Montant (€)
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  {...register("amount", {
                    required: "Montant requis",
                    min: {
                      value: 1,
                      message: "Le montant doit être au moins 1€",
                    },
                    valueAsNumber: true,
                  })}
                  placeholder="30"
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none transition-colors focus:border-blue-500"
                />
                {errors.amount && (
                  <p className="mt-1 pl-1 text-left text-xs text-red-500">
                    {errors.amount.message}
                  </p>
                )}
              </div>

              {/* Mode de paiement */}
              <div className="mb-5">
                <label className="mb-2 block text-sm text-gray-500">
                  Mode de paiement
                </label>
                <select
                  {...register("paymentMethod", {
                    required: "Veuillez choisir un mode de paiement",
                  })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm outline-none transition-colors focus:border-blue-500"
                >
                  <option value="">Choisir...</option>
                    <option value="Card">Carte bancaire</option>
                </select>
                {errors.paymentMethod && (
                  <p className="mt-1 pl-1 text-left text-xs text-red-500">
                    {errors.paymentMethod.message}
                  </p>
                )}
              </div>

              {/* CGU */}
              <div className="mb-6">
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    {...register("terms", {
                      required: "Vous devez accepter les conditions générales",
                    })}
                    className="mt-0.5 h-4 w-4 cursor-pointer accent-blue-600"
                  />
                  <label
                    htmlFor="terms"
                    className="cursor-pointer text-sm text-gray-500"
                  >
                    J'accepte les{" "}
                    <span className="underline">conditions générales</span> et
                    la{" "}
                    <span className="underline">
                      politique de confidentialité
                    </span>
                    .
                  </label>
                </div>
                {errors.terms && (
                  <p className="mt-1 pl-1 text-left text-xs text-red-500">
                    {errors.terms.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full cursor-pointer rounded-lg bg-blue-600 py-3.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-blue-500 hover:shadow-[0_10px_20px_rgba(37,99,235,0.3)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Envoi en cours…" : "Devenir adhérent"}
              </button>
            </form>
          </div>

          {/* Avantages */}
          <div className="flex flex-col justify-center gap-8">
            <div>
              <h2 className="mb-2 text-2xl font-semibold text-slate-800">
                Pourquoi adhérer ?
              </h2>
              <p className="text-sm leading-relaxed text-slate-500">
                En devenant adhérent, vous soutenez directement les artistes
                locaux et participez activement à la vie de l'association.
              </p>
            </div>

            <ul className="flex flex-col gap-6" role="list">
              {avantages.map(({ icon: Icon, title, description }) => (
                <li
                  key={title}
                  className="group flex items-start gap-4 rounded-xl p-4 transition hover:bg-white hover:shadow-sm"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition group-hover:bg-blue-100">
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-700">
                      {title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-500">
                      {description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">
              <p className="text-sm font-medium text-blue-800">
                Cotisation annuelle
              </p>
              <p className="mt-1 text-3xl font-bold text-blue-600">
                30€{" "}
                <span className="text-base font-normal text-blue-400">
                  / an
                </span>
              </p>
              <p className="mt-2 text-xs text-blue-500">
                Votre adhésion est valable 1 an à compter de la date
                d'inscription.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Adhesion;
