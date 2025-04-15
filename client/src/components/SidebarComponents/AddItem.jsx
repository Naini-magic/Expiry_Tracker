import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BarcodeScanner from "./BarcodeScanner";

const AddItem = () => {
  const navigate = useNavigate();

  const handleScan = (data) => {
    navigate(`/expiry-form/${data}`);
  };
  const handleNoBarcode = () => {
    navigate(`/expiry-form/0`);
  };

  return (
    <div className="p-6 bg-gray-200 text-gray-600 lg:w-1/2 sm:w-full flex flex-col justify-self-center">
      <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
        Add New Item
      </h1>
      <BarcodeScanner onScan={handleScan} />
      <div className="flex justify-center items-center mt-4">
        <h1 className="text-xl font-bold flex">Add Item without Barcode</h1>
        <button
          className="bg-gray-500 rounded min-w-[32px] w-8 ml-3 text-white transition-all duration-300 hover:w-12 hover:bg-gray-700 flex justify-center"
          onClick={handleNoBarcode}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default AddItem;







