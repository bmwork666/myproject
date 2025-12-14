
import { useState, useEffect } from "react";
import axios from "axios";

 function Images() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/images")
      .then(res => setImages(res.data))
      .catch(err => console.log(err));
  }, []);

  return images;
}


export default Images;
