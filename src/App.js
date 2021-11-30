import React from "react";
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import ShopDiscount from './pages/ShopDiscount';
import "./App.css";

function App() {
  return (
      <Router>
          <div>
            <Header />
            <Navbar />
          </div>

          <Routes>
          <Route path="/discount/shop_discount" element={<ShopDiscount/>} />
          </Routes>
          
      </Router>
  );
}

export default App;

