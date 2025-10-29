import React, { useEffect, useState } from "react";
import { lookupById } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";

// RecipeDetail — improved instructions layout and polished page styling
export default function RecipeDetail({ id }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    lookupById(id)
      .then((d) => {
        if (!canceled) setDetail(d);
      })
      .catch(console.error)
      .finally(() => !canceled && setLoading(false));
    return () => (canceled = true);
  }, [id]);

  if (loading)
    return (
      <div className="p-6 text-center text-lg text-gray-600 animate-pulse">
        Loading recipe details...
      </div>
    );

  if (!detail)
    return (
      <div className="p-6 text-center text-red-500 text-lg">Recipe not found 😞</div>
    );

  // Build ingredients array
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = detail[`strIngredient${i}`];
    const measure = detail[`strMeasure${i}`];
    if (ing && ing.trim())
      ingredients.push({ ing: ing.trim(), measure: (measure || "").trim() });
  }

  const isFav = favorites.some((f) => f.idMeal === detail.idMeal);

  // Parse instructions into steps. Try to keep natural paragraphs but fall back to sentence split.
  function parseSteps(text) {
    if (!text) return [];
    // Normalize whitespace
    const t = text.replace(/\r/g, "").trim();

    // If the author already used line breaks, use them as steps (preserve non-empty lines)
    const lines = t.split(/\n+/).map((s) => s.trim()).filter(Boolean);
    if (lines.length > 1) return lines;

    // Otherwise split into sentences but try to keep some short groups together
    // Split on punctuation followed by whitespace and an uppercase letter/digit (heuristic)
    const sentences = t
      .split(/(?<=[.!?])\s+(?=[A-Z0-9])/)
      .map((s) => s.trim())
      .filter(Boolean);

    // If too many tiny sentences, group them into 1-2 sentence steps
    if (sentences.length > 8) {
      const grouped = [];
      for (let i = 0; i < sentences.length; i += 2) {
        grouped.push([sentences[i], sentences[i + 1]].filter(Boolean).join(" "));
      }
      return grouped;
    }

    return sentences;
  }

  const steps = parseSteps(detail.strInstructions);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-red-100 py-10 px-5">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-orange-100">
        <div className="lg:flex">
          {/* Left: image */}
          <div className="lg:w-1/2 relative">
            <img
              src={detail.strMealThumb}
              alt={detail.strMeal}
              className="w-full h-96 lg:h-full object-cover brightness-95"
            />
            <button
              onClick={() =>
                isFav
                  ? removeFavorite(detail.idMeal)
                  : addFavorite({
                      idMeal: detail.idMeal,
                      strMeal: detail.strMeal,
                      strMealThumb: detail.strMealThumb,
                    })
              }
              aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
              className={`absolute top-6 right-6 text-3xl p-2 rounded-full transition-transform duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-300 $ {
                isFav
                  ? "bg-white text-red-500 scale-110"
                  : "bg-white text-gray-400 hover:scale-110 hover:text-red-400"
              }`}
            >
              {isFav ? "❤️" : "🤍"}
            </button>
          </div>

          {/* Right: content */}
          <div className="lg:w-1/2 p-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-700 mb-1">
              {detail.strMeal}
            </h1>
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-4">
              <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-700 font-medium">
                {detail.strCategory}
              </span>
              <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-700 font-medium">
                {detail.strArea}
              </span>
              {detail.strTags && (
                <span className="ml-auto text-xs text-gray-500">Tags: {detail.strTags}</span>
              )}
            </div>

            {/* Ingredients compact card */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">🥕 Ingredients</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ingredients.map((it, i) => (
                  <div
                    key={i}
                    className="flex flex-col bg-orange-50 rounded-lg px-3 py-2 shadow-sm"
                  >
                    <span className="text-sm font-semibold text-orange-800">{it.ing}</span>
                    <span className="text-xs text-gray-600">{it.measure || "—"}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cook time / Servings placeholder (if available) */}
            <div className="flex gap-4 items-center text-sm text-gray-600 mb-6">
              {detail.strMeal && (
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  <span>Estimated time: <strong>—</strong></span>
                </div>
              )}
              <div className="flex items-center gap-2 ml-auto">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a2 2 0 0 1 2 2v2" />
                </svg>
                <span>Serves: <strong>—</strong></span>
              </div>
            </div>

            {/* Instructions: timeline / step-by-step */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">🍳 Step-by-step Instructions</h2>

              <ol className="relative border-l border-gray-200">
                {steps.map((s, i) => (
                  <li key={i} className="mb-8 ml-6">
                    <span className="absolute -left-4 flex items-center justify-center w-8 h-8 rounded-full bg-white border shadow text-sm font-semibold">
                      {i + 1}
                    </span>

                    <div className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-sm border">
                      <p className="leading-relaxed text-gray-700 whitespace-pre-line">{s}</p>
                    </div>
                  </li>
                ))}
                {steps.length === 0 && (
                  <li className="mb-8 ml-6">
                    <div className="bg-white/90 p-4 rounded-xl shadow-sm border">
                      <p className="text-gray-600">No instructions available.</p>
                    </div>
                  </li>
                )}
              </ol>

              {/* Video CTA */}
              {detail.strYoutube && (
                <div className="mt-6 text-right">
                  <a
                    href={detail.strYoutube}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-5 py-2 rounded-full shadow-md hover:scale-105 transform transition"
                  >
                    🎥 Watch Video
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
