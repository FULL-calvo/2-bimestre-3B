import axios from "axios";
import { useEffect, useState } from "react";
import CountryCard from "../../components/countryCard";
import { useFavoritos } from "../favoritos";

export default function Home() {
  const [paises, setPaises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toggleFavorite, isFavorite, getFavoritesCount } = useFavoritos();

  useEffect(() => {
    async function fetchPaises() {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("https://restcountries.com/v3.1/all");
        const sorted = res.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setPaises(sorted);
      } catch (error) {
        console.error("Erro ao buscar países:", error);
        setError("Erro ao carregar países. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    }
    fetchPaises();
  }, []);

  // Loading State
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
          <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-r-purple-400 animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
        </div>
        <p className="text-xl text-gray-700 font-medium mt-6">Carregando países...</p>
        <p className="text-gray-500 mt-2">Explorando o mundo para você</p>
      </div>
    </div>
  );

  // Error State
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex justify-center items-center p-4">
      <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
        <div className="text-red-500 text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Algo deu errado</h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 font-medium"
        >
          Tentar Novamente
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header da página */}
      <div className="bg-white shadow-lg border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              🌍 Lista de Países
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              Explore países ao redor do mundo e adicione seus favoritos
            </p>
            
            {/* Informações úteis */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full">
                <span className="font-medium">📊 {paises.length} países encontrados</span>
              </div>
              <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-2 rounded-full flex items-center gap-2">
                <span>❤️</span>
                <span className="font-medium">{getFavoritesCount ? getFavoritesCount() : 0} favoritos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de países */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paises.map((pais) => (
            <CountryCard
              key={pais.cca3}
              id={pais.cca3}
              name={pais.name.common}
              flag={pais.flags.svg}
              capital={pais.capital?.[0]}
              region={pais.region}
              population={pais.population}
              isFavorite={isFavorite(pais.cca3)}
              onToggleFavorite={() => toggleFavorite(pais.cca3)}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">Dados fornecidos por REST Countries API</p>
            <p className="text-sm">Desenvolvido com ❤️ usando React + Tailwind CSS</p>
          </div>
        </div>
      </footer>
    </div>
  );
}