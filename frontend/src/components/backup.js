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
    const interval = setInterval(loadData, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="smooth-wrapper">

      <ImageSlider onImagesLoaded={(imgs) => setAllImages(imgs)} />

      <div className="smooth-track">

        {/* MAIN SLIDES */}
        <div className="smooth-slide"><Ml data={mlData} /></div>
        <div className="smooth-slide"><Fm data={fmData} /></div>
        <div className="smooth-slide"><Rm data={rmData} /></div>

        {allImages.map((img, i) => (
          <div className="smooth-slide" key={i}>
            <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}

        {/* DUPLICATE SLIDES */}
        <div className="smooth-slide"><Ml data={mlData} /></div>
        <div className="smooth-slide"><Fm data={fmData} /></div>
        <div className="smooth-slide"><Rm data={rmData} /></div>

        {allImages.map((img, i) => (
          <div className="smooth-slide" key={`dup-${i}`}>
            <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ))}

      </div>
    </div>
  );
};

export default HomePage;
