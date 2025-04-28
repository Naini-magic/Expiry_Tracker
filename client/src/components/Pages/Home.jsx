import React, { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "../../utils/api";
import ProductCard from "./ProductCard";
import DeleteModal from "./DeleteModal";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // useEffect(() => {
  //   fetchProducts().then(setProducts);
  // }, []);
  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts();
      console.log("Fetched Products:", fetchedProducts);
      setProducts(fetchedProducts);
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
    <div className="p-4"
    // style={{ 
    //   background: "linear-gradient(141deg, #fafafa, #9a9a9a)" 
    // }}
// style={{ 
//   background: "linear-gradient(141deg, rgba(250, 250, 250, 0.8), rgba(154, 154, 154, 0.8))"     
// }}
// style={{ 
//   background: "linear-gradient(141deg, rgba(100, 100, 100, 0.8), rgba(250, 250, 250, 0.8))" 
// }}
>

   
      {/* tiny-female-character-put-huge-seal-stamp-document-expired-spoiled-food-lying-carton-box-products-expiration-tiny-female-196203821.webp */}

      {/*
      1. linear-gradient(141deg, #b0b0b0, #707070);
          2. linear-gradient(141deg, #d9d9d9, #666666)
          3. linear-gradient(141deg, #cfcfcf, #545454)
          4. 
          */}

<div
  className="p-6 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 hover:scale-[1.01]"
  style={{ background: "linear-gradient(141deg, #666666, #0A0A32)" }}
  // style={{ background: "#0A0A32" }} // Soft light gray -- color #f5f5f5
  // style={{ background: "#f5f5f5" }} // Soft light gray -- color #f5f5f5
>
  {/* <div
    className="text-5xl font-bold p-2 flex flex-col items-center text-center"
    style={{
      background: "linear-gradient(141deg, #d9d9d9, #3A3A80)",
      WebkitTextFillColor: "transparent",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      lineHeight: "3rem",
    }}
  >
    Never Let Your Essentials Expire Again!
    <span className="text-4xl mt-2">Track & Manage Easily</span>
  </div> */}
    <div
    className="text-3xl sm:text-4xl md:text-5xl font-bold p-2 flex flex-col items-center text-center"
    style={{
      background: "linear-gradient(141deg, #d9d9d9, #3A3A80)",
      WebkitTextFillColor: "transparent",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      lineHeight: "2.5rem sm:3rem",
    }}
  >
    Never Let Your Essentials Expire Again!
    <span className="text-2xl sm:text-3xl md:text-4xl mt-2">Track & Manage Easily</span>
  </div>
</div>
     

      <h2 className="text-2xl font-bold text-gray-500 m-4 p-3">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <ProductCard
            key={product._id}
            product={product}
            confirmDelete={confirmDelete}
            index={index}
          />
        ))}
      </div>
      <DeleteModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Home;










