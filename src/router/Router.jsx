import React, { useEffect, useState } from "react";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import RecipeDetail from "../pages/RecipeDetail";
import Favorites from "../pages/Favorites";

/**
 * URL shapes:
 * #/            -> Home
 * #/recipes?ingredients=chicken,onion&exclude=garlic
 * #/recipe/:id  -> Recipe detail (e.g. #/recipe/52772)
 * #/favorites   -> Favorites
 */
function parseHash() {
  const hash = window.location.hash.slice(1) || "/";
  const [path, qs] = hash.split("?");
  return { path, qs: qs || "" };
}

export default function Router() {
  const [route, setRoute] = useState(parseHash());

  useEffect(() => {
    const onHash = () => setRoute(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const { path, qs } = route;

  if (path.startsWith("/recipe/")) {
    const id = path.split("/recipe/")[1];
    return <RecipeDetail id={id} />;
  }

  if (path === "/recipes") return <Recipes queryString={qs} />;
  if (path === "/favorites") return <Favorites />;
  // default Home
  return <Home />;
}
