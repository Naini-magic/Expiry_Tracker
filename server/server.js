const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const expiryRoutes = require("./routes/expiryRoutes");
const deleteRoute = require("./routes/deleteRoute");


dotenv.config();
const app = express();

// ✅ Connect to Database
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Serve uploaded images
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/api/expiry-items", expiryRoutes);
app.use("/api/expiry-items", deleteRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
}).on("error", (err) => {
  console.error("❌ Server failed to start:", err.message);
});
