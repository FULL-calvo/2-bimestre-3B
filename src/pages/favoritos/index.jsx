// Atualização do Favoritos.jsx
import { useFavorites } from "../../context/FavoritesContext";
import CountryCard from "../../components/countryCard";


export default function Favoritos() {
  const { favorites } = useFavorites();

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {favorites.length > 0 ? (
        favorites.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))
      ) : (
        <p className="text-center col-span-full">Nenhum país favorito.</p>
      )}
    </div>
  );
}
