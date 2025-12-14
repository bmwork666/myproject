import React, { useState } from "react";
import axios from "axios";

function ImageUpload() {
  const [selectedImage, setSelectedImage] = useState(null);  // local preview
  const [uploadedImageUrl, setUploadedImageUrl] = useState(""); // server image URL

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

      console.log("Uploaded:", res.data);
      setUploadedImageUrl(res.data.imageUrl);
    } catch (err) {
      console.error("Upload Error:", err);
      alert("Upload failed");
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

      {/* Preview Before Upload */}
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

      {/* Show Uploaded Image From Server */}
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
    </div>
  );
}

export default ImageUpload;
