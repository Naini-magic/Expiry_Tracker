// src/utils/api.js
import axios from "axios";

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/expiry-items");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch collections
export const fetchCollections = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/expiry-items/collections"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
};

// Fetch products by collection name
export const fetchProductsByCollection = async (collectionName) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/expiry-items/collection/${collectionName}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/expiry-items/${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Get days left before expiry
export const getDaysLeft = (expiryDate) => {
  if (!expiryDate) return "N/A";
  const today = new Date();
  const expiry = new Date(expiryDate);
  if (isNaN(expiry)) return "Invalid Date";
  const diffTime = expiry - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
