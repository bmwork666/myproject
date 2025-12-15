import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

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
    if (allImages.length >= 3) {
      alert("You can upload only 3 images.");
      e.target.value = "";
      return;
    }

    setSelectedImage(e.target.files[0]);
  };

  const uploadImage = async () => {
    if (allImages.length >= 3) {
      alert("Maximum 3 images allowed.");
      return;
    }

    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      await axios.post("http://localhost:4000/api/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // 🔥 IMPORTANT FIX
      await loadImages();

      setSelectedImage(null);
    } catch (err) {
      console.error("Upload Error:", err);
      alert(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Upload failed"
      );
    }
  };

  const deleteImage = async (url) => {
    const filename = url.split("/").pop();
    if (!window.confirm("Delete this image?")) return;

    try {
      await axios.delete(`http://localhost:4000/api/delete-image/${filename}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ← ADDED
        },
      });

      setAllImages((prev) => prev.filter((img) => img !== url));
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Delete failed");
    }
  };

  return (
    <div className="container ">
      <div className="card shadow-lg p-0 border-0">
        <h3 className="text-center mb-4 fw-bold text-primary">
          Dashboard Image Upload Panel
        </h3>

        {/* LOGOUT */}
        <div className="text-end">
          <button
            className="btn btn-danger"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("currentUser");
              window.location.href = "/login"; // force redirect
            }}
          >
            Logout
          </button>
        </div>

        {/* Select File */}
        <input
          type="file"
          className="form-control form-control-lg mb-3"
          onChange={handleFileChange}
          disabled={allImages.length >= 3}
        />

        {/* Preview */}
        {selectedImage && (
          <div className="text-center mb-4">
            <h5 className="fw-semibold">Preview</h5>
            <img
              src={URL.createObjectURL(selectedImage)}
              className="img-thumbnail shadow"
              style={{ width: "220px", borderRadius: "12px" }}
              alt="preview"
            />
          </div>
        )}

        {/* Upload Button */}
        <button
          className="btn btn-primary btn-lg w-100 shadow-sm"
          onClick={uploadImage}
          disabled={allImages.length >= 3}
        >
          Upload Image
        </button>

        {/* Show Uploaded Image */}
        {uploadedImageUrl && (
          <div className="text-center mt-5">
            <h5 className="fw-semibold">Uploaded Image</h5>
            <img
              src={uploadedImageUrl}
              className="img-thumbnail shadow"
              style={{
                width: "240px",
                borderRadius: "12px",
                border: "2px solid #ddd",
              }}
              alt="uploaded"
            />
          </div>
        )}

        <hr className="my-5" />

        {/* All Images */}
        <h3 className="text-center fw-bold text-secondary mb-4">
          Uploaded Images
        </h3>

        <div className="row g-4">
          {allImages.map((img, idx) => (
            <div key={idx} className="col-md-4">
              <div className="card shadow-sm border-0 p-2">
                <img
                  src={img}
                  className="card-img-top rounded"
                  style={{ height: "180px", objectFit: "cover" }}
                  alt=""
                />
                <div className="card-body text-center">
                  <button
                    className="btn btn-outline-danger btn-sm w-100"
                    onClick={() => deleteImage(img)}
                  >
                    Delete ❌
                  </button>
                </div>
              </div>
            </div>
          ))}

          {allImages.length === 0 && (
            <p className="text-center text-muted">No images uploaded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
