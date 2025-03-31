// src/utils/api.js
import axios from "axios";

// Fetch all products
export const fetchProducts = async () => {
  
  try {
    const token = localStorage.getItem('token');

    if(!token){
      throw new Error("No authentication token found. Please log in.");
    }
    const response = await axios.get("http://localhost:5000/api/expiry-items" , {
      headers: {
        Authorization: `Bearer ${token}`,  // Pass the token in Authorization header
        'Content-Type': 'application/json',
    },
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

// Fetch collections
export const fetchCollections = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found. Please log in.");
    }
    const response = await axios.get(
      "http://localhost:5000/api/expiry-items/collections",
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
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
    const res = await axios.get(`http://localhost:5000/api/expiry-items/collection/${collectionName}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    console.log("✅ API Response:", res); // Add logging

    if (!res.data || typeof res.data !== "object") {
      throw new Error("Invalid response format");
    }
    return res.data;
  } catch (err) {
    console.error("Error fetching collection products:", err.response?.data || err.message);
    return [];
  }
};


// specific item details
export const fetchProductDetails = async (productId, token) => {
  try {
      const response = await axios.get(`http://localhost:5000/api/expiry-items/${productId}`, {
          headers: {
              Authorization: `Bearer ${token}`, // Make sure token is provided
          },
      });
      return response.data;
  } catch (error) {
      console.error('Error fetching product details:', error);
      throw error;
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
