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
            <h3 >Hiện thị nội dung các nút tại đây.</h3>
          </div>

          <Routes>
          <Route path="/discount/shop_discount" element={<ShopDiscount/>} />
          {/* <Route path="/discount/system_discount" element={<Home/>} /> */}
          </Routes>
          
      </Router>
  );
}

export default App;

