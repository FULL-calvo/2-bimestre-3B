// src/pages/favoritos.jsx
import { useFavorites } from "../../context/FavoritesContext";
import ProductCard from "../../components/countryCard/ProductCard";

export default function Favoritos() {
  const { favorites } = useFavorites();

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {favorites.length > 0 ? (
        favorites.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p className="text-center col-span-full">Nenhum produto favorito.</p>
      )}
    </div>
  );
}
