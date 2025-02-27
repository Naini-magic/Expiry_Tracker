import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteModal from "../components/DeleteModal";
import { deleteProduct } from "../utils/api";
import { getDaysLeft } from "../utils/api";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Fetch product details
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/expiry-items/${id}`)
      .then((res) => {
        setProduct(res.data);
        setEditedProduct(res.data);
        setDaysLeft(getDaysLeft(res.data.expiryDate));
        
      })
      .catch((err) => console.error("Error fetching product details:", err));
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setEditedProduct({
      ...editedProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/expiry-items/${id}`,
        {
          barcode: editedProduct.barcode,
          productName: editedProduct.productName,
          expiryDate: editedProduct.expiryDate,
          collectionName: editedProduct.collectionName,
          notificationDays: editedProduct.notificationDays,
        }
      );
      setProduct(response.data);
      setIsEditing(false); // Exit edit mode after saving
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (!product)
    return <p className="text-gray-500 text-center mt-4">Loading...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
        <img
          src={product.image || "/landscape-placeholder.svg"}
          alt={product.productName}
          className="w-full h-48 object-cover rounded mb-4"
        />

        {isEditing ? (
          <>
            <input
              type="text"
              name="productName"
              value={editedProduct.productName}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="text"
              name="collectionName"
              value={editedProduct.collectionName}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-2"
            />
            <input
              type="date"
              name="expiryDate"
              value={editedProduct.expiryDate?.split("T")[0]}
              onChange={handleChange}
              className="w-full border p-2 rounded mb-2"
            />
            <button
              className="px-4 py-2 bg-green-500 text-white rounded mt-2"
              onClick={handleSave}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <h2 className="text-gray-800 text-2xl font-bold">
              {product.productName}
            </h2>
            <p className="text-gray-600 mt-2">
              Collection: {product.collectionName}
            </p>
            <p className="text-gray-600 mt-2">
              Expiry Date:{" "}
              {product.expiryDate
                ? new Date(product.expiryDate).toLocaleDateString("en-US")
                : "No date"}
            </p>

            <p
          className={
            daysLeft <= 0 ? "text-red-500 font-small" : "text-green-500 font-small"
          }
        >
          {daysLeft <= 0 ? "Expired" : `${daysLeft} days left`}
        </p>

            <button
              className="m-2 px-4 py-2 bg-gray-500 text-white rounded mt-4"
              onClick={handleEdit}
            >
              Edit
            </button>
          </>
        )}

        <button
          className="m-2 px-4 py-2 bg-gray-500 text-white rounded mt-4"
          onClick={() => setShowModal(true)}
        >
          Delete
        </button>
      </div>

      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default ProductPage;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const ProductPage = () => {
//   const { id } = useParams(); // ✅ Get product ID from URL
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/expiry-items/${id}`) // ✅ Fetch product details
//       .then((res) => setProduct(res.data))
//       .catch((err) => console.error("Error fetching product details:", err));
//   }, [id]);

//   if (!product) return <p className="text-gray-500 text-center mt-4">Loading...</p>;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
//       <button
//         className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
//         onClick={() => navigate(-1)} // ✅ Go back to previous page
//       >
//         ← Back
//       </button>

//       <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-md">
//         <img
//           src={product.image || "/landscape-placeholder.svg"}
//           alt={product.productName}
//           className="w-full h-48 object-cover rounded mb-4"
//         />
//         <h2 className="text-gray-800 text-2xl font-bold">{product.productName}</h2>
//         <p className="text-gray-600 mt-2">Collection: {product.collectionName}</p>
//         <p className="text-gray-600 mt-2">
//           Expiry Date: {product.expiryDate ? new Date(product.expiryDate).toLocaleDateString("en-US") : "No date"}
//         </p>
//         <p className="mt-2 font-semibold text-red-500">
//           {new Date(product.expiryDate) < new Date() ? "Expired" : "Active"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;
