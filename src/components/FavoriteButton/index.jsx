import React from "react";
import { useFavoritos } from "../context/FavoritesContext";

export default function FavoriteButton({ id }) {
  const { isFavorite, toggleFavorite } = useFavoritos();
  const favorito = isFavorite(id);

  return (
    <button
      onClick={() => toggleFavorite(id)}
      aria-label={favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors
        ${favorito ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}
      `}
    >
      {favorito ? (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-current"
            viewBox="0 0 24 24"
            stroke="none"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          Remover dos Favoritos
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          Adicionar aos Favoritos
        </>
      )}
    </button>
  );
}
