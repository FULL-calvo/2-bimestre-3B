// src/pages/home.jsx
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/countryCard/ProductCard";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/products")
      .then((res) => setProducts(res.data.products));
  }, []);

  return (
    <div className="bg-white min-h-screen flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 max-w-6xl w-full">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
  
  
}
