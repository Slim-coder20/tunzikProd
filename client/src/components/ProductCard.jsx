import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const albums = [
  {
    id: 1,
    title: "Asymetrie",
    artist: "Slim Abida",
    description: "Asymetrie de Slim Abida sortie le 27/05/2022",
    image: "/latestRelease/cover-asymetrie.jpeg",
    price: "15€",
    isFree: false,
  },
  {
    id: 2,
    title: "Fréquences Basses",
    artist: "Slim Abida",
    description: "Fréquences Basses de Slim Abida sortie le 21/02/2020",
    image: "/latestRelease/cover-frequenceBasses.png",
    price: "15€",
    isFree: false,
  },
  {
    id: 3,
    title: "Lamma",
    artist: "Jazz Oil",
    description: "Lamma de Jazz Oil sortie le 25/03/2016",
    image: "/latestRelease/cover-jazzoil-lamma.jpeg",
    price: "15€",
    isFree: false,
  },
  {
    id: 4,
    title: "Vers où",
    artist: "Jazz Oil",
    description: "Single de Jazz Oil sortie le 21/12/2024",
    image: "/latestRelease/cover-versOuSingle.jpg",
    price: "Gratuit",
    isFree: true,
  },
  {
    id: 5,
    title: "The Beginings",
    artist: "Slim Abida",
    description: "Nouveau Single bientôt disponible",
    image: "/latestRelease/cover-contrast.jpeg",
    price: "Gratuit",
    isFree: true,
  },
];

export default function ProductCard() {
  const { addToCart, cartItems } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (album) => {
    addToCart(album.id);
    navigate("/label");
  };

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
