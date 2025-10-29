import React from "react";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  function open(id) {
    window.location.hash = `/recipe/${id}`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-orange-700 mb-8 text-center drop-shadow-sm">
          ❤️ Your Favorite Recipes
        </h1>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-2xl shadow-md">
            <p className="text-gray-600 text-lg">
              You haven’t added any favorites yet. <br />
              <span className="text-orange-600 font-semibold">
                Explore recipes and add your favorites!
              </span>
            </p>
          </div>
        ) : (
          /* Favorite Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {favorites.map((f) => (
              <div
                key={f.idMeal}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image */}
                <img
                  src={f.strMealThumb}
                  alt={f.strMeal}
                  className="w-full h-52 object-cover cursor-pointer"
                  onClick={() => open(f.idMeal)}
                />

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-xl text-gray-800 truncate">
                    {f.strMeal}
                  </h3>

                  {/* Buttons */}
                  <div className="mt-5 flex justify-between items-center">
                    <button
                      onClick={() => open(f.idMeal)}
                      className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-4 py-2 rounded-lg shadow transition-colors duration-200"
                    >
                      Open
                    </button>
                    <button
                      onClick={() => removeFavorite(f.idMeal)}
                      className="text-red-500 hover:text-red-600 font-medium transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
