import React, { useState, useEffect } from "react";
import axios from "axios";

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [allImages, setAllImages] = useState([]);

  // Load existing images
  const loadImages = async () => {
    try {
      const res = await axios.get("http://localhost:4000/images");
      setAllImages(res.data);
    } catch (err) {
      console.error("Error loading images:", err);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/upload-image",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setUploadedImageUrl(res.data.imageUrl);

      // Directly update UI without reload
      setAllImages((prev) => [...prev, res.data.imageUrl]);

      setSelectedImage(null); // clear file input
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Upload failed");
    }
  };

  // DELETE IMAGE
  const deleteImage = async (url) => {
    const filename = url.split("/").pop();

    if (!window.confirm("Delete this image?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/delete-image/${filename}`);

      // Remove from UI immediately
      setAllImages((prev) => prev.filter((img) => img !== url));
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="text-center p-4">
      <h3>Upload Image</h3>

      {/* Select Image */}
      <input
        type="file"
        className="form-control mt-3"
        onChange={handleFileChange}
      />

      {/* Preview */}
      {selectedImage && (
        <div className="mt-3">
          <h5>Preview:</h5>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="preview"
            style={{ width: "200px", borderRadius: "10px" }}
          />
        </div>
      )}

      {/* Upload Button */}
      <button className="btn btn-success mt-3" onClick={uploadImage}>
        Upload
      </button>

      {/* Show Uploaded Image */}
      {uploadedImageUrl && (
        <div className="mt-4">
          <h5>Uploaded Image:</h5>
          <img
            src={uploadedImageUrl}
            alt="uploaded"
            style={{
              width: "250px",
              borderRadius: "10px",
              border: "2px solid black",
            }}
          />
        </div>
      )}

      {/* LIST ALL IMAGES */}
      <hr />
      <h4>Uploaded Images</h4>

      <div className="row mt-3">
        {allImages.map((img, idx) => (
          <div key={idx} className="col-md-4 p-2">
            <div className="card p-2 shadow-sm">
              <img
                src={img}
                alt=""
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <button
                className="btn btn-danger btn-sm mt-2"
                onClick={() => deleteImage(img)}
              >
                Delete ❌
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;
