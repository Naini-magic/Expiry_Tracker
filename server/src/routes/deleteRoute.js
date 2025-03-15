const express = require("express");
const router = express.Router();
const Product = require("../models/ExpiryItem"); // Import your Product model

// DELETE route to remove a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Product.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product", error });
  }
});

module.exports = router;
