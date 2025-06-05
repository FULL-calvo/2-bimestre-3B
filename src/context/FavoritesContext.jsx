import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export const useFavoritos = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favoritos");
    if (stored) {
      setFavoritos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorite = (id) => {
    setFavoritos((prev) =>
      prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id]
    );
  };

  const isFavorite = (id) => favoritos.includes(id);

  return (
    <FavoritesContext.Provider
      value={{ favoritos, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
