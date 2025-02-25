// src/components/ProductCard.js
import React from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { getDaysLeft } from "../utils/api";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, confirmDelete, index }) => {
  const navigate = useNavigate();
  const daysLeft = getDaysLeft(product.expiryDate);

  const productVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.2, duration: 0.5 },
    }),
  };

  return (
    <motion.div
      key={product._id}
      className="relative bg-gray-100 p-4 rounded flex items-center transition duration-300 ease-in-out shadow-gray-400 hover:shadow-lg"
      variants={productVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={{ scale: 1.05 }}
      onClick={() => navigate(`/product/${product._id}`)}
    >
      <button
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
        onClick={(e) => {
          e.stopPropagation();
          confirmDelete(product._id);
        }}
      >
        <FaTimes size={18} />
      </button>

      <img
        src={product.image || "/landscape-placeholder.svg"}
        alt={product.productName}
        className="w-16 h-16 object-cover rounded mr-4"
      />

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

      <div className="flex flex-col items-end space-y-1">
        <p className="text-sm text-gray-500 bg-gray-200 p-1 rounded-xl">
          {product.collectionName}
        </p>
        <p className={daysLeft <= 0 ? "text-red-500 font-small" : "text-green-500 font-small"}>
          {daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
