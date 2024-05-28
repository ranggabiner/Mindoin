import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RestaurantDetail from "./pages/RestaurantDetail";
import CataloguePage from "./pages/CataloguePage";
import FoodDetail from "./pages/FoodDetail";
import FavoritePage from "./pages/FavoritePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/food/:id" element={<FoodDetail />} />
        <Route path="/catalogue" element={<CataloguePage />} />
        <Route path="/favorite" element={<FavoritePage />} />
      </Routes>
    </div>
  );
};

export default App;
