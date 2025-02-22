import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BarcodeScanner from "./BarcodeScanner";

const AddItem = () => {
  const navigate = useNavigate();

  const handleScan = (data) => {
    navigate(`/expiry-form/${data}`);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Item</h1>
      <BarcodeScanner onScan={handleScan} />
    </div>
  );
};

export default AddItem;
