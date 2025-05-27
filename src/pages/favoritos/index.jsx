import { useFavorites } from "../context/FavoritesContext";
import CountryCard from "../components/CountryCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FavoritesView() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavoriteCountries() {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countries = response.data.filter(country => 
          favorites.includes(country.cca3)
        );
        setFavoriteCountries(countries);
      } catch (error) {
        console.error("Erro ao buscar países favoritos:", error);
      } finally {
        setLoading(false);
      }
    }

    if (favorites.length > 0) {
      fetchFavoriteCountries();
    } else {
      setLoading(false);
    }
  }, [favorites]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-lg">Carregando países favoritos...</p>
    </div>
  );

  if (favorites.length === 0) return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Favoritos</h1>
      <p className="text-gray-600 mb-4">Você ainda não favoritou nenhum país</p>
      <Link 
        to="/" 
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Explorar países
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Países Favoritos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favoriteCountries.map((pais) => (
          <CountryCard
            key={pais.cca3}
            id={pais.cca3}
            name={pais.name.common}
            flag={pais.flags.svg}
            capital={pais.capital?.[0]}
            region={pais.region}
            isFavorite={isFavorite(pais.cca3)}
            onToggleFavorite={() => toggleFavorite(pais.cca3)}
          />
        ))}
      </div>
    </div>
  );
}