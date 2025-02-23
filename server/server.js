const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require('./db');
const expiryRoutes = require("./routes/expiryRoutes");

const app = express();
dotenv.config();

connectDB();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.use("/api/expiry-items", expiryRoutes);


const PORT  = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  }).on("error", (err) => {
    console.error("❌ Server failed to start:", err.message);
  });



