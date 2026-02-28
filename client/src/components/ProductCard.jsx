export default function ProductCard() {

  const albums = [
    {
      id:1,
      title:"Asymetrie",
      artist:"Slim Abida",
      description:"Asymetrie de Slim Abida sortie le 27/05/2022",
      image:"/latestRelease/cover-asymetrie.jpeg",
      price:"15€"
    },
    {
      id:2,
      title:"Fréquences Basses",
      artist:"Slim Abida",
      description:"Fréquences Basses de Slim Abida sortie le 21/02/2020",
      image:"/latestRelease/cover-frequenceBasses.png",
      price:"15€"
    },
    {
      id:3,
      title:"Lamma",
      artist:"Jazz Oil",
      description:"Lamma de Jazz Oil  sortie le 25/03/2016",
      image:"/latestRelease/cover-jazzoil-lamma.jpeg",
      price:"15€"
    },
    {
      id:4,
      title:"Vers où",
      artist:"Jazz Oil",
      description:"Single de Jazz Oil  sortie le 21/12/2024",
      image:"/latestRelease/cover-versOuSingle.jpg",
      price:"free"
    },
    {
      id:5,
      title:"The Beginings",
      artist:"Slim Abida",
      description:"Nouveau Single bientôt ",
      image:"/latestRelease/cover-contrast.jpeg",
      price:"free"
    },
  ]
return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {albums.map((album) => (
        <div
          key={album.id}
          className="flex h-full min-h-[380px] min-w-0 flex-col overflow-hidden rounded-lg bg-white shadow-md"
        >
          <img
            className="h-48 w-full shrink-0 object-cover"
            src={album.image}
            alt={album.title}
          />
          <div className="flex min-h-0 flex-1 flex-col p-4 text-sm">
            <p className="text-slate-600">{album.price}</p>
            <p className="text-slate-800 text-base font-medium my-1.5">
              {album.artist}
            </p>
            <p className="min-h-0 flex-1 text-slate-500">{album.description}</p>
            <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
              <button className="bg-slate-100 text-blue-600 py-2 rounded cursor-pointer">
                Ajouter au panier
              </button>
              <button className="bg-blue-600 text-white py-2 rounded cursor-pointer">
                Acheter maintenant
              </button>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
