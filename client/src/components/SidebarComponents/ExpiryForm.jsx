// import { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { fetchCollections } from "../../utils/api";
// import { generateToken } from "../../notification/Firebase";
// import Cookies from "js-cookie";


// export default function ExpiryForm() {
//   const { barcode } = useParams();
//   const [productName, setProductName] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [collectionName, setCollectionName] = useState("");
//   const [notificationDays, setNotificationDays] = useState("");
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [barcodeValue, setBarcodeValue] = useState("");
//   const [collections, setCollections] = useState([]); // ✅ Store fetched collections
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (barcode) {
//       setBarcodeValue(barcode);
//     }

//     // Fetch collections when component mounts
//     const loadCollections = async () => {
//       const data = await fetchCollections();
//       setCollections(data);
//     };

//     loadCollections();
//   }, [barcode]);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       const previewUrl = URL.createObjectURL(file);
//       setImagePreview(previewUrl);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//       // Validation
//   if (!productName.trim()) {
//     alert("Product name is required");
//     return;
//   }

//   if (!expiryDate) {
//     alert("Expiry date is required");
//     return;
//   }

//   if (!collectionName.trim()) {
//     alert("Collection is required");
//     return;
//   }

  
//     const token = Cookies.get("token");
//     if (!token) {
//       alert("Please log in to add items");
//       return;
//     }

//    // Get fresh device token
//   let deviceToken;
//   try {
//     deviceToken = await generateToken(); // Import this from your firebase.js
//     if (!deviceToken) {
//       throw new Error("Failed to get device token");
//     }
//   } catch (error) {
//     console.error("Error getting device token:", error);
//     alert("Failed to get device token. Please refresh the page.");
//     return;
//   }

//     const trimmedCollectionName = collectionName.trim(); // ✅ Trim spaces before saving

//     const formData = new FormData();
//     formData.append("barcode", barcodeValue);
//     formData.append("productName", productName);
//     formData.append("expiryDate", expiryDate);
//     formData.append("collectionName", trimmedCollectionName);
//     formData.append("notificationDays", notificationDays);
//     formData.append("deviceToken", deviceToken);
//     if (image) {
//       formData.append("image", image);
//     }

//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/expiry-items`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("Expiry item saved!");
//       console.log(response.data);

//       // Reset form fields after submission
//       setProductName("");
//       setExpiryDate("");
//       setCollectionName("");
//       setNotificationDays("");
//       setImage(null);
//       setBarcodeValue("");
//       navigate("/");
//     } catch (error) {
//       console.error("Error saving item", error);
//       alert("Failed to save item.");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold mb-4">Add Expiry Item</h2>

//       {/* Barcode Input */}
//       <div className="mb-4">
//         <label className="block text-sm font-semibold">Barcode</label>
//         <input
//           type="text"
//           value={barcodeValue}
//           onChange={(e) => setBarcodeValue(e.target.value)}
//           className="w-full p-2 border rounded"
//           placeholder="Scan or enter barcode"
//           readOnly
//         />
//       </div>

//       {/* Product Name */}
//       <div className="mb-4">
//         <label className="block text-sm font-semibold">Product Name</label>
//         <input
//           type="text"
//           value={productName}
//           onChange={(e) => setProductName(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       {/* Expiry Date */}
//       <div className="mb-4">
//         <label className="block text-sm font-semibold">Expiry Date</label>
//         <input
//           type="date"
//           value={expiryDate}
//           onChange={(e) => setExpiryDate(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       {/* Collection Name (Dropdown + Input) */}
//       <div className="mb-4">
//         <label className="block text-sm font-semibold">Collection Name</label>
//         <div className="flex gap-2">
//           <select
//             value={collectionName}
//             onChange={(e) => setCollectionName(e.target.value)}
//             className="w-1/2 p-2 border rounded"
//           >
//             <option value="">Select Collection</option>
//             {collections.map((col) => (
//               <option key={col} value={col}>
//                 {col}
//               </option>
//             ))}
//           </select>
//           <input
//             type="text"
//             placeholder="Or enter a new collection"
//             value={collectionName}
//             onChange={(e) => setCollectionName(e.target.value)}
//             className="w-1/2 p-2 border rounded"
//           />
//         </div>
//       </div>

//       {/* Notification Days */}
//       <div className="mb-4">
//         <label className="block text-sm font-semibold">
//           Notify Before (days)
//         </label>
//         <input
//           type="number"
//           value={notificationDays}
//           onChange={(e) => setNotificationDays(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       {/* Image Upload */}
//       <div className="mb-4">
//         <label className="block text-sm font-semibold">
//           Product Image (Optional)
//         </label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageUpload}
//           className="mt-2"
//         />
//         {imagePreview && (
//           <img
//             src={imagePreview}
//             alt="Preview"
//             className="mt-2 w-full h-40 object-cover rounded"
//           />
//         )}
//       </div>

//       {/* Save Button */}
//       <button
//         onClick={handleSubmit}
//         className="w-full bg-black text-white py-2 rounded-lg"
//       >
//         Save Expiry Item
//       </button>
//     </div>
//   );
// }





import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { fetchCollections } from "../../utils/api";
import { generateToken } from "../../notification/Firebase";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ExpiryForm() {
  const { barcode } = useParams();
  const [productName, setProductName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [notificationDays, setNotificationDays] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [barcodeValue, setBarcodeValue] = useState("");
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (barcode) {
      setBarcodeValue(barcode);
    }

    const loadCollections = async () => {
      try {
        const data = await fetchCollections();
        setCollections(data);
      } catch (error) {
        toast.error("Failed to load collections");
      }
    };

    loadCollections();
  }, [barcode]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!productName.trim()) {
      toast.error("Product name is required");
      setIsLoading(false);
      return;
    }

    if (!expiryDate) {
      toast.error("Expiry date is required");
      setIsLoading(false);
      return;
    }

    if (!collectionName.trim()) {
      toast.error("Collection is required");
      setIsLoading(false);
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      toast.error("Please log in to add items");
      setIsLoading(false);
      return;
    }

    // Get fresh device token
    let deviceToken;
    try {
      deviceToken = await generateToken();
      if (!deviceToken) {
        throw new Error("Failed to get device token");
      }
    } catch (error) {
      console.error("Error getting device token:", error);
      toast.error("Failed to get device token. Please refresh the page.");
      setIsLoading(false);
      return;
    }

    const trimmedCollectionName = collectionName.trim();

    const formData = new FormData();
    formData.append("barcode", barcodeValue);
    formData.append("productName", productName);
    formData.append("expiryDate", expiryDate);
    formData.append("collectionName", trimmedCollectionName);
    formData.append("notificationDays", notificationDays);
    formData.append("deviceToken", deviceToken);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/expiry-items`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      toast.success("Expiry item saved successfully!");
      console.log(response.data);

      // Reset form fields after submission
      setProductName("");
      setExpiryDate("");
      setCollectionName("");
      setNotificationDays("");
      setImage(null);
      setBarcodeValue("");
      navigate("/");
    } catch (error) {
      console.error("Error saving item", error);
      toast.error(error.response?.data?.message || "Failed to save item");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
      {/* Toast Container - should be at the root level */}
      
      <h2 className="text-xl font-bold mb-4">Add Expiry Item</h2>

      {/* Barcode Input */}
      <div className="mb-4">
        <label className="block text-sm font-semibold">Barcode</label>
        <input
          type="text"
          value={barcodeValue}
          onChange={(e) => setBarcodeValue(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Scan or enter barcode"
          readOnly
        />
      </div>

      {/* Product Name */}
      <div className="mb-4">
        <label className="block text-sm font-semibold">Product Name</label>
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Expiry Date */}
      <div className="mb-4">
        <label className="block text-sm font-semibold">Expiry Date</label>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Collection Name (Dropdown + Input) */}
      <div className="mb-4">
        <label className="block text-sm font-semibold">Collection Name</label>
        <div className="flex gap-2">
          <select
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            className="w-1/2 p-2 border rounded"
          >
            <option value="">Select Collection</option>
            {collections.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Or enter a new collection"
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            className="w-1/2 p-2 border rounded"
          />
        </div>
      </div>

      {/* Notification Days */}
      <div className="mb-4">
        <label className="block text-sm font-semibold">
          Notify Before (days)
        </label>
        <input
          type="number"
          value={notificationDays}
          onChange={(e) => setNotificationDays(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-sm font-semibold">
          Product Image (Optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-2"
        />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="mt-2 w-full h-40 object-cover rounded"
          />
        )}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full py-2 rounded-lg flex items-center justify-center ${
          isLoading ? "bg-gray-500" : "bg-black hover:bg-gray-800"
        } text-white transition-colors`}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Saving...
          </>
        ) : (
          "Save Expiry Item"
        )}
      </button>
    </div>
  );
}