import { BrowserRouter as Router, Routes, Route, BrowserRouter, Link } from "react-router-dom";
import Home from "../pages/home";
import Favoritos from "../pages/favoritos";
import Detalhes from "../pages/detalhes";

export default function AppRoutes() {
  return(
      <>
          <BrowserRouter>
            <nav>
              <Link to="/">home</Link>
              <Link to="/detalhes">detalhes</Link>
              <Link to="/fovoritos">favoritos</Link>
            </nav>

            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/detalhes/:id" element={<Detalhes />} />
              <Route path="/favoritos" element={<Favoritos />} />
            </Routes>
          </BrowserRouter>
      </>
  );
}
