// src/components/DeleteModal.js
import React from "react";

const DeleteModal = ({ showModal, setShowModal, handleDelete }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <p className="text-lg font-semibold">Would you like to delete 1 selected product?</p>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
