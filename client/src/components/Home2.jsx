import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // For animations

const Home2 = () => {
  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null); // Track which product to delete
  const [showModal, setShowModal] = useState(false); // Toggle delete confirmation modal

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/expiry-items") // ✅ Correct API endpoint
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Function to confirm deletion
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  // Function to delete the product
  const handleDelete = async () => {
    if (!deleteId) return;
  
    try {
      const response = await axios.delete(`http://localhost:5000/api/expiry-items/${deleteId}`);
      console.log("Delete Response:", response.data); // ✅ Log API response
  
      setProducts(products.filter((product) => product._id !== deleteId));
      setShowModal(false);
    } catch (error) {
      console.error("Error deleting product:", error.response?.data || error.message);
      alert("Failed to delete the product. Please try again.");
    }
  };
  
  

  // Function to get remaining days before expiry
  const getDaysLeft = (expiryDate) => {
    if (!expiryDate) return "N/A";
    const today = new Date();
    const expiry = new Date(expiryDate);
    if (isNaN(expiry)) return "Invalid Date";
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="p-4 bg-gray-50">
      <h2 className="text-gray-800 text-xl font-bold mb-4 flex justify-center">
        All Products
      </h2>
      
      {products.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
          {products.map((product, index) => {
            const daysLeft = getDaysLeft(product.expiryDate);

            return (
              <motion.div
                key={product._id}
                className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between transition duration-300 hover:shadow-lg relative"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {/* Product Image */}
                <img
                  src={product.image || "/landscape-placeholder.svg"}
                  alt={product.productName}
                  className="w-16 h-16 object-cover rounded mr-4"
                />

                {/* Product Details */}
                <div className="flex-1">
                  <p className="text-gray-800 font-semibold">{product.productName}</p>
                  <p className="text-sm text-gray-600">
                    {product.expiryDate
                      ? new Date(product.expiryDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "2-digit",
                          year: "numeric",
                        })
                      : "No date"}
                  </p>
                </div>

                {/* Collection & Expiry Info */}
                <div className="flex flex-col items-end space-y-1">
                  <p className="text-sm text-gray-500 bg-gray-200 p-1 rounded-xl">
                    {product.collectionName}
                  </p>
                  <p
                    className={
                      daysLeft <= 0 ? "text-red-500 font-small" : "text-green-500 font-small"
                    }
                  >
                    {daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
                  </p>
                </div>

                {/* Delete Icon */}
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
                  onClick={() => confirmDelete(product._id)}
                >
                  ❌
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
            <p className="text-lg font-semibold">Would you like to delete 1 selected product?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home2;
