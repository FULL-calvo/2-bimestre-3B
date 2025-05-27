import axios from "axios";
import { useEffect, useState } from "react";
import countryCard from "../countryCard";
import { useFavoritos } from "../favoritos";

export default function Home() {
  const [paises, setPaises] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavoritos();

  useEffect(() => {
    async function fetchPaises() {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all");
        const sorted = res.data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setPaises(sorted);
      } catch (error) {
        console.error("Erro ao buscar países:", error);
      }
      setLoading(false);
    }
    fetchPaises();
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <p className="text-lg">Carregando países...</p>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Lista de Países</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paises.map((pais) => (
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