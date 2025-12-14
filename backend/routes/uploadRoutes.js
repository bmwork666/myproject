const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

router.post("/upload-image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const imageUrl = `http://localhost:4000/uploads/${req.file.filename}`;

  res.json({
    status: "success",
    imageUrl
  });
});

module.exports = router;
