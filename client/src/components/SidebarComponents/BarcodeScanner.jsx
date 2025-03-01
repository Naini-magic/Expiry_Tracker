import React, { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { useNavigate } from "react-router-dom";

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [manualBarcode, setManualBarcode] = useState("");

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    const startScanner = async () => {
      if (!videoRef.current) return; // ✅ Ensure video element exists

      try {
        await codeReader.decodeFromVideoDevice(undefined, videoRef.current, (result) => {
          if (result) {
            navigate(`/expiry-form/${result.text}`);
          }
        });
      } catch (err) {
        console.error("Barcode scanning error:", err);
      }
    };

    startScanner();

    return () => {
      codeReader.reset();
      if (videoRef.current?.srcObject) {
        let stream = videoRef.current.srcObject;
        stream.getTracks().forEach(track => track.stop()); // ✅ Stop camera when unmounting
        videoRef.current.srcObject = null;
      }
    };
  }, []); // ✅ Run only once

  const handleManualSubmit = () => {
    if (manualBarcode.trim() !== "") {
      navigate(`/expiry-form/${manualBarcode}`);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-300">
      <h2 className="text-xl font-bold pt-5">Scan or Enter Barcode</h2>

      {/* ✅ Added autoPlay, playsInline, and muted to ensure video plays correctly */}
      <video ref={videoRef} className="w-64 h-64" autoPlay playsInline muted></video>
   
      <div className="mt-2 flex gap-2 pb-3">
        <input
          type="text"
          placeholder="Enter Barcode Number"
          value={manualBarcode}
          onChange={(e) => setManualBarcode(e.target.value)}
          className="border border-gray-600 rounded-2xl p-2 w-48"
        />
        <button onClick={handleManualSubmit} className="bg-gray-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
};

export default BarcodeScanner;
















// import React, { useEffect, useRef, useState } from "react";
// import { BrowserMultiFormatReader } from "@zxing/library";
// import { useNavigate } from "react-router-dom";

// const BarcodeScanner = () => {
//   const videoRef = useRef(null);
//   const navigate = useNavigate();
//   const [manualBarcode, setManualBarcode] = useState("");

//   useEffect(() => {
//     const codeReader = new BrowserMultiFormatReader();

//     codeReader
//       .decodeFromVideoDevice(undefined, videoRef.current, (result) => {
//         if (result) {
//           navigate(`/expiry-form/${result.text}`); // Navigate with scanned barcode
//         }
//       })
//       .catch((err) => console.error("Barcode scanning error:", err));

//     return () => {
//       codeReader.reset();
//     };
//   }, [navigate]);

//   // Handle manual input and navigate
//   const handleManualSubmit = () => {
//     if (manualBarcode.trim() !== "") {
//       navigate(`/expiry-form/${manualBarcode}`);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center bg-gray-300">
//       <h2 className="text-xl font-bold pt-5 ">Scan or Enter Barcode</h2>

//       <video ref={videoRef} className="w-64 h-64"></video>

//       <div className="mt-2 flex gap-2 pb-3">
//         <input
//           type="text"
//           placeholder="Enter Barcode Number"
//           value={manualBarcode}
//           onChange={(e) => setManualBarcode(e.target.value)}
//           className="border border-gray-600 rounded-2xl p-2 w-48"
//         />
//         <button onClick={handleManualSubmit} className="bg-gray-500 text-white px-4 py-2 rounded">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BarcodeScanner;