import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Ml from "./components/Ml";
import Fm from "./components/Fm";
import Rm from "./components/Rm";
import ImageUpload from "./components/ImageUpload"

import tagList from "./tagList";

function App() {
  const sliderRef = useRef(null);
  const [autoPlay, setAutoPlay] = useState(true);

  // STATES
  const [mlData, setMlData] = useState({});
  const [fmData, setFmData] = useState({});
  const [rmData, setRmData] = useState({});

  // FETCH PLC DATA
  useEffect(() => {
    async function loadData() {
      try {
        const res = await axios.get(
          "http://localhost:4000/read-nodedata",
          tagList,
          { headers: { "Content-Type": "application/json" } }
        );



        const raw = res.data.message;
        const obj = {};

        raw.forEach((item) => {
          obj[item.Key] = item.Value;
        });

        console.log("Received Tags:", obj);

        // FM DATA
        setFmData({
          count: obj["Var.W502_Rev.FMCELL.FM60.ProdCount_Shift"] ?? 0,
        });

        // RM DATA
        setRmData({
          count: obj["Var.W502_Rev.RMCELL.RM80.ProdCount_Shift"] ?? 0,
          PetrolAT: obj["Var.W502_Rev.RMCELL.RM80.Shift_count_Petrol"] ?? 0,
          DieselAT: obj["Var.W502_Rev.RMCELL.RM80.Shift_count_Diesel"] ?? 0,
        });

        // ⚠ If ML tags available later, add here
        // setMlData({...});

      } catch (error) {
        console.error("API ERROR:", error);
      }
    }

    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  // SLIDER CONFIG
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoPlay,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div className="container-fluid p-0">
      <Slider ref={sliderRef} {...settings}>

        {/* ML SLIDE */}
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
          <div className="row w-100 g-4 px-3">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
              <Ml data={mlData} />
            </div>
          </div>
        </div>

        {/* FM SLIDE */}
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
          <div className="row w-100 g-4 px-3">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
              <Fm data={fmData} />
            </div>
          </div>
        </div>

        {/* RM SLIDE */}
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
          <div className="row w-100 g-4 px-3">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
              <Rm data={rmData} />
            </div>
          </div>
        </div>
            {/*image uploder*/}
        <div className="container-fluid d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
          <div className="row w-100 g-4 px-3">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 mx-auto">
              <ImageUpload />
            </div>
          </div>
        </div> 
      </Slider>

      {/* FOOTER BUTTONS */}
      <div className="text-center p-5 bg-light border-top">
        <button
          className="btn btn-sm btn-primary mx-2"
          onClick={() => {
            sliderRef.current.slickPrev();
            if (autoPlay) sliderRef.current.slickPlay();
          }}
        >
          ⬅ Prev
        </button>

        <button
          className={`btn btn-sm mx-2 ${autoPlay ? "btn-danger" : "btn-success"}`}
          onClick={() => {
            setAutoPlay(!autoPlay);
            if (!autoPlay) sliderRef.current.slickPlay();
            else sliderRef.current.slickPause();
          }}
        >
          {autoPlay ? "Stop Auto Slide" : "Start Auto Slide"}
        </button>

        <button
          className="btn btn-sm btn-primary mx-2"
          onClick={() => {
            sliderRef.current.slickNext();
            if (autoPlay) sliderRef.current.slickPlay();
          }}
        >
          Next ➡
        </button>
      </div>
    </div>
  );
}

export default App;
