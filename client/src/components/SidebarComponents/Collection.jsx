import React, { useEffect, useState } from "react";
import axios from "axios";

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/expiry-items/collections") // ✅ Correct endpoint
      .then((res) => setCollections(res.data))
      .catch((err) => console.error("Error fetching collections:", err));
  }, []);

  const fetchProducts = (collectionName) => {
    setSelectedCollection(collectionName);
    axios.get(`http://localhost:5000/api/expiry-items/collection/${collectionName}`) // ✅ Correct endpoint
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  const getDaysLeft = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const difference = expiry - today;
    return Math.ceil(difference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
  };

  return (
    <div className="p-4">
      <h2 className="text-gray-700 text-xl font-bold mb-4 ">Collections</h2>
      <div className="flex gap-2">
        {collections.map((col) => (
          <button
            key={col}
            className="bg-gray-300 text-gray-500 font-bold px-4 py-2 rounded hover:bg-gray-400 hover:text-gray-600 "
            onClick={() => fetchProducts(col)}
          >
            {col}
          </button>
        ))}
      </div>

      {selectedCollection && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-600">{selectedCollection}</h3>
          {products.length === 0 ? (
            <p className="text-gray-500">No products found in this collection.</p>
          ) : (
            products.map((product) => {
              const daysLeft = getDaysLeft(product.expiryDate);
              return (
                <div
                  key={product._id}
                  className="bg-gray-200 p-4 rounded mb-2 flex flex-row items-center justify-between"
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
                        daysLeft <= 0
                          ? "text-red-500 font-small"
                          : "text-green-500 font-small"
                      }
                    >
                      {daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Collection;
