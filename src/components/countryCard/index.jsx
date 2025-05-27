import { Link } from "react-router-dom";
import FavoriteButton from "../FavoriteButton";

export default function CountryCard({
  id,
  name,
  flag,
  capital,
  region,
  isFavorite,
  onToggleFavorite,
}) {
  return (
    <div className="border rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden bg-white">
      <img
        src={flag}
        alt={`Bandeira de ${name}`}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 mb-1">Capital: {capital || "N/A"}</p>
        <p className="text-gray-600 mb-4">Região: {region}</p>
        <div className="flex justify-between items-center">
          <Link
            to={`/detalhes/${id}`}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Ver detalhes →
          </Link>
          <FavoriteButton
            isFavorite={isFavorite}
            onToggle={onToggleFavorite}
          />
        </div>
      </div>
    </div>
  );
}