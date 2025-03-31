const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authmiddleware = require("../middleware/authmiddleware");
const {
  addItem,
  collectionName,
  editItem,
  deleteItem,
  GetAllItem,
  getItemById,
  CollectionItemSpecific, 
} = require("../controller/ExpiryController");

// Ensure 'uploads' folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Route to Add New Expiry Item
router.post("/", authmiddleware, upload.single("image"), addItem);

// ✅ Route to Get All Expiry Items
router.get("/", authmiddleware, GetAllItem);

// ✅ Route to Get Unique Collection Names
router.get("/collections", authmiddleware, collectionName);

// ✅ Route to Fetch Items by Collection Name
router.get('/collection/:name', authmiddleware, CollectionItemSpecific );


// ✅ Route to Fetch a Single Item by ID
router.get("/:id",authmiddleware , getItemById); // ✅ Fixed missing function

// ✅ Route to Edit an Item (including image update)
router.put("/:id", upload.single("image"), editItem);

// ✅ Route to Delete an Item
router.delete("/:id", authmiddleware, deleteItem);

module.exports = router;
