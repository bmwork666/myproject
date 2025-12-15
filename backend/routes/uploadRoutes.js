const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const fs = require("fs");
const path = require("path");
const auth = require("../middleware/auth");

// Folder where images are saved
const uploadFolder = path.join(__dirname, "../uploads");

// PRE CHECK MIDDLEWARE (runs BEFORE multer)
const preCheckLimit = (req, res, next) => {
  const files = fs
    .readdirSync(uploadFolder)
    .filter((file) => /\.(png|jpe?g|gif|webp)$/i.test(file));

  if (files.length >= 3) {
    return res.status(400).json({
      status: "error",
      message: "Maximum 3 images allowed.",
    });
  }

  next();
};

// PROTECTED — only logged-in users can upload
router.post(
  "/upload-image",
  auth,
  preCheckLimit, // ⬅️ IMPORTANT: limit check BEFORE uploading
  upload.single("image"),
  (req, res) => {
    console.log("---- Upload Hit ----");
    console.log("Files in folder:", fs.readdirSync(uploadFolder));
    console.log("req.file:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = `http://localhost:4000/uploads/${req.file.filename}`;

    res.json({
      status: "success",
      imageUrl,
    });
  }
);

module.exports = router;
