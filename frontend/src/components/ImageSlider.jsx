// src/components/ImageSlider.jsx
import { useEffect } from "react";
import axios from "axios";

const ImageFetcher = ({ onImagesLoaded }) => {
  const loadImages = async () => {
    try {
      const res = await axios.get("http://localhost:4000/images", {
        headers: { "Cache-Control": "no-cache" },
      });

      const fresh = res.data.map(
        (url) => `${url}?t=${Date.now()}`
      );

      onImagesLoaded(fresh);  // send to parent
    } catch (err) {
      console.error("IMAGE FETCH ERROR:", err);
      onImagesLoaded([]); // avoid blank UI
    }
  };

  useEffect(() => {
    loadImages();
    const interval = setInterval(loadImages, 5000);
    return () => clearInterval(interval);
  }, []);

  return null; // IMPORTANT → do NOT render slider
};

export default ImageFetcher;
