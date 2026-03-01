import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { newsLetterService } from "../services/newsLetterService.js";

export default function NewLetter() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: { email: "" },
  });

  const onSubmit = async (data) => {
    try {
      await newsLetterService.send(data);
      toast.success("Inscription à la newsletter confirmée");
      reset();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Erreur lors de l'inscription, réessayez.");
    }
  };
  return (
    <>
      <div className="w-full bg-slate-900 px-2 text-center text-white py-20 flex flex-col items-center justify-center">
        <p className="text-indigo-500 font-medium">Restez informés</p>
        <h1 className="max-w-lg font-semibold text-4xl/[44px] mt-2">
          Inscrivez-vous à notre newsletter
        </h1>
        <div className="flex items-center justify-center mt-10 border border-slate-600 focus-within:outline focus-within:outline-indigo-600 text-sm rounded-full h-14 max-w-md w-full">
          <input
            {...register("email", { required: "Email est requis"})}
            type="email"
            className="bg-transparent outline-none rounded-full px-4 h-full flex-1"
            placeholder="Entrer votre email"
          />
          {errors.email && (
          <p className="text-red-500 text-xs mt-1 text-left pl-1">
            {errors.email.message}
          </p>
          )}
          <button className="bg-blue-600 text-white rounded-full h-11 mr-1 px-8 flex items-center justify-center cursor-pointer"
          onClick={handleSubmit(onSubmit)}
          >
            S'abonner
          </button>
        </div>
      </div>
    </>
  );
}
