// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const connectDB = require("./db");
// const bodyParser = require("body-parser");
// const expiryRoutes = require("./src/routes/expiryRoutes");
// const firebaseRoutes = require("./src/routes/firebaseRoutes");
// const checkExpiryAndSendNotifications = require("./src/util/notificationScheduler");
// const authRoutes = require("./src/routes/authRoutes");
// const fileUpload = require("express-fileupload");


// dotenv.config();
// const app = express();

// // ✅ Connect to Database
// connectDB();

// // ✅ Middleware
// app.use(express.json());
// app.use(cors({
//         origin: 'http://localhost:5173', // frontend origin
//         credentials: true,               // allow cookies
//       }));
// app.use(bodyParser.json());
// app.use(fileUpload({
//   useTempFiles:true
// }))

// // ✅ Serve uploaded images
// app.use("/uploads", express.static("uploads"));

// // ✅ Routes
// app.use("/api/expiry-items", expiryRoutes);
// app.use("/api/firebase", firebaseRoutes);
// app.use("/api/auth" , authRoutes);

// // start expiry check schedular 
// checkExpiryAndSendNotifications();

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// }).on("error", (err) => {
//   console.error("❌ Server failed to start:", err.message);
// });













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
connectDB()
  .then(() => {
    // ✅ Start scheduler after DB connection
    checkExpiryAndSendNotifications();

    // ✅ Middleware
    app.use(express.json());
    app.use(cors({
      origin: 'http://localhost:5173', // frontend origin
      credentials: true,               // allow cookies
    }));
    app.use(bodyParser.json());
    app.use(fileUpload({
      useTempFiles: true,
    }));

    // ✅ Serve uploaded images
    app.use("/uploads", express.static("uploads"));

    // ✅ Routes
    app.use("/api/expiry-items", expiryRoutes);
    app.use("/api/firebase", firebaseRoutes);
    app.use("/api/auth", authRoutes);

    // ✅ Start the server after DB is connected
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    }).on("error", (err) => {
      console.error("❌ Server failed to start:", err.message);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // Exit process with failure
  });
