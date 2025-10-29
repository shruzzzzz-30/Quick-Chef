import React from "react";
import { useFavorites } from "../context/FavoritesContext";

export default function RecipeCard({ meal, onOpen }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFav = favorites.some((f) => f.idMeal === meal.idMeal);

  return (
    <div
      className="bg-white rounded-3xl shadow-md hover:shadow-2xl overflow-hidden border border-orange-100 
                 transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02]"
    >
      {/* Recipe Image */}
      <div
        className="relative cursor-pointer group"
        onClick={() => onOpen(meal.idMeal)}
      >
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Favorite Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            isFav ? removeFavorite(meal.idMeal) : addFavorite(meal);
          }}
          className={`absolute top-3 right-3 text-2xl transition-all duration-300 transform 
            ${
              isFav
                ? "text-red-500 scale-110"
                : "text-white hover:text-red-400 hover:scale-125"
            } drop-shadow-lg`}
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Recipe Info */}
      <div className="p-5 flex flex-col justify-between min-h-[130px] bg-gradient-to-b from-white to-orange-50">
        <h3 className="font-semibold text-lg text-gray-800 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
          {meal.strMeal}
        </h3>

        <div className="flex items-center justify-between mt-auto">
          <button
            onClick={() => onOpen(meal.idMeal)}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm px-5 py-2 
                       rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 font-medium"
          >
            View Recipe 🍴
          </button>
        </div>
      </div>
    </div>
  );
}
