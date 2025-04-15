import React, { useEffect, useState } from "react";
import { fetchExpiriedItem, deleteProduct } from "../../utils/api";
import ProductCard from "./ProductCard";
import DeleteModal from "./DeleteModal";

const ExpiriedItem = () => {
    const [products, setProducts] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [showModal, setShowModal] = useState(false);
   
    useEffect(() => {
      const getProducts = async () => {
        const expiriedItem = await fetchExpiriedItem();
        console.log("Fetched Products:", expiriedItem); 
        setProducts(expiriedItem);
      };
      getProducts();
    }, []);
    
  
    const confirmDelete = (id) => {
      setDeleteId(id);
      setShowModal(true);
    };
  
    const handleDelete = async () => {
      if (!deleteId) return;
      await deleteProduct(deleteId);
      setProducts(products.filter((product) => product._id !== deleteId));
      setShowModal(false);
    };
  
    return (
      <div className="p-4 ">
       <img 
    src="/enhanced_image.webp"
    className="absolute w-2/3 opacity-75 hidden md:block bottom-2.5 right-2"/>
        <h2 className="text-xl font-bold text-gray-700">All Expired Item</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} confirmDelete={confirmDelete} index={index} />
          ))}
        </div>
        <DeleteModal showModal={showModal} setShowModal={setShowModal} handleDelete={handleDelete} />
      </div>
    );
  };

export default ExpiriedItem;