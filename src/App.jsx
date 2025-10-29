import React from "react";
import Navbar from "./components/Navbar";
import { FavoritesProvider } from "./context/FavoritesContext";
import Router from "./router/Router";

export default function App() {
  return (
    <FavoritesProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Router />
        </main>
      </div>
    </FavoritesProvider>
  );
}
