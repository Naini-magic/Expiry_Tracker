// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import BarcodeScanner from "./BarcodeScanner";

// const AddItem = () => {
//   const navigate = useNavigate();

//   const handleScan = (data) => {
//     navigate(`/expiry-form/${data}`);
//   };
//   const handleNoBarcode = () => {
//     navigate(`/expiry-form/0`);
//   };

//   return (
//     <div className="p-6 bg-gray-200 text-gray-600 lg:w-1/2 sm:w-full flex flex-col justify-self-center">
//       <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
//         Add New Item
//       </h1>
//       <BarcodeScanner onScan={handleScan} />
//       <div className="flex justify-center items-center mt-4">
//         <h1 className="text-xl font-bold flex">Add Item without Barcode</h1>
//         <button
//           className="bg-gray-500 rounded min-w-[32px] w-8 ml-3 text-white transition-all duration-300 hover:w-12 hover:bg-gray-700 flex justify-center"
//           onClick={handleNoBarcode}
//         >
//           Ok
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddItem;





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BarcodeScanner from "./BarcodeScanner";
import { FaBarcode, FaKeyboard, FaTimes } from "react-icons/fa";

const AddItem = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualBarcode, setManualBarcode] = useState("");

  // const handleScan = (data) => {
  //   navigate(`/expiry-form/${data}`);
  // };
  const handleScan = (data) => {
    // Force page reload to stop camera
    window.location.href = `/expiry-form/${data}`;
  };

  const handleManualSubmit = () => {
    if (manualBarcode.trim() !== "") {
      navigate(`/expiry-form/${manualBarcode}`);
    }
  };

  const handleNoBarcode = () => {
    navigate(`/expiry-form/no-barcode`);
  };

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add New Item
        </h1>

        {/* Option 1: Scan Barcode */}
        <div className="mb-6">
          <button
            onClick={() => setShowScanner(!showScanner)}
            className="w-full flex items-center justify-between p-4 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <FaBarcode className="text-blue-600 mr-3 text-xl" />
              <span className="font-medium">Scan Barcode</span>
            </div>
            <span className="text-gray-500">
              {showScanner ? "Hide Scanner" : "Show Scanner"}
            </span>
          </button>
          {showScanner && (
            <div className="mt-4">
              <BarcodeScanner onScan={handleScan} />
            </div>
          )}
        </div>

        {/* Option 2: Enter Barcode Manually */}
        <div className="mb-6">
          <button
            onClick={() => setShowManualInput(!showManualInput)}
            className="w-full flex items-center justify-between p-4 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <FaKeyboard className="text-green-600 mr-3 text-xl" />
              <span className="font-medium">Enter Barcode Manually</span>
            </div>
            <span className="text-gray-500">
              {showManualInput ? "Cancel" : "Enter Code"}
            </span>
          </button>
          {showManualInput && (
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                placeholder="Enter barcode number"
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={handleManualSubmit}
                disabled={!manualBarcode.trim()}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-300"
              >
                Submit
              </button>
            </div>
          )}
        </div>

        {/* Option 3: Add Without Barcode */}
        <div>
          <button
            onClick={handleNoBarcode}
            className="w-full flex items-center justify-between p-4 bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
          >
            <div className="flex items-center">
              <FaTimes className="text-red-600 mr-3 text-xl" />
              <span className="font-medium">Add Without Barcode</span>
            </div>
            <span className="text-gray-500">Skip barcode</span>
          </button>
          {/* <p className="text-sm text-gray-500 mt-2 align-middle">
            Use this option if your item doesn't have a barcode
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default AddItem;

