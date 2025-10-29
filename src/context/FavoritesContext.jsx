import React, { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("quickchef:favorites");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("quickchef:favorites", JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  const addFavorite = (meal) => {
    setFavorites(prev => {
      if (prev.some(m => m.idMeal === meal.idMeal)) return prev;
      return [meal, ...prev];
    });
  };

  const removeFavorite = (idMeal) => {
    setFavorites(prev => prev.filter(m => m.idMeal !== idMeal));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
