import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Home from './pages/home';
import Favorites from './pages/favoritos';
import Details from './pages/detalhes';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favoritos" element={<Favorites />} />
              <Route path="/detalhes/:id" element={<Details />} />
            </Routes>
          </div>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
