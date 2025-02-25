const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const ExpiryItem = require("../models/ExpiryItem");

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: "./uploads/", // Store files in "uploads" folder
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// ✅ **Route to Add New Expiry Item**
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newItem = new ExpiryItem({
      barcode: req.body.barcode,
      productName: req.body.productName,
      expiryDate: req.body.expiryDate,
      collectionName: req.body.collectionName, // ✅ Fixed (Used correct field)
      notificationDays: req.body.notificationDays,
      image: req.file ? `/uploads/${req.file.filename}` : "", // Store image path
    });

    await newItem.save();
    res.json({ message: "Item saved successfully!", item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Error saving item", error });
  }
});

// ✅ **Route to Get All Expiry Items**
router.get("/", async (req, res) => {
  try {
    const items = await ExpiryItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ **Route to Get Unique Collection Names (Fixed)**
router.get("/collections", async (req, res) => {
  try {
    const collections = await ExpiryItem.distinct("collectionName"); // ✅ Fixed
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: "Error fetching collections" });
  }
});

// ✅ **Route to Fetch Items by Collection**
router.get("/collection/:name", async (req, res) => {
  try {
    const products = await ExpiryItem.find({ collectionName: req.params.name }); // ✅ Fixed
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

module.exports = router;
