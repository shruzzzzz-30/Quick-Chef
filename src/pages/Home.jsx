import React from "react";
import SearchBar from "../components/SearchBar";
import MoodCards from "../components/MoodCards";

export default function Home() {
  function onSearch({ ingredients, exclude }) {
    const params = new URLSearchParams();
    if (ingredients) params.set("ingredients", ingredients);
    if (exclude) params.set("exclude", exclude);
    window.location.hash = `/recipes?${params.toString()}`;
  }

  function handleMoodSelect(mood) {
    window.location.hash = `/recipes?mood=${mood}`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-red-100 py-16 px-6 sm:px-8 lg:px-12 flex flex-col items-center justify-center">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-14">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-500 drop-shadow-sm mb-4">
          🍳 What’s Cooking Today?
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
          Enter ingredients you have, exclude what you don’t — or let your mood decide your next meal!
        </p>
      </div>

      {/* Search Bar Section */}
      <div className="w-full max-w-3xl mb-16 bg-white/80 backdrop-blur-md border border-orange-100 rounded-2xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-shadow duration-300">
        <SearchBar onSearch={onSearch} />
      </div>

      {/* Mood-based Recipes Section */}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-orange-800 mb-8">
          🌈 Explore Recipes by Mood
        </h2>
        <p className="text-gray-600 mb-6 text-base sm:text-lg max-w-2xl mx-auto">
          Feeling cozy, energetic, or adventurous? Discover dishes that match how you feel!
        </p>
        <div className="mt-8">
          <MoodCards onSelectMood={handleMoodSelect} />
        </div>
      </div>

      {/* Footer Accent */}
      <div className="mt-20 text-center text-sm text-gray-500">
        <p>
          Made with <span className="text-red-500">♥</span> for food lovers everywhere.
        </p>
      </div>
    </div>
  );
}
