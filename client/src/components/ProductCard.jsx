import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { albumsService } from "../services/albumsService.js";

export default function ProductCard() {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  // les states //
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UseEffect //
  useEffect(() => {
    albumsService
      .getAll()
      .then(setAlbums)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleBuyNow = (album) => {
    addToCart(album.id);
    navigate("/cart");
  };
  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-slate-500">
        Chargement des albums…
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  if (!albums.length) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8 text-center text-slate-500">
        Aucun album pour le moment.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {albums.map((album) => {
          const qtyInCart = cartItems[album.id] || 0;

          return (
            <div
              key={album.id}
              className="flex h-full min-h-[380px] min-w-0 flex-col overflow-hidden rounded-lg bg-white shadow-md"
            >
              <div className="relative">
                <img
                  className="h-48 w-full shrink-0 object-cover"
                  src={album.image}
                  alt={album.title}
                />
                {qtyInCart > 0 && (
                  <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                    {qtyInCart}
                  </span>
                )}
              </div>

              <div className="flex min-h-0 flex-1 flex-col p-4 text-sm">
                <p className="font-semibold text-blue-600">{album.price}</p>
                <p className="my-1.5 text-base font-medium text-slate-800">
                  {album.artist}
                </p>
                <p className="min-h-0 flex-1 text-slate-500">
                  {album.description}
                </p>

                <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
                  {album.isFree ? (
                    <button
                      onClick={() => addToCart(album.id)}
                      className="col-span-2 cursor-pointer rounded bg-blue-600 py-2 text-white transition hover:bg-blue-500"
                    >
                      Télécharger
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => addToCart(album.id)}
                        className="cursor-pointer rounded bg-slate-100 py-2 text-blue-600 transition hover:bg-slate-200"
                      >
                        Ajouter au panier
                      </button>
                      <button
                        onClick={() => handleBuyNow(album)}
                        className="cursor-pointer rounded bg-blue-600 py-2 text-white transition hover:bg-blue-500"
                      >
                        Acheter maintenant
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
