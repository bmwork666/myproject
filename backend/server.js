const express = require("express");
const cors = require("cors");
const readTags = require("./api/readTags");
const path = require("path");
const fs = require("fs");


const app = express();
app.use(cors());
app.use(express.json());
// ⬅ NEW: upload route
const uploadRoutes = require("./routes/uploadRoutes");
// Serve uploaded images publicly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Read ALL ML, FM, RM tags
app.get("/read-nodedata", async (req, res) => {

    const tags = [
        // ML

      // FM
        
        "Var.W502_Rev.FMCELL.FM60.ProdCount_Shift",
        // RM
        "Var.W502_Rev.RMCELL.RM80.ProdCount_Shift",
        "Var.W502_Rev.RMCELL.RM80.Shift_count_Petrol",
        "Var.W502_Rev.RMCELL.RM80.Shift_count_Diesel"

    ];

    try {
        const data = await readTags(tags);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to read tags", detail: error.message });
    }
});
// -------------------------------------
//       IMAGE UPLOAD ROUTE
// -------------------------------------
app.use("/api", uploadRoutes);

// -------------------------------------

//fetch  images from server--------------
app.get("/images", (req, res) => {
  const fs = require("fs");

  const folderPath = "./uploads";

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read folder" });
    }

    const urls = files.map(
      file => `http://localhost:4000/uploads/${file}`
    );

    res.json(urls);   // IMPORTANT!!
  });
});
//Dlelete images 
app.delete("/api/delete-image/:filename", (req, res) => {
  const filename = req.params.filename;

  const filePath = path.join(__dirname, "uploads", filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      console.log("Delete error:", err);
      return res.status(404).json({ success: false, message: "File not found" });
    }

    res.json({ success: true, message: "Image deleted successfully" });
  });
});

app.listen(4000, () => {
    console.log("Backend running on port 4000");
});
