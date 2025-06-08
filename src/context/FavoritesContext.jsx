// src/context/FavoritesContext.jsx
import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (country) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.cca3 === country.cca3);
      return exists
        ? prev.filter((item) => item.cca3 !== country.cca3)
        : [...prev, country];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};