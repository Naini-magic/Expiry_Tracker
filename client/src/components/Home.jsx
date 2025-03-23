// import React, { useEffect, useState } from "react";
// import { fetchProducts, deleteProduct } from "../utils/api";
// import ProductCard from "../components/ProductCard";
// import DeleteModal from "../components/DeleteModal";

// const Home = ({ isSidebarOpen }) => {
//   const [products, setProducts] = useState([]);
//   const [deleteId, setDeleteId] = useState(null);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     fetchProducts().then(setProducts);
//   }, []);

//   const confirmDelete = (id) => {
//     setDeleteId(id);
//     setShowModal(true);
//   };

//   const handleDelete = async () => {
//     if (!deleteId) return;
//     await deleteProduct(deleteId);
//     setProducts(products.filter((product) => product._id !== deleteId));
//     setShowModal(false);
//   };

//   return (
//     <div
//       className={`transition-all duration-300 ease-in-out w-full min-h-screen 
//         ${isSidebarOpen ? "sm:pl-20" : "pl-0"} pt-16`}
//     >
//       <div className="p-0 sm:p-4"> {/* Zero padding on small screens */}
//         <h2 className="text-xl font-bold">All Products</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {products.map((product, index) => (
//             <ProductCard key={product._id} product={product} confirmDelete={confirmDelete} index={index} />
//           ))}
//         </div>
//       </div>
//       <DeleteModal showModal={showModal} setShowModal={setShowModal} handleDelete={handleDelete} />
//     </div>
//   );
// };

// export default Home;




import React, { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "../utils/api";
import ProductCard from "../components/ProductCard";
import DeleteModal from "../components/DeleteModal";

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
    <div className="p-4 ">
      <h2 className="text-xl font-bold ">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <ProductCard key={product._id} product={product} confirmDelete={confirmDelete} index={index} />
        ))}
      </div>
      <DeleteModal showModal={showModal} setShowModal={setShowModal} handleDelete={handleDelete} />
    </div>
  );
};

export default Home;