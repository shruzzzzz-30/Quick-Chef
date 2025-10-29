import React, { useEffect, useMemo, useState } from "react";
import { filterByIngredients, filterByCategory, lookupById } from "../services/api";
import RecipeCard from "../components/RecipeCard";

function parseQS(qs) {
  const p = new URLSearchParams(qs);
  return {
    ingredients: p.get("ingredients") || "",
    exclude: p.get("exclude") || "",
    category: p.get("category") || "",
    mood: p.get("mood") || "",
  };
}

function simulatePrepCategory(idMeal) {
  const n = parseInt(String(idMeal).slice(-3).replace(/\D/g, ""), 10) || 0;
  const mod = n % 3;
  return mod === 0 ? "quick" : mod === 1 ? "medium" : "long";
}

export default function Recipes({ queryString = "" }) {
  const { ingredients, exclude, category, mood } = parseQS(queryString);
  const [meals, setMeals] = useState([]);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [prepFilter, setPrepFilter] = useState("all");
  const [cuisineFilter, setCuisineFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    async function run() {
      try {
        let list = [];

        if (category) list = await filterByCategory(category);
        else if (ingredients) list = await filterByIngredients(ingredients);
        else if (mood) {
          const moodRecipes = {
            Comfort: [
              { idMeal: "10001", strMeal: "Mac & Cheese", strMealThumb: "https://images.unsplash.com/photo-1601050690597-7a36c2b4c9f1?auto=format&fit=crop&w=600&q=60" },
              { idMeal: "10002", strMeal: "Mashed Potatoes", strMealThumb: "https://images.unsplash.com/photo-1603038865247-4e2b9ac6e1e0?auto=format&fit=crop&w=600&q=60" },
            ],
            Spicy: [
              { idMeal: "10003", strMeal: "Spicy Paneer Tikka", strMealThumb: "https://images.unsplash.com/photo-1617196034796-73f8d7d5e4b3?auto=format&fit=crop&w=600&q=60" },
              { idMeal: "10004", strMeal: "Chili Garlic Noodles", strMealThumb: "https://images.unsplash.com/photo-1605475124550-8ec4e3d8f40b?auto=format&fit=crop&w=600&q=60" },
            ],
            Sweet: [
              { idMeal: "10005", strMeal: "Chocolate Cake", strMealThumb: "https://images.unsplash.com/photo-1614707267537-5fd0b5a727ce?auto=format&fit=crop&w=600&q=60" },
              { idMeal: "10006", strMeal: "Pancakes with Honey", strMealThumb: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=600&q=60" },
            ],
            Healthy: [
              { idMeal: "10007", strMeal: "Avocado Salad", strMealThumb: "https://images.unsplash.com/photo-1556911220-e15b29be8c47?auto=format&fit=crop&w=600&q=60" },
              { idMeal: "10008", strMeal: "Fruit Smoothie", strMealThumb: "https://images.unsplash.com/photo-1615486364057-0b092e1ef6e8?auto=format&fit=crop&w=600&q=60" },
            ],
          };
          list = moodRecipes[mood] || [];
        }

        if (cancelled) return;

        if (exclude) {
          const exs = exclude.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
          list = list.filter((m) => !exs.some((ex) => m.strMeal.toLowerCase().includes(ex)));
        }

        setMeals(list || []);

        const toFetch = (list || []).slice(0, 12).map((m) => m.idMeal);
        const arr = await Promise.all(toFetch.map((id) => lookupById(id)));
        if (cancelled) return;
        const map = {};
        arr.forEach((d) => {
          if (d) map[d.idMeal] = d;
        });
        setDetails(map);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => (cancelled = true);
  }, [ingredients, exclude, category, mood]);

  const cuisines = useMemo(() => {
    const set = new Set();
    Object.values(details).forEach((d) => {
      if (d && d.strArea) set.add(d.strArea);
    });
    return ["all", ...Array.from(set)];
  }, [details]);

  const filtered = useMemo(() => {
    let list = meals.slice();
    if (prepFilter !== "all")
      list = list.filter((m) => simulatePrepCategory(m.idMeal) === prepFilter);
    if (cuisineFilter !== "all")
      list = list.filter((m) => {
        const d = details[m.idMeal];
        return d && d.strArea === cuisineFilter;
      });
    return list;
  }, [meals, details, prepFilter, cuisineFilter]);

  function openRecipe(id) {
    window.location.hash = `/recipe/${id}`;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-red-50">
      {/* 🌟 Navbar Header */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-orange-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => window.history.back()}
            className="text-gray-700 hover:text-orange-600 transition text-sm font-medium flex items-center gap-2"
            aria-label="Go back"
          >
            <span className="text-lg">←</span> Back
          </button>

          <h1 className="text-xl sm:text-2xl font-bold text-orange-700 tracking-tight">
            {mood ? `${mood} Recipes` : "Delicious Recipes"}
          </h1>

          <div className="w-8" /> {/* placeholder for balance */}
        </div>
      </nav>

      {/* 🌿 Main Content */}
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-8">
        {/* Filters & Recipe Grid */}
        <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-orange-100 mb-10 flex flex-wrap gap-6 items-end">
          <div>
            <label className="text-xs uppercase tracking-wide text-gray-500 block mb-1">Prep Time</label>
            <select
              className="border border-orange-200 bg-white px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400"
              value={prepFilter}
              onChange={(e) => setPrepFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="quick">Quick (&lt; 20 min)</option>
              <option value="medium">Medium (20–40 min)</option>
              <option value="long">Long (&gt; 40 min)</option>
            </select>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wide text-gray-500 block mb-1">Cuisine</label>
            <select
              className="border border-orange-200 bg-white px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-400"
              value={cuisineFilter}
              onChange={(e) => setCuisineFilter(e.target.value)}
            >
              {cuisines.map((c) => (
                <option key={c} value={c}>
                  {c === "all" ? "All" : c.charAt(0).toUpperCase() + c.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="ml-auto text-sm text-gray-600 flex items-center gap-2">
            <svg className="w-5 h-5 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 7h18M6 11h12M10 15h4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              Showing <span className="font-semibold text-orange-600">{filtered.length}</span> / {meals.length} recipes
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl h-64" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-600 italic p-12 bg-white/60 rounded-2xl border border-dashed border-orange-100">
            <p className="mb-3">No recipes found — try changing filters or go back to Home to pick a different mood.</p>
            <button
              onClick={() => (window.location.hash = "/")}
              className="inline-block mt-2 px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold shadow hover:scale-105 transition"
            >
              Go to Home
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filtered.map((m) => {
              const d = details[m.idMeal];
              const area = d?.strArea || "Unknown";
              const prep = simulatePrepCategory(m.idMeal);

              return (
                <div
                  key={m.idMeal}
                  onClick={() => openRecipe(m.idMeal)}
                  className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transform transition-all overflow-hidden border border-transparent hover:border-orange-100"
                >
                  <div className="relative">
                    <img src={m.strMealThumb} alt={m.strMeal} className="w-full h-56 object-cover" />
                    <div className="absolute left-3 top-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-orange-700 shadow">
                      {prep}
                    </div>
                    <div className="absolute right-3 top-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-gray-700 shadow">
                      {area}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{m.strMeal}</h3>
                    <p className="text-sm text-gray-500 mt-1">Tap to view details • {d ? d.strCategory : "—"}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
