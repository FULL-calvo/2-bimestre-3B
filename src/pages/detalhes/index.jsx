import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  MapPin, 
  Globe, 
  Users, 
  Calendar,
  DollarSign,
  Languages,
  Map,
  Phone,
  Car,
  ExternalLink,
  RefreshCw,
  AlertCircle
} from "lucide-react";
import { useFavorites } from "../../context/FavoritesContext";
import FavoriteButton from "../components/FavoriteButton";

// Componente de Loading aprimorado
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex justify-center items-center">
    <div className="text-center">
      <div className="relative">
        <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 border-t-indigo-600 mx-auto"></div>
        <div className="absolute inset-0 rounded-full h-20 w-20 border-4 border-transparent border-r-purple-400 animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
      </div>
      <p className="text-xl text-gray-700 font-medium mt-6">Carregando detalhes...</p>
      <p className="text-gray-500 mt-2">Buscando informações do país</p>
    </div>
  </div>
);

// Componente de Erro aprimorado
const ErrorMessage = ({ onRetry, countryCode }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex justify-center items-center p-4">
      <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md">
        <AlertCircle className="text-red-500 w-16 h-16 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">País não encontrado</h2>
        <p className="text-gray-600 mb-6">
          Não foi possível encontrar informações para o código "{countryCode}".
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={onRetry}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 font-medium flex items-center gap-2"
          >
            <RefreshCw size={18} />
            Tentar Novamente
          </button>
          <button 
            onClick={() => navigate('/')}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-all duration-200 font-medium flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente para informações detalhadas
const DetailCard = ({ icon: Icon, label, value, color = "blue" }) => {
  const colorClasses = {
    blue: "text-blue-500 bg-blue-50 border-blue-200",
    green: "text-green-500 bg-green-50 border-green-200",
    purple: "text-purple-500 bg-purple-50 border-purple-200",
    orange: "text-orange-500 bg-orange-50 border-orange-200",
    red: "text-red-500 bg-red-50 border-red-200",
    indigo: "text-indigo-500 bg-indigo-50 border-indigo-200"
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
          <p className="text-gray-900 font-semibold break-words">{value}</p>
        </div>
      </div>
    </div>
  );
};

// Componente para seção de vizinhos
const BorderCountries = ({ borders }) => {
  if (!borders || borders.length === 0) return null;

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Map className="text-green-500" size={20} />
        Países Vizinhos
      </h3>
      <div className="flex flex-wrap gap-2">
        {borders.map((border) => (
          <Link
            key={border}
            to={`/country/${border}`}
            className="px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 text-sm font-medium flex items-center gap-1"
          >
            {border}
            <ExternalLink size={12} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default function DetailsView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pais, setPais] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const fetchPais = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await axios.get(`https://restcountries.com/v3.1/alpha/${id}`);
      setPais(res.data[0]);
    } catch (error) {
      console.error("Erro ao buscar país:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPais();
  }, [fetchPais]);

  // Função para formatar população
  const formatPopulation = (pop) => {
    if (pop >= 1000000000) {
      return `${(pop / 1000000000).toFixed(1)} bilhão`;
    } else if (pop >= 1000000) {
      return `${(pop / 1000000).toFixed(1)} milhões`;
    } else if (pop >= 1000) {
      return `${(pop / 1000).toFixed(0)} mil`;
    }
    return pop?.toLocaleString() || 'N/A';
  };

  // Função para formatar área
  const formatArea = (area) => {
    return area ? `${area.toLocaleString()} km²` : 'N/A';
  };

  if (loading) return <LoadingSpinner />;
  if (error || !pais) return <ErrorMessage onRetry={fetchPais} countryCode={id} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors self-start"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Voltar</span>
            </button>
            
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {pais.name.common}
              </h1>
              {pais.name.official !== pais.name.common && (
                <p className="text-gray-600 mt-1">{pais.name.official}</p>
              )}
            </div>

            <FavoriteButton 
              isFavorite={isFavorite(id)}
              onToggle={() => toggleFavorite(id)}
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Flag Section */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Bandeira Nacional</h2>
            <div className="relative overflow-hidden rounded-xl">
              <img 
                src={pais.flags.svg} 
                alt={`Bandeira de ${pais.name.common}`} 
                className="w-full h-64 object-cover shadow-md"
              />
            </div>
            {pais.flags.alt && (
              <p className="text-sm text-gray-600 mt-3 italic">{pais.flags.alt}</p>
            )}
          </div>

          {/* Coat of Arms */}
          {pais.coatOfArms?.svg && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Brasão de Armas</h2>
              <div className="flex justify-center">
                <img 
                  src={pais.coatOfArms.svg} 
                  alt={`Brasão de ${pais.name.common}`} 
                  className="h-64 object-contain"
                />
              </div>
            </div>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <DetailCard
            icon={MapPin}
            label="Capital"
            value={pais.capital ? pais.capital.join(", ") : "N/A"}
            color="blue"
          />
          
          <DetailCard
            icon={Globe}
            label="Região"
            value={pais.region}
            color="green"
          />
          
          <DetailCard
            icon={Map}
            label="Sub-região"
            value={pais.subregion || "N/A"}
            color="purple"
          />
          
          <DetailCard
            icon={Users}
            label="População"
            value={formatPopulation(pais.population)}
            color="orange"
          />
          
          <DetailCard
            icon={Calendar}
            label="Área Total"
            value={formatArea(pais.area)}
            color="red"
          />
          
          <DetailCard
            icon={Languages}
            label="Idiomas"
            value={pais.languages ? Object.values(pais.languages).join(", ") : "N/A"}
            color="indigo"
          />
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Economic Info */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <DollarSign className="text-green-500" size={20} />
              Informações Econômicas
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Moeda(s)</p>
                <p className="text-gray-900 font-semibold">
                  {pais.currencies 
                    ? Object.entries(pais.currencies).map(([code, currency]) => 
                        `${currency.name} (${code}) - ${currency.symbol || 'N/A'}`
                      ).join(", ")
                    : "N/A"
                  }
                </p>
              </div>
              {pais.gini && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Índice de Gini</p>
                  <p className="text-gray-900 font-semibold">
                    {Object.entries(pais.gini).map(([year, value]) => `${value} (${year})`).join(", ")}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Geographic Info */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Map className="text-blue-500" size={20} />
              Informações Geográficas
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Coordenadas</p>
                <p className="text-gray-900 font-semibold">
                  {pais.latlng ? `${pais.latlng[0]}°, ${pais.latlng[1]}°` : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Continente</p>
                <p className="text-gray-900 font-semibold">
                  {pais.continents ? pais.continents.join(", ") : "N/A"}
                </p>
              </div>
              {pais.landlocked !== undefined && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Sem saída para o mar</p>
                  <p className="text-gray-900 font-semibold">
                    {pais.landlocked ? "Sim" : "Não"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Technical Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Codes and Domains */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Phone className="text-purple-500" size={20} />
              Códigos e Domínios
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Código do País</p>
                <p className="text-gray-900 font-semibold">{pais.cca2} / {pais.cca3}</p>
              </div>
              {pais.idd?.root && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Código Telefônico</p>
                  <p className="text-gray-900 font-semibold">
                    {pais.idd.root}{pais.idd.suffixes ? pais.idd.suffixes.join(", ") : ""}
                  </p>
                </div>
              )}
              {pais.tld && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Domínio de Internet</p>
                  <p className="text-gray-900 font-semibold">{pais.tld.join(", ")}</p>
                </div>
              )}
            </div>
          </div>

          {/* Transport */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Car className="text-orange-500" size={20} />
              Transporte
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Lado do Trânsito</p>
                <p className="text-gray-900 font-semibold">
                  {pais.car?.side === "right" ? "Direita" : pais.car?.side === "left" ? "Esquerda" : "N/A"}
                </p>
              </div>
              {pais.car?.signs && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Placa de Carro</p>
                  <p className="text-gray-900 font-semibold">{pais.car.signs.join(", ")}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Border Countries */}
        <BorderCountries borders={pais.borders} />

        {/* Map Link */}
        {pais.maps?.googleMaps && (
          <div className="mt-8 text-center">
            <a
              href={pais.maps.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 font-medium"
            >
              <Map size={20} />
              Ver no Google Maps
              <ExternalLink size={16} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}