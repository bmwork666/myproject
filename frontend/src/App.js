import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ImageUpload  from "./components/ImageUpload";
import HomePage from "./components/HomePage";
import ImageSlider from "./components/ImageSlider";


import {Routes,Route}from "react-router-dom"

function App() {
 
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/upload" element={<ImageUpload />} />
    </Routes>
    
  );
}

export default App;
