const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const bodyParser = require("body-parser");
const expiryRoutes = require("./src/routes/expiryRoutes");
const deleteRoute = require("./src/routes/deleteRoute");
const firebaseRoutes = require("./src/routes/firebaseRoutes");
const checkExpiryAndSendNotifications = require("./src/util/notificationScheduler");
const authRoutes = require("./src/routes/authRoutes");


dotenv.config();
const app = express();

// ✅ Connect to Database
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// ✅ Serve uploaded images
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/api/expiry-items", expiryRoutes);
app.use("/api/expiry-items", deleteRoute);
app.use("/api/firebase", firebaseRoutes);
app.use("/api/auth" , authRoutes);

// start expiry check schedular 
checkExpiryAndSendNotifications();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
}).on("error", (err) => {
  console.error("❌ Server failed to start:", err.message);
});
