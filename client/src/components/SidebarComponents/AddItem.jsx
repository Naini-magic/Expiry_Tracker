import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BarcodeScanner from "./BarcodeScanner";

const AddItem = () => {
  const navigate = useNavigate();

  const handleScan = (data) => {
    navigate(`/expiry-form/${data}`);
  };

  return (
    <div className="p-6 bg-gray-200 text-gray-600 lg:w-1/2 sm:w-full flex flex-col justify-self-center">
      <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">Add New Item</h1>
      <BarcodeScanner onScan={handleScan} />
    </div>
  );
};

export default AddItem;
