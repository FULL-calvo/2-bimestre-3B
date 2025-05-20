import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [paises, setPaises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPaises() {
      try {
        const res = await axios.get("https://restcountries.com/v3.1/all");
        // Ordena alfabeticamente por nome comum
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

  if (loading) return <p>Carregando países...</p>;

  return (
    <div>
      <h2>Lista de países</h2>
      <ul>
        {paises.map((pais) => (
          <li key={pais.cca3} style={{ marginBottom: "10px" }}>
            <Link to={`/detalhes/${pais.cca3}`}>
              <img
                src={pais.flags.svg}
                alt={`Bandeira de ${pais.name.common}`}
                width={30}
                style={{ marginRight: "10px", verticalAlign: "middle" }}
              />
              {pais.name.common}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
