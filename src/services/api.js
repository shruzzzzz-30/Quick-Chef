const BASE = "https://www.themealdb.com/api/json/v1/1";

/**
 * Use exactly: filter.php?i={ingredient}
 * ingredientQuery is a comma-separated string like "chicken,onion"
 */
export async function filterByIngredients(ingredientQuery) {
  if (!ingredientQuery) return [];
  const q = encodeURIComponent(ingredientQuery);
  const res = await fetch(`${BASE}/filter.php?i=${q}`);
  if (!res.ok) throw new Error("Network error");
  const data = await res.json();
  return data.meals || [];
}

export async function filterByCategory(category) {
  if (!category) return [];
  const res = await fetch(`${BASE}/filter.php?c=${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error("Network error");
  const data = await res.json();
  return data.meals || [];
}
export async function filterByArea(area) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(area)}`
  );
  const data = await res.json();
  return data.meals || [];
}

export async function lookupById(id) {
  if (!id) return null;
  const key = `meal-${id}`;
  try {
    const cached = sessionStorage.getItem(key);
    if (cached) return JSON.parse(cached);
  } catch (e) {}
  const res = await fetch(`${BASE}/lookup.php?i=${id}`);
  if (!res.ok) throw new Error("Network error");
  const data = await res.json();
  const meal = data.meals ? data.meals[0] : null;
  try { if (meal) sessionStorage.setItem(key, JSON.stringify(meal)); } catch(e){}
  return meal;
}

export async function fetchCategories() {
  const res = await fetch(`${BASE}/categories.php`);
  if (!res.ok) throw new Error("Network error");
  const data = await res.json();
  return data.categories || [];
}
