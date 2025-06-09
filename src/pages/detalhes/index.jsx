// src/pages/detalhes.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Detalhes() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [id]);

  if (loading) return <p>Carregando detalhes do produto...</p>;
  if (!product) return <p>Produto não encontrado.</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">{product.title}</h2>
      <img src={product.thumbnail} alt={product.title} className="my-4 w-full max-w-md object-cover rounded" />
      <p><strong>Descrição:</strong> {product.description}</p>
      <p><strong>Preço:</strong> ${product.price}</p>
      <p><strong>Categoria:</strong> {product.category}</p>
      <p><strong>Marca:</strong> {product.brand}</p>
      <p><strong>Estoque:</strong> {product.stock}</p>
      <Link to="/" className="text-blue-500 underline mt-4 inline-block">Voltar para lista</Link>
    </div>
  );
}
