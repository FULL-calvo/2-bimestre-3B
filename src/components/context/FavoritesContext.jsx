import React, { createContext, useState, useContext } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (id) => {
    setFavorites(prev => [...prev, id]);
  };

  const removeFavorite = (id) => {
    setFavorites(prev => prev.filter(itemId => itemId !== id));
  };

  const isFavorite = (id) => favorites.includes(id);

  const toggleFavorite = (id) => {
    isFavorite(id) ? removeFavorite(id) : addFavorite(id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}