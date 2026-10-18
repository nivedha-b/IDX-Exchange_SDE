// Load environment variables first
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const propertiesRouter = require("./routes/properties");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/properties", propertiesRouter);

// Health check endpoint
app.get("/api/health", async (req, res) => {
    try {
        await pool.query("SELECT 1");

        res.status(200).json({
            status: "ok",
            database: "connected"
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            database: "disconnected"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});



// city - L_City
// zipcode - L_Zip
// minPrice - L_SystemPrice
// maxPrice
// beds - L_Keyword2
// baths - LM_Dec_3