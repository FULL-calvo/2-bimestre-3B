// src/components/ProductCard.jsx
import { useFavorites } from "../../context/FavoritesContext";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.some((item) => item.id === product.id);

  return (
    <div className="border p-4 rounded shadow-md flex flex-col items-start">
      <h2 className="text-xl font-semibold">{product.title}</h2>
      <p className="text-sm mb-2">Categoria: {product.category}</p>
      <img src={product.thumbnail} alt={product.title} className="mb-2 w-full h-40 object-cover rounded" />
      <div className="flex gap-2">
        <Link
          to={`/detalhes/${product.id}`}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Detalhes
        </Link>
        <button
          onClick={() => toggleFavorite(product)}
          className={`px-3 py-1 rounded text-white ${isFavorite ? "bg-red-500" : "bg-green-500"}`}
        >
          {isFavorite ? "Remover" : "Favoritar"}
        </button>
      </div>
    </div>
  );
}
