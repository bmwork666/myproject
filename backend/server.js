const express = require("express");
const cors = require("cors");
const readTags = require("./api/readTags");
const path = require("path");
const fs = require("fs");
const auth = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(express.json());
const port = 4000;

// -------------------------------
//   IMPORT ROUTES
// -------------------------------
const authRoutes = require("./routes/authRoutes");     // ✅ LOGIN ROUTE
const uploadRoutes = require("./routes/uploadRoutes"); // Upload routes

// -------------------------------
//   PUBLIC — LOGIN ROUTE
// -------------------------------
app.use("/api", authRoutes);   // ✅ Register login route FIRST

// -------------------------------
//   PUBLIC — Serve uploaded images
// -------------------------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// -------------------------------
//   PUBLIC — Read ML/FM/RM data
// -------------------------------
app.get("/read-nodedata", async (req, res) => {
  const tags = [
    "Var.W502_Rev.FMCELL.FM60.ProdCount_Shift",
    "Var.W502_Rev.RMCELL.RM80.ProdCount_Shift",
    "Var.W502_Rev.RMCELL.RM80.Shift_count_Petrol",
    "Var.W502_Rev.RMCELL.RM80.Shift_count_Diesel",
  ];

  try {
    const data = await readTags(tags);
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to read tags",
      detail: error.message,
    });
  }
});

// -------------------------------
//   PROTECTED — Upload Routes
// -------------------------------
app.use("/api", uploadRoutes);  // token auth will run inside uploadRoutes

// -------------------------------
//   PUBLIC — Fetch all images
// -------------------------------
app.get("/images", (req, res) => {
  const folderPath = "./uploads";

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read folder" });
    }

    const urls = files.map(
      (file) => `http://localhost:4000/uploads/${file}`
    );

    res.json(urls);
  });
});

// -------------------------------
//   PROTECTED — Delete an Image
// -------------------------------
app.delete("/api/delete-image/:filename", auth, (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("Delete error:", err);
      return res
        .status(404)
        .json({ success: false, message: "File not found" });
    }

    res.json({ success: true, message: "Image deleted successfully" });
  });
});

// -------------------------------
//   START SERVER
// -------------------------------

// // Serve React build
// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname, "../frontend/build/index.html")
//   );
// });
app.listen(4000, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
