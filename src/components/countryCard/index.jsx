import React from 'react';
import { useFavoritos } from '../../context/FavoritesContext';

export default function CountryCard({ id, name, flag, capital, region, population }) {
  const { isFavorite, toggleFavorite } = useFavoritos();

  return (
    <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200">
      <img src={flag} alt={`Bandeira de ${name}`} className="w-full h-40 object-cover rounded-md mb-4" />
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p className="text-sm text-gray-600">Capital: {capital || 'N/A'}</p>
      <p className="text-sm text-gray-600">Região: {region}</p>
      <p className="text-sm text-gray-600 mb-4">População: {population.toLocaleString()}</p>
      
      <button
        onClick={() => toggleFavorite(id)}
        className={`w-full px-4 py-2 rounded-lg font-semibold transition-all ${
          isFavorite(id)
            ? 'bg-red-500 text-white hover:bg-red-600'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {isFavorite(id) ? 'Remover dos Favoritos ❤️' : 'Adicionar aos Favoritos 🤍'}
      </button>
    </div>
  );
}
