import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";


import "./App.css";

function App() {
  return (
      <Router>
          <div>
            <Header />
            <Navbar />
            <h3 >Hiện thị nội dung các nút tại đây.</h3>
          </div>
      </Router>
  );
}

export default App;

