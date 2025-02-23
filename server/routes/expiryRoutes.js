const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const ExpiryItem = require("../models/ExpiryItem");

const storage = multer.diskStorage({
  destination: "./uploads/", // Store files in "uploads" folder
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const newItem = new ExpiryItem({
      barcode: req.body.barcode,
      productName: req.body.productName,
      expiryDate: req.body.expiryDate,
      collectionName: req.body.collectionName,
      notificationDays: req.body.notificationDays,
      image: req.file ? `/uploads/${req.file.filename}` : "", // Store image path
    });

    await newItem.save();
    res.json({ message: "Item saved successfully!", item: newItem });
  } catch (error) {
    res.status(500).json({ message: "Error saving item", error });
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await ExpiryItem.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;