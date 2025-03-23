const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ExpiryItem = require("../models/ExpiryItem");
const authmiddleware = require("../middleware/authmiddleware");

// Ensure 'uploads' folder exists
const uploadDir = "./uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });


// ✅ **Route to Add New Expiry Item**
router.post("/", authmiddleware , upload.single("image"), async (req, res) => {
  try {

    console.log("📤 Incoming Request Body:", req.body);
    console.log("📤 Incoming Request Body:", req.body);
    console.log("📤 Incoming File:", req.file);
    const newItem = new ExpiryItem({
      barcode: req.body.barcode,
      productName: req.body.productName,
      expiryDate: new Date(req.body.expiryDate),
      collectionName: req.body.collectionName, 
      notificationDays: Number(req.body.notificationDays),
      image: req.file ? `/uploads/${req.file.filename}` : "", // Store image path
      userId : req.user.id,
      deviceToken: req.body.deviceToken
    });

    await newItem.save();
    res.json({ message: "Item saved successfully!", item: newItem });
  } catch (error) {
    console.error("Error details:", error); 
    res.status(500).json({ message: "Error saving item", error });
  }
});

// ✅ **Route to Get All Expiry Items**
router.get("/", authmiddleware , async (req, res) => {
  try {
    console.log("User making request:", req.user);
    const items = await ExpiryItem.find({userId : req.user.id});
    res.json(items);
  } catch (error) {
    res.status(500).json({ message:"Server Error" ,
      error : error.message });
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

router.get("/:id", async (req, res) => {
  try {
    const product = await ExpiryItem.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { barcode, productName, expiryDate, collectionName, notificationDays } = req.body;

    const existingProduct = await ExpiryItem.findById(req.params.id);
    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Update only the text fields, preserving the existing image
    existingProduct.barcode = barcode;
    existingProduct.productName = productName;
    existingProduct.expiryDate = expiryDate;
    existingProduct.collectionName = collectionName;
    existingProduct.notificationDays = notificationDays;

    const updatedProduct = await existingProduct.save();

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = router;
