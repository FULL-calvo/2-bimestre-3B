import React from "react";
import Detalhes from "./pages/detalhes";
import Home from "./pages/home";
import Favoritos from "./pages/favoritos";
import AppRoutes from "./Routes/AppRoutes";
function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <AppRoutes/>
      </main>
 
    </div>
  );
}

export default App;