import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { FavoritesProvider } from './context/FavoritesContext';
import HomeView from './pages/HomeView';
import FavoritesView from './pages/FavoritesView';
import DetailsView from './pages/DetailsView';

const history = createBrowserHistory();

function App() {
  return (
    <FavoritesProvider>
      <Router history={history}>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/favoritos" element={<FavoritesView />} />
              <Route path="/detalhes/:id" element={<DetailsView />} />
            </Routes>
          </div>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;