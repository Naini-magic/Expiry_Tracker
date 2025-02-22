import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    console.log({ productName, expiryDate, collectionName, notificationDays, image, barcode: barcodeValue });
    alert("Expiry item saved!");
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
