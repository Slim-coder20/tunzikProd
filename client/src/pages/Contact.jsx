import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const Contact = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    toast.success("Message envoyé avec succès");
    setTimeout(() => {
      navigate("/");
    }, 3000);
   reset();
   
  };
  return (
    <div>
      {/* Contenu de la page Contact */}
      <section className="flex items-center justify-center py-12 px-4">
        <div className="grid md:grid-cols-2 md:gap-10 lg:gap-20 max-w-7xl w-full items-center">
          <div className="p-5">
            <h1 className="text-3xl font-semibold text-gray-900 text-center md:text-start mb-3 tracking-tight">
              Contactez-nous
            </h1>
            <p className="text-sm/6 text-gray-600 text-center md:text-start mx-auto md:mx-0 mb-8 leading-relaxed max-w-[400px]">
              Vous avez une question ou une idée ? Nous sommes à votre écoute.
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Prénom
                  </label>
                  <input
                    type="firstname"
                    {...register("firstname", {
                      required: "Prénom est requis",
                    })}
                    placeholder="David"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
                  />
                  {errors.firstname && (
                    <p className="text-red-500 text-xs mt-1 text-left pl-1">
                      {errors.firstname.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-gray-500 mb-2">
                    Nom
                  </label>
                  <input
                    type="lastname"
                    {...register("lastname", {
                      required: "Nom est requis",
                    })}
                    placeholder="Dupont"
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
                  />
                  {errors.lastname && (
                    <p className="text-red-500 text-xs mt-1 text-left pl-1">
                      {errors.lastname.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm text-gray-500 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email est requis",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email invalide",
                    },
                  })}
                  placeholder="david@gmail.com"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none focus:border-indigo-500 transition-colors"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 text-left pl-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-5">
                <label className="block text-sm text-gray-500 mb-2">
                  Numéro de téléphone
                </label>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:border-indigo-500 transition-colors">
                  <select className="px-3 py-3 text-sm outline-none cursor-pointer text-gray-500 bg-white border-r border-gray-300">
                    <option value="FR">FR</option>
                  </select>
                  <input
                    type="phone"
                    placeholder="+33 6 12 34 56 78"
                    className="flex-1 px-3 py-3 text-sm outline-none"
                    {...register("phone", {
                      required: "Numéro de téléphone est requis",
                    })}
                  />

                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1 text-left pl-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm text-gray-500 mb-2">
                  Message
                </label>
                <textarea
                  rows="4"
                  className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm outline-none resize-y focus:border-indigo-500 transition-colors"
                  {...register("message", {
                    required: "Message est requis",
                  })}
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1 text-left pl-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 mb-6">
                <input
                  type="checkbox"
                  className="w-5 h-5 cursor-pointer accent-indigo-500 rounded-[5px] text-gray-300"
                  {...register("terms", {
                    required: "Vous devez accepter les conditions générales",
                  })}
                />
                <label className="text-sm text-gray-500 cursor-pointer">
                  Vous acceptez nos{" "}
                  <span className="underline">conditions générales</span> et{" "}
                  <span className="underline">
                    politique de confidentialité
                  </span>
                  .
                </label>
                {errors.terms && (
                  <p className="text-red-500 text-xs mt-1 text-left pl-1">
                    {errors.terms.message}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit(onSubmit)}
                type="submit"
                className="w-full py-3.5  bg-blue-500 text-white rounded-lg text-sm cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(99,102,241,0.3)]"
              >
                Envoyer le message
              </button>
            </form>
          </div>

          <div className="rounded-3xl p-10 relative min-h-[662px] w-full max-w-[520px] hidden md:flex flex-col justify-between overflow-hidden">
            <img
              src={"../public/favicon.png"}
              alt="3D shapes"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
