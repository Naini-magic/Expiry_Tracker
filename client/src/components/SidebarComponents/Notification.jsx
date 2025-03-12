import React, { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const [barcode, setBarcode] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center bg-gray-300">
      <h2 className="text-xl font-bold pt-5">Scan or Enter Barcode</h2>

      <div className="w-64 h-64 border border-gray-600 flex items-center justify-center">
        <BarcodeScannerComponent
          width={250}
          height={250}
          delay={500}
          formats={["ean_13", "code_128", "upc_a", "upc_e"]} // Add supported formats
          onUpdate={(err, result) => {
            if (result) {
              setBarcode(result.text);
              navigate(`/expiry-form/${result.text}`);
            } else if (err) {
              console.error("❌ Scanning Error:", err);
            }
          }}
        />
      </div>

      <div className="mt-2 flex gap-2 pb-3">
        <input
          type="text"
          placeholder="Enter Barcode Number"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="border border-gray-600 rounded-2xl p-2 w-48"
        />
        <button
          onClick={() => navigate(`/expiry-form/${barcode}`)}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Notification;
