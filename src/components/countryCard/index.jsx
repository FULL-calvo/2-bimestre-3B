// src/components/CountryCard.jsx
import { useFavorites } from "../../context/FavoritesContext";
import { Link } from "react-router-dom";

export default function CountryCard({ country }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((item) => item.cca3 === country.cca3);

  return (
    <div className="border p-4 rounded shadow-md flex flex-col items-start">
      <h2 className="text-xl font-semibold">{country.name.common}</h2>
      <p className="text-sm mb-2">Região: {country.region}</p>
      <div className="flex gap-2">
        <Link
          to={`/detalhes/${country.cca3}`}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Detalhes
        </Link>
        <button
          onClick={() => toggleFavorite(country)}
          className={`px-3 py-1 rounded text-white ${
            isFavorite ? "bg-red-500" : "bg-green-500"
          }`}
        >
          {isFavorite ? "Remover" : "Favoritar"}
        </button>
      </div>
    </div>
  );
}
