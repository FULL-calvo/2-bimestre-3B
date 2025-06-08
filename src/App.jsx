// Atualização do App.jsx
import React from "react";
import AppRoutes from "./Routes/AppRoutes";
import { FavoritesProvider } from "./context/FavoritesContext";

function App() {
  return (
    <FavoritesProvider>
      <div className="flex flex-col min-h-screen">
        <main>
          <AppRoutes />
        </main>
      </div>
    </FavoritesProvider>
  );
}

export default App;
