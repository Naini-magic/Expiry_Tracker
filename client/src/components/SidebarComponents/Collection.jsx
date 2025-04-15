import React, { useEffect, useState } from "react";
import { fetchCollections, deleteProduct, fetchProductsByCollection } from "../../utils/api";
import ProductCard from "../Pages/ProductCard";
import DeleteModal from "../Pages/DeleteModal";
import { useNavigate , useParams} from "react-router-dom";

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const {collectionName} = useParams();

  // Fetch collections from API
  useEffect(() => {
    fetchCollections()
      .then(setCollections)
      .catch((err) => console.error("Error fetching collections:", err));
  }, []);

  useEffect(() => {
    if (collectionName) {
      handleFetchProducts(collectionName);
    } else {
      setProducts([]);
      setSelectedCollection(null);
    }
  }, [collectionName]);

  // Fetch products from API when a collection is selected
  const handleFetchProducts = async (collectionName) => {
    setSelectedCollection(collectionName);
    try {
      const data = await fetchProductsByCollection(collectionName);
      console.log("Fetched Data:", data);
      if (!Array.isArray(data)) {
        console.error("Invalid data format:", data);
        setProducts([]);  
        return;
      }
      setProducts(data);
      if (!collectionName) {
        navigate(`/collection/${collectionName}`);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]); // Prevents map error
    }
  };
  

  // Function to confirm delete
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  // Function to delete product
  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProduct(deleteId);
      setProducts(products.filter((product) => product._id !== deleteId));
      setShowModal(false);
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Collections</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:items-center ">
        {collections.map((col) => (
          <button
            key={col}
            className="bg-gray-300 text-gray-500 font-bold px-4 py-2 rounded transition-all duration-300 hover:bg-gray-400 w-2xs h-24 hover:text-white  hover:border-gray-300 hover:scale-[1.05]"
            onClick={() => handleFetchProducts(col)}
          >
            {col}
          </button>
        ))}
      </div>

      {selectedCollection && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">{selectedCollection}</h3>
          {products.length === 0 ? (
            <p>No products available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((product, index) => (
                <ProductCard key={product._id} product={product} confirmDelete={confirmDelete} index={index} />
              ))}
            </div>
          )}
        </div>
      )}

      <DeleteModal showModal={showModal} setShowModal={setShowModal} handleDelete={handleDelete} />
    </div>
  );
};

export default Collection;





















