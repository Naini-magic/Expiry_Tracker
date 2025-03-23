
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ExpiryForm() {
  const { barcode } = useParams(); // Get barcode from URL
  const [productName, setProductName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [notificationDays, setNotificationDays] = useState("");
  const [image, setImage] = useState(null);
  const [barcodeValue, setBarcodeValue] = useState("");

 
  useEffect(() => {
    if (barcode) {
      setBarcodeValue(barcode); // Set barcode automatically
    }
  }, [barcode]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if(!token){
      alert("Please log in to add items");
      return;
    }

    const deviceToken = localStorage.getItem("deviceToken"); // ✅ Retrieve device token
    if (!deviceToken) {
      alert("Device token missing!");
      return;
    }


    const formData = new FormData();
    formData.append("barcode", barcodeValue);
    formData.append("productName", productName);
    formData.append("expiryDate", expiryDate);
    formData.append("collectionName", collectionName);
    formData.append("notificationDays", notificationDays);
    formData.append("deviceToken", deviceToken);
    if (image) {
      formData.append("image", image);
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/expiry-items", formData, {
        headers: { "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}` 
         }
      });
      alert("Expiry item saved!");
      console.log(response.data);
 
    setProductName("");
    setExpiryDate("");
    setCollectionName("");
    setNotificationDays("");
    setImage(null);
    setBarcodeValue("");

    } catch (error) {
      console.error("Error saving item", error);
      alert("Failed to save item.");
    }
  };
  

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-lg">
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

      {/* Collection Name */}
      <div className="mb-4">
        <label className="block text-sm font-semibold">Collection Name</label>
        <input
          type="text"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Notification Days */}
      <div className="mb-4">
        <label className="block text-sm font-semibold">Notify Before (days)</label>
        <input
          type="number"
          value={notificationDays}
          onChange={(e) => setNotificationDays(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Image Upload */}
      <div className="mb-4">
        <label className="block text-sm font-semibold">Product Image (Optional)</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2" />
        {image && <img src={image} alt="Preview" className="mt-2 w-full h-40 object-cover rounded" />}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 rounded-lg"
      >
        Save Expiry Item
      </button>
    </div>
  );
}



// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { generateToken } from "../../notification/Firebase";


// export default function ExpiryForm() {
//   const { barcode } = useParams(); // Get barcode from URL
//   const [productName, setProductName] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [collectionName, setCollectionName] = useState("");
//   const [notificationDays, setNotificationDays] = useState("");
//   const [image, setImage] = useState(null);
//   const [barcodeValue, setBarcodeValue] = useState("");
// const [deviceToken, setDeviceToken] = useState(""); // State to store token

// // Fetch device token when component mounts
// useEffect(() => {
//   async function fetchToken() {
//     try {
//       const token = await generateToken();
//       if (token) {
//         setDeviceToken(token);
//         localStorage.setItem("deviceToken", token);
//       } else {
//         console.error("FCM Token not generated");
//       }
//     } catch (error) {
//       console.error("Error fetching token:", error);
//     }
//   }
//   fetchToken();
// }, []);
 
//   useEffect(() => {
//     if (barcode) {
//       setBarcodeValue(barcode); // Set barcode automatically
//     }
//   }, [barcode]);

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//     }
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!deviceToken) {
//       console.error("Device token is missing. Cannot proceed.");
//       alert("Failed to get notification token. Please enable notifications.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("barcode", barcodeValue);
//     formData.append("productName", productName);
//     formData.append("expiryDate", expiryDate);
//     formData.append("collectionName", collectionName);
//     formData.append("notificationDays", notificationDays);
// formData.append("deviceToken", deviceToken || ""); // Ensure the token is included

//     if (image) {
//       formData.append("image", image);
//     }
  
//     try {
//       const response = await axios.post("http://localhost:5000/api/expiry-items", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       alert("Expiry item saved!");
//       console.log(response.data);
 
//     setProductName("");
//     setExpiryDate("");
//     setCollectionName("");
//     setNotificationDays("");
//     setImage(null);
//     setBarcodeValue("");

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

//       {/* Collection Name */}
//       <div className="mb-4">
//         <label className="block text-sm font-semibold">Collection Name</label>
//         <input
//           type="text"
//           value={collectionName}
//           onChange={(e) => setCollectionName(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       {/* Notification Days */}
//       <div className="mb-4">
//         <label className="block text-sm font-semibold">Notify Before (days)</label>
//         <input
//           type="number"
//           value={notificationDays}
//           onChange={(e) => setNotificationDays(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//       </div>

//       {/* Image Upload */}
//       <div className="mb-4">
//         <label className="block text-sm font-semibold">Product Image (Optional)</label>
//         <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2" />
//         {image && <img src={image} alt="Preview" className="mt-2 w-full h-40 object-cover rounded" />}
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
