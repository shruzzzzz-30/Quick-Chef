import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [ingredients, setIngredients] = useState("");
  const [exclude, setExclude] = useState("");

  function submit(e) {
    e?.preventDefault();
    const ing = ingredients
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .join(",");
    const ex = exclude
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .join(",");
    if (!ing) {
      alert("Please enter at least one ingredient (e.g., chicken, onion).");
      return;
    }
    onSearch({ ingredients: ing, exclude: ex });
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-orange-100 hover:shadow-2xl transition-all duration-300"
    >
      {/* 🍅 Ingredients Input & Button */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="flex-1 p-3 sm:p-4 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md"
          placeholder="Enter ingredients you have (e.g., chicken, onion)"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-red-500 hover:to-orange-500 text-white px-8 py-3 sm:py-4 rounded-xl font-semibold tracking-wide shadow-md hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 duration-200"
        >
          🔍 Search
        </button>
      </div>

      {/* 🧂 Exclude Ingredients */}
      <div className="mt-5 flex flex-col sm:flex-row gap-4 items-center">
        <input
          value={exclude}
          onChange={(e) => setExclude(e.target.value)}
          className="flex-1 p-3 sm:p-4 border border-orange-200 rounded-xl focus:ring-2 focus:ring-orange-300 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md"
          placeholder="Exclude ingredients (optional)"
        />
        <p className="text-sm text-gray-500 italic sm:whitespace-nowrap">
          💡 Tip: separate multiple items with commas
        </p>
      </div>
    </form>
  );
}
