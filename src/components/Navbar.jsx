import React, { useState, useEffect } from "react";

function go(path) {
  window.location.hash = path;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const current = window.location.hash.slice(1) || "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/70 shadow-lg"
          : "bg-gradient-to-r from-orange-500 to-red-500 shadow-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => go("/")}
        >
          <div className="bg-white text-orange-600 w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-lg shadow-inner">
            Q
          </div>
          <div
            className={`font-extrabold text-xl tracking-wide ${
              scrolled ? "text-orange-600" : "text-white"
            }`}
          >
            QuickChef
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden sm:flex gap-6 items-center">
          {[
            { name: "Home", path: "/" },
            { name: "Favorites", path: "/favorites" },
          ].map((link) => (
            <button
              key={link.path}
              onClick={() => go(link.path)}
              className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                current === link.path
                  ? "bg-white text-orange-600 shadow-md"
                  : scrolled
                  ? "text-orange-700 hover:text-orange-500"
                  : "text-white hover:bg-white/20"
              }`}
            >
              {link.name}
              {current === link.path && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-1 bg-orange-600 rounded-full"></span>
              )}
            </button>
          ))}
        </div>

        {/* Mobile Menu */}
        <div className="sm:hidden">
          <button
            className={`p-2 rounded-lg transition-all duration-200 ${
              scrolled
                ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
            onClick={() => alert("Mobile menu toggle coming soon 🍔")}
          >
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
}
