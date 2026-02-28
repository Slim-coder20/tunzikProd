import { NavLink } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "../context/CartContext";
import { albums } from "../data/albums";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  // Construire la liste des articles avec leurs infos complètes
  const cartEntries = Object.entries(cartItems)
    .map(([id, qty]) => {
      const album = albums.find((a) => a.id === Number(id));
      if (!album) return null;
      return { ...album, qty };
    })
    .filter(Boolean);

  const total = cartEntries.reduce(
    (sum, item) => sum + item.priceValue * item.qty,
    0
  );

  const totalItems = cartEntries.reduce((sum, item) => sum + item.qty, 0);

  // Panier vide
  if (cartEntries.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50 px-4 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">
          <ShoppingBag size={40} className="text-slate-400" strokeWidth={1.5} />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Votre panier est vide
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Parcourez notre catalogue et ajoutez des albums.
          </p>
        </div>
        <NavLink
          to="/label"
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          <ArrowLeft size={16} />
          Découvrir le Label
        </NavLink>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <NavLink
            to="/label"
            className="mb-6 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Continuer les achats
          </NavLink>
          <h1 className="text-3xl font-bold text-white">
            Mon panier{" "}
            <span className="text-lg font-normal text-slate-400">
              ({totalItems} article{totalItems > 1 ? "s" : ""})
            </span>
          </h1>
        </div>
      </section>

      {/* Contenu */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Liste des articles */}
          <div className="flex flex-col gap-4 lg:col-span-2">
            {cartEntries.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"
              >
                {/* Pochette */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-24 shrink-0 rounded-xl object-cover"
                />

                {/* Infos */}
                <div className="flex min-w-0 flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-800">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500">{item.artist}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Contrôle quantité */}
                    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-5 text-center text-sm font-medium text-slate-800">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => addToCart(item.id)}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Prix + supprimer */}
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-blue-600">
                        {item.isFree
                          ? "Gratuit"
                          : `${item.priceValue * item.qty}€`}
                      </span>
                      <button
                        onClick={() => {
                          for (let i = 0; i < item.qty; i++)
                            removeFromCart(item.id);
                        }}
                        className="text-slate-400 transition hover:text-red-500"
                        aria-label={`Supprimer ${item.title}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Vider le panier */}
            <button
              onClick={clearCart}
              className="self-start text-sm text-slate-400 underline transition hover:text-red-500"
            >
              Vider le panier
            </button>
          </div>

          {/* Récapitulatif */}
          <div className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              Récapitulatif
            </h2>

            <ul className="mb-4 space-y-3 border-b border-slate-100 pb-4">
              {cartEntries.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between text-sm text-slate-600"
                >
                  <span className="min-w-0 truncate pr-4">
                    {item.title}{" "}
                    <span className="text-slate-400">× {item.qty}</span>
                  </span>
                  <span className="shrink-0 font-medium">
                    {item.isFree ? "Gratuit" : `${item.priceValue * item.qty}€`}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mb-6 flex justify-between text-base font-bold text-slate-800">
              <span>Total</span>
              <span className="text-blue-600">{total}€</span>
            </div>

            <button className="w-full cursor-pointer rounded-xl bg-blue-600 py-3 text-sm font-medium text-white transition hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25">
              Passer la commande
            </button>

            <NavLink
              to="/label"
              className="mt-3 block text-center text-sm text-slate-400 transition hover:text-slate-600"
            >
              Continuer les achats
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
