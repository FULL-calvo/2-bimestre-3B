import { useFavoritos } from "../favoritos";
import CountryCard from "../CountryCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FavoritesView() {
  const { favoritos, isFavorite, toggleFavorite } = useFavoritos();
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFavoriteCountries() {
      try {
        setLoading(true);
        setError(null);
        
        if (favoritos.length === 0) {
          setFavoriteCountries([]);
          setLoading(false);
          return;
        }

        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countries = response.data.filter(country => 
          favoritos.includes(country.cca3)
        );
        
        // Ordenar alfabeticamente
        const sortedCountries = countries.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        
        setFavoriteCountries(sortedCountries);
      } catch (error) {
        console.error("Erro ao buscar países favoritos:", error);
        setError("Erro ao carregar países favoritos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    fetchFavoriteCountries();
  }, [favoritos]);

  // Loading State
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-rose-50 flex justify-center items-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-pink-200 border-t-pink-600 mx-auto"></div>
          <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-r-red-400 animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
        </div>
        <p className="text-xl text-gray-700 font-medium mt-6">Carregando seus favoritos...</p>
        <p className="text-gray-500 mt-2">Buscando seus países especiais</p>
      </div>
    </div>
  );

  // Error State
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex justify-center items-center p-4">
      <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
        <div className="text-red-500 text-6xl mb-4">💔</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ops! Algo deu errado</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-pink-600 to-red-600 text-white px-8 py-3 rounded-lg hover:from-pink-700 hover:to-red-700 transition-all duration-200 transform hover:scale-105 font-medium"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );

  // Empty State
  if (favoritos.length === 0) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
              ❤️ Meus Favoritos
            </h1>
            <p className="text-gray-600 text-lg">
              Seus países favoritos aparecerão aqui
            </p>
          </div>
        </div>
      </div>

      {/* Empty Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-white p-12 rounded-2xl shadow-lg">
            <div className="text-8xl mb-6">💔</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Nenhum favorito ainda
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Você ainda não favoritou nenhum país. Explore nossa lista e adicione seus países favoritos!
            </p>
            <Link 
              to="/"
              className="inline-flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 font-medium text-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Explorar Países
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  // Main Content
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-rose-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
              ❤️ Meus Países Favoritos
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              Seus destinos dos sonhos em um só lugar
            </p>
            
            {/* Stats */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-3 rounded-full">
                <span className="font-medium">❤️ {favoriteCountries.length} países favoritos</span>
              </div>
              <Link 
                to="/"
                className="bg-indigo-100 text-indigo-700 px-6 py-3 rounded-full hover:bg-indigo-200 transition-colors duration-200 font-medium"
              >
                🌍 Explorar mais países
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de Favoritos */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteCountries.map((pais) => (
            <div key={pais.cca3} className="relative">
              {/* Badge de Favorito */}
              <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-pink-500 to-red-500 text-white p-2 rounded-full shadow-lg">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              
              <CountryCard
                id={pais.cca3}
                name={pais.name.common}
                flag={pais.flags.svg}
                capital={pais.capital?.[0]}
                region={pais.region}
                population={pais.population}
                isFavorite={isFavorite(pais.cca3)}
                onToggleFavorite={() => toggleFavorite(pais.cca3)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Seus países favoritos estão salvos localmente</p>
            <p className="text-sm">Continue explorando e descobrindo novos destinos! 🌟</p>
          </div>
        </div>
      </footer>
    </div>
  );
}