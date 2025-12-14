import Ml from "./Ml";
import Fm from "./Fm";
import Rm from "./Rm";
import ImageSlider from "./ImageSlider";
import { useEffect, useState } from "react";
import axios from "axios";
import "./smoothSlider.css";

const HomePage = () => {
  const [mlData, setMlData] = useState({});
  const [fmData, setFmData] = useState({});
  const [rmData, setRmData] = useState({});
  const [allImages, setAllImages] = useState([]);
  const [debugMode, setDebugMode] = useState(false);
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await axios.get("http://localhost:4000/read-nodedata");
        const raw = res.data.message;
        const obj = {};

        raw.forEach((item) => (obj[item.Key] = item.Value));

        setMlData({
          count: obj["Var.W502_Rev.MLCELL.ML40.ProdCount_Shift"] ?? 0,
        });

        setFmData({
          count: obj["Var.W502_Rev.FMCELL.FM60.ProdCount_Shift"] ?? 0,
        });

        setRmData({
          count: obj["Var.W502_Rev.RMCELL.RM80.ProdCount_Shift"] ?? 0,
          PetrolAT: obj["Var.W502_Rev.RMCELL.RM80.Shift_count_Petrol"] ?? 0,
          DieselAT: obj["Var.W502_Rev.RMCELL.RM80.Shift_count_Diesel"] ?? 0,
        });
      } catch (error) {
        console.error("API ERROR:", error);
      }
    }

    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (debugMode) return;

    const wrapper = document.querySelector(".smooth-wrapper");
    const slides = document.querySelectorAll(".smooth-slide");

    let index = 0;

    const total = slides.length; // includes duplicate

    const interval = setInterval(() => {
      index++;
      wrapper.scrollTo({
        left: index * window.innerWidth,
        behavior: "smooth",
      });

      // When last duplicate slide reached → jump instantly to 0 (no reverse)
      if (index === total - 1) {
        setTimeout(() => {
          wrapper.scrollTo({ left: 0, behavior: "auto" }); // no animation
          index = 0;
        }, 600); // wait for animation to finish
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [debugMode]);

  return (
    <div className={`smooth-wrapper ${debugMode ? "debug" : "live"}`}>
      <button
        onClick={() => setDebugMode(!debugMode)}
        style={{
          position: "fixed",
          top: "10px",
          right: "10px",
          zIndex: 9999,
          padding: "6px 12px", // smaller size
          borderRadius: "8px",
          border: "1px solid rgba(255,255,255,0.5)",
          background: "rgba(255,255,255,0.2)", // transparent glass effect
          backdropFilter: "blur(5px)",
          color: debugMode ? "red" : "limegreen",
          fontSize: "12px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "0.2s",
        }}
      >
        {debugMode ? "DEBUG" : "LIVE"}
      </button>

      <ImageSlider onImagesLoaded={(imgs) => setAllImages(imgs)} />

      <div className="smooth-track">
        {/* MAIN SLIDES */}
        <div className="smooth-slide">
          <Ml data={mlData} />
        </div>
        <div className="smooth-slide">
          <Fm data={fmData} />
        </div>
        <div className="smooth-slide">
          <Rm data={rmData} />
        </div>

        {allImages.map((img, i) => (
          <div className="smooth-slide" key={i}>
            <img
              src={img}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}

        {/* DUPLICATE SLIDES */}
        <div className="smooth-slide">
          <Ml data={mlData} />
        </div>
        <div className="smooth-slide">
          <Fm data={fmData} />
        </div>
        <div className="smooth-slide">
          <Rm data={rmData} />
        </div>

        {allImages.map((img, i) => (
          <div className="smooth-slide" key={`dup-${i}`}>
            <img
              src={img}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
