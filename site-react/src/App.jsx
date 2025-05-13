import React from "react";
import Detalhes from "./pages/detalhes";
import Home from "./pages/home";
import Favoritos from "./pages/favoritos";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Detalhes />
      <Home />
      <Favoritos />
    </div>
  );
}

export default App;