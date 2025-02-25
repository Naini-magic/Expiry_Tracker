import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams(); // ✅ Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/expiry-items/${id}`) // ✅ Fetch product details
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  if (!product) return <p className="text-gray-500 text-center mt-4">Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate(-1)} // ✅ Go back to previous page
      >
        ← Back
      </button>

      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
        <img
          src={product.image || "/landscape-placeholder.svg"}
          alt={product.productName}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <h2 className="text-gray-800 text-2xl font-bold">{product.productName}</h2>
        <p className="text-gray-600 mt-2">Collection: {product.collectionName}</p>
        <p className="text-gray-600 mt-2">
          Expiry Date: {product.expiryDate ? new Date(product.expiryDate).toLocaleDateString("en-US") : "No date"}
        </p>
        <p className="mt-2 font-semibold text-red-500">
          {new Date(product.expiryDate) < new Date() ? "Expired" : "Active"}
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
