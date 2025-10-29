🍴 QuickChef – Recipe Finder App
🌐 Live Demo

👉 QuickChef on Vercel

📖 Overview

QuickChef is a modern and responsive recipe discovery web app built using React.js.
It helps users find delicious recipes by mood, ingredients, or cuisine, and provides step-by-step cooking instructions with YouTube video tutorials for an immersive cooking experience.

✨ Features

✅ Search recipes instantly by name or ingredients
✅ Filter recipes by Cuisine Type (South Indian, North Indian, etc.)
✅ Sort by Preparation Time
✅ Click on a recipe to view detailed ingredients and cooking steps
✅ Watch YouTube video tutorials directly from the recipe page
✅ Add and manage your Favorite Recipes ❤️
✅ Fully responsive and elegant UI
✅ Deployed on Vercel for seamless performance

🧩 Tech Stack
Layer	Technology
Frontend	React.js (Hooks, Components, Context API)
Styling	Tailwind CSS + Custom CSS
Data Source	TheMealDB API
Deployment	Vercel
⚙️ Installation and Setup

Follow these steps to run QuickChef locally 👇

# 1️⃣ Clone the repository
git clone https://github.com/<your-username>/quickchef.git

# 2️⃣ Navigate to the folder
cd quickchef

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm run dev


Your app will run at 👉 http://localhost:5173/

📁 Folder Structure
src/
 ├── components/
 │    ├── Navbar.js
 │    ├── SearchBar.js
 │    ├── MoodCards.js
 │    ├── RecipeCard.js
 │    ├── RecipeDetail.js
 │    ├── Favorites.js
 │    └── Filter.js
 ├── context/
 │    └── FavoritesContext.js
 ├── services/
 │    └── api.js
 ├── pages/
 │    ├── Home.js
 │    ├── Recipes.js
 │    └── FavoritesPage.js
 ├── App.js
 ├── index.js
 └── styles.css

🧠 How It Works

Search Recipes by entering ingredients or keywords.

Choose a Mood (e.g., Comfort, Spicy, Sweet, Healthy) to explore matching dishes.

Filter Recipes by cuisine or preparation time.

Click on a recipe card to view:

Ingredients with measurements

Step-by-step cooking instructions

Embedded YouTube video tutorial 🎥

Save your favorite dishes for later in the Favorites section.

🖼️ Screenshots
🏠 Home Page

Users can search recipes, explore by mood, or apply filters.


🍲 Recipe Details Page

View full recipe details, ingredients, and watch cooking tutorials.


❤️ Favorites Page

Easily access and manage your saved recipes.


🚀 Deployment

This app is live on Vercel 🚀
Deployed version: https://quickchef-eight.vercel.app/

To deploy your own version:

Push your repo to GitHub.

Connect it to Vercel
.

Click Deploy — and your app will be live instantly!

👩‍💻 Author

Developed by: Shruthi M

💡 Passionate about web development and creating beautiful, useful applications.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
