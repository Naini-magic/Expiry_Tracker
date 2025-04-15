const express = require("express");
const router = express.Router();
const path = require("path");
const authmiddleware = require("../middleware/authmiddleware");
const {
  addItem,
  collectionName,
  editItem,
  deleteItem,
  GetAllItem,
  getItemById,
  CollectionItemSpecific,
  SearchItem,
  expiredItem, 
} = require("../controller/ExpiryController");


// Route to Add New Expiry Item
router.post("/", authmiddleware, addItem);

// Route to Get All Expiry Items
router.get("/", authmiddleware, GetAllItem);

// Route to Get Unique Collection Names
router.get("/collections", authmiddleware, collectionName);

// Searchitem 
router.get("/search" , authmiddleware , SearchItem);

// Route to Fetch Items by Collection Name
router.get('/collection/:name', authmiddleware, CollectionItemSpecific );

// Expiried item filteration
router.get("/expired/Item" , authmiddleware , expiredItem);

// Route to Fetch a Single Item by ID
router.get("/:id",authmiddleware , getItemById); 

// Route to Edit an Item (including image update)
router.put("/:id", editItem);

// Route to Delete an Item
router.delete("/:id", deleteItem);

module.exports = router;
