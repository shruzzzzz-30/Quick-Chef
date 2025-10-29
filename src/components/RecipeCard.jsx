import React, { useEffect, useState } from "react";
import { filterByIngredients, filterByCategory } from "../services/api";
import RecipeCard from "../components/RecipeCard";

export default function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch recipes (adjust this part according to your setup)
  useEffect(() => {
    async function fetchData() {
      const params = new URLSearchParams(window.location.hash.split("?")[1]);
      const mood = params.get("mood");
      const ingredients = params.get("ingredients");

      let result;
      if (mood) {
        result = await filterByCategory(mood);
      } else if (ingredients) {
        result = await filterByIngredients(ingredients);
      }
      setRecipes(result?.meals || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  // 🔥 THIS HANDLES NAVIGATION TO DETAIL PAGE
  const openRecipe = (id) => {
    window.location.hash = `/recipe/${id}`;
  };

  if (loading) return <p className="text-center mt-10">Loading recipes...</p>;

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {recipes.length === 0 ? (
        <p className="col-span-full text-center text-gray-500 text-lg">
          No recipes found 🍳
        </p>
      ) : (
        recipes.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} onOpen={openRecipe} />
        ))
      )}
    </div>
  );
}
