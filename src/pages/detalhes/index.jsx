import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useFavorites } from "../FavoritesContext";
import FavoriteButton from "../components/FavoriteButton";

export default function DetailsView() {
  const { id } = useParams();
  const [pais, setPais] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    async function fetchPais() {
      try {
        const res = await axios.get(`https://restcountries.com/v3.1/alpha/${id}`);
        setPais(res.data[0]);
      } catch (error) {
        console.error("Erro ao buscar país:", error);
      }
      setLoading(false);
    }
    fetchPais();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-lg">Carregando detalhes do país...</p>
    </div>
  );

  if (!pais) return (
    <div className="container mx-auto p-4 text-center">
      <p className="text-lg text-red-600">País não encontrado</p>
      <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">
        Voltar para lista
      </Link>
    </div>
  );

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-3xl font-bold">{pais.name.common}</h2>
        <FavoriteButton 
          isFavorite={isFavorite(id)}
          onToggle={() => toggleFavorite(id)}
          size="lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={pais.flags.svg} 
            alt={`Bandeira de ${pais.name.common}`} 
            className="w-full h-auto border rounded-lg shadow-md"
          />
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Capital" value={pais.capital ? pais.capital.join(", ") : "N/A"} />
            <DetailItem label="Região" value={pais.region} />
            <DetailItem label="Sub-região" value={pais.subregion || "N/A"} />
            <DetailItem label="População" value={pais.population.toLocaleString()} />
            <DetailItem label="Área" value={`${pais.area.toLocaleString()} km²`} />
            <DetailItem label="Idiomas" value={pais.languages ? Object.values(pais.languages).join(", ") : "N/A"} />
            <DetailItem label="Moeda(s)" value={pais.currencies ? Object.values(pais.currencies).map(c => c.name).join(", ") : "N/A"} />
          </div>

          <Link 
            to="/" 
            className="inline-block mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Voltar para lista
          </Link>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ label, value }) {
  return (
    <div>
      <p className="font-semibold text-gray-700">{label}</p>
      <p className="text-gray-900">{value}</p>
    </div>
  );
}