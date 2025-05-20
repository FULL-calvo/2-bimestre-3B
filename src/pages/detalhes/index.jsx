import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Detalhes() {
  const { id } = useParams(); // id é o cca3 do país
  const [pais, setPais] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Carregando detalhes do país...</p>;
  if (!pais) return <p>País não encontrado.</p>;

  return (
    <div>
      <h2>{pais.name.common}</h2>
      <img src={pais.flags.svg} alt={`Bandeira de ${pais.name.common}`} width={150} />
      <p><strong>Capital:</strong> {pais.capital ? pais.capital.join(", ") : "Sem capital"}</p>
      <p><strong>Região:</strong> {pais.region}</p>
      <p><strong>Sub-região:</strong> {pais.subregion}</p>
      <p><strong>População:</strong> {pais.population.toLocaleString()}</p>
      <p><strong>Área:</strong> {pais.area.toLocaleString()} km²</p>
      <p><strong>Idiomas:</strong> {pais.languages ? Object.values(pais.languages).join(", ") : "Sem dados"}</p>
      <p><strong>Moeda(s):</strong> {pais.currencies ? Object.values(pais.currencies).map(c => c.name).join(", ") : "Sem dados"}</p>
      <Link to="/">Voltar para lista</Link>
    </div>
  );
}
