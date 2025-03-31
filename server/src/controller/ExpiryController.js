const ExpiryItem = require("../models/ExpiryItem");

// ✅ Add new item
const addItem = async (req, res) => {
  try {
    console.log("📤 Incoming Request Body:", req.body);
    console.log("📤 Incoming File:", req.file);

    const newItem = new ExpiryItem({
      barcode: req.body.barcode,
      productName: req.body.productName,
      expiryDate: new Date(req.body.expiryDate), // ✅ Ensure expiryDate is stored as Date
      collectionName: req.body.collectionName,
      notificationDays: Number(req.body.notificationDays),
      image: req.file ? `/uploads/${req.file.filename}` : "",
      userId: req.user.id,
      deviceToken: req.body.deviceToken,
    });

    await newItem.save();
    res.json({ message: "Item saved successfully!", item: newItem });
  } catch (error) {
    console.error("Error saving item:", error);
    res.status(500).json({ message: "Error saving item", error: error.message });
  }
};

// ✅ Get all expiry items for logged-in user
const GetAllItem = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("User making request:", userId);
    const items = await ExpiryItem.find({ userId });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error - Unable to fetch items", error: error.message });
  }
};

// ✅ Get unique collection names for logged-in user
const collectionName = async (req, res) => {
  try {
    const collections = await ExpiryItem.distinct("collectionName", { userId: req.user.id }); // ✅ Fetch collections for user
    res.json(collections);
  } catch (error) {
    res.status(500).json({ message: "Error fetching collections", error: error.message });
  }
};

// ✅ Fetch items by specific collection name for logged-in user
const CollectionItemSpecific = async (req, res) => {
  try {
      const { name } = req.params;
      const userId = req.user.id; // Ensure user authentication is applied

      
      console.log("📌 Fetching products for collection:", name, "User:", userId);

      if (!userId) {
          console.error("🚨 No User ID found in request");
          return res.status(401).json({ message: "Unauthorized" });
      }

      const items = await ExpiryItem.find({ collectionName: name, userId }); // Add user filter

      console.log("🟡 Found Items:", items);

      if (!items.length) {
          return res.status(404).json({ message: "No products found in this collection" });
      }

      res.json(items);
  } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// ✅ Fetch a single item by ID
const getItemById = async (req, res) => {
  try {
    const item = await ExpiryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching item", error: error.message });
  }
};

// ✅ Edit an item (including image update)
const editItem = async (req, res) => {
  try {
    const { barcode, productName, expiryDate, collectionName, notificationDays } = req.body;
    const existingProduct = await ExpiryItem.findById(req.params.id);

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    existingProduct.barcode = barcode;
    existingProduct.productName = productName;
    existingProduct.expiryDate = new Date(expiryDate); // ✅ Ensure expiryDate is stored as Date
    existingProduct.collectionName = collectionName;
    existingProduct.notificationDays = notificationDays;

    // Handle image update
    if (req.file) {
      existingProduct.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await existingProduct.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete an item
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await ExpiryItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error: error.message });
  }
};

module.exports = {
  addItem,
  GetAllItem,
  collectionName,
  CollectionItemSpecific,
  getItemById, // ✅ Exported missing function
  editItem,
  deleteItem,
};
