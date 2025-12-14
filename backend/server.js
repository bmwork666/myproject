const express = require("express");
const cors = require("cors");
const readTags = require("./api/readTags");
const path = require("path");

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

app.listen(4000, () => {
    console.log("Backend running on port 4000");
});
