import { FaHome, FaBell, FaPlus, FaTimes } from "react-icons/fa";
import { BiCollection } from "react-icons/bi";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <aside
  
    className={`fixed top-12 left-0 h-screen z-50 bg-white shadow-lg 
      transition-transform duration-300 ease-in-out lg:w-20 md:w-20 sm:w-40 sm:top-16
      ${isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"}`}
    >
      {/* Close Button (Only visible on small screens) */}
      {/* <button
        className="sm:hidden absolute top-4 right-4 text-2xl text-gray-600"
        onClick={() => setIsOpen(false)}
      >
        <FaTimes />
      </button> */}

      {/* Sidebar Links */}
      <div className="flex flex-col items-center py-4 space-y-9 mt-10 sm:mt-0">
        <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-black">
          <FaHome className="text-2xl" />
          <span className="text-sm">Home</span>
        </Link>
        <Link to="/add-item" className="flex flex-col items-center text-gray-600 hover:text-black">
          <FaPlus className="text-2xl" />
          <span className="text-sm">Add Item</span>
        </Link>
        <Link to="/collection" className="flex flex-col items-center text-gray-600 hover:text-black">
          <BiCollection className="text-2xl" />
          <span className="text-sm">Collection</span>
        </Link>
        <Link to="/notifications" className="flex flex-col items-center text-gray-600 hover:text-black">
          <FaBell className="text-2xl" />
          <span className="text-sm">Notification</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;







// import { FaHome, FaBell, FaPlus, FaTimes } from "react-icons/fa";
// import { BiCollection } from "react-icons/bi";
// import { Link } from "react-router-dom";

// const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
//   return (
//     <aside
    
//       className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-20 bg-white shadow-md flex flex-col items-center py-4 space-y-6 z-50 transform transition-transform ${
//         isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//       } md:translate-x-0 md:relative md:w-20`}
//     >
//       {/* Close Button for Small Screens */}
//       <button
//         className="absolute top-4 right-4 md:hidden"
//         onClick={() => setIsSidebarOpen(false)}
//       >
//         <FaTimes className="text-2xl text-gray-600" />
//       </button>

//       {/* Navigation Icons */}
//       <div className="flex flex-col space-y-9 mt-10">
//         <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-black">
//           <FaHome className="text-2xl" />
//           <span className="text-sm">Home</span>
//         </Link>
//         <Link to="/add-item" className="flex flex-col items-center text-gray-600 hover:text-black">
//           <FaPlus className="text-2xl" />
//           <span className="text-sm">Add-Item</span>
//         </Link>
//         <Link to="/collection" className="flex flex-col items-center text-gray-600 hover:text-black">
//           <BiCollection className="text-2xl" />
//           <span className="text-sm">Collection</span>
//         </Link>
//         <Link to="/notifications" className="flex flex-col items-center text-gray-600 hover:text-black">
//           <FaBell className="text-2xl" />
//           <span className="text-sm">Notification</span>
//         </Link>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;







// import { FaHome, FaBell, FaPlus } from "react-icons/fa";
// import { BiCollection } from "react-icons/bi";
// import { Link } from "react-router-dom";

// const Sidebar = () => {
//   return (
//     <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-20 bg-white shadow-md flex flex-col items-center py-4 space-y-6 z-50">
//       {/* Navigation Icons */}
//       <div className="flex flex-col space-y-9">
//         <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-black">
//           <FaHome className="text-2xl" />
//           <span className="text-sm">Home</span>
//         </Link>
//         <Link to="/add-item" className="flex flex-col items-center text-gray-600 hover:text-black">
//           <FaPlus className="text-2xl" />
//           <span className="text-sm">Add Item</span>
//         </Link>
//         <Link to="/collection" className="flex flex-col items-center text-gray-600 hover:text-black">
//           <BiCollection className="text-2xl" />
//           <span className="text-sm">Collection</span>
//         </Link>
//         <Link to="/notifications" className="flex flex-col items-center text-gray-600 hover:text-black">
//           <FaBell className="text-2xl" />
//           <span className="text-sm">Notification</span>
//         </Link>
//       </div>
//     </aside>
//   );
// };

// export default Sidebar;
