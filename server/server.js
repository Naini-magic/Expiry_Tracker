const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const bodyParser = require("body-parser");
const expiryRoutes = require("./src/routes/expiryRoutes");
const firebaseRoutes = require("./src/routes/firebaseRoutes");
const checkExpiryAndSendNotifications = require("./src/util/notificationScheduler");
const authRoutes = require("./src/routes/authRoutes");
const fileUpload = require("express-fileupload");


dotenv.config();
const app = express();

// ✅ Connect to Database
connectDB();

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload({
  useTempFiles:true
}))

// ✅ Serve uploaded images
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/api/expiry-items", expiryRoutes);
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


// # Environment files
// .env
// client/.env
// server/.env

// # SSL Certificates
// client/localhost.crt
// client/localhost.key


// # Node modules
// client/node_modules/
// server/node_modules/

// # Firebase secrets
// /server/src/util/firebaseAdminSDK.json
