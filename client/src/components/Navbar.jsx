import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import Sidebar from "./SidebarComponents/Sidebar";
import Profile from "./Profile";  // Import Profile Component

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user , setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
    window.addEventListener("storage" , handleStorageChange);
    return () => {
      window.removeEventListener("storage" , handleStorageChange);
    };
  } , []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-6 py-3 flex items-center justify-between z-50">
        {/* Menu Icon (Only on Small Screens) */}
        <button
          className="sm:hidden text-gray-700 text-xl mr-1"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>

        {/* Logo */}
        <div className="sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-700">
          ExpiryTracker
        </div>

        {/* Search Bar (Hidden on Small Screens) */}
        <div className="bg-gray-200 flex rounded-full px-4 py-2 items-center w-1/2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent w-full px-2 focus:outline-none"
          />
        </div>

        {/* Right Section - Profile Icon & Dropdown */}
        <div className="flex items-center space-x-6 relative">
          {!user ? (
            <Link to="/login" className="text-md text-gray-700 font-bold hover:text-black hover:text-lg">
              Login
            </Link>
          ) : (
            <Profile />  // Shows Profile Icon & Dropdown on Hover
          )}
        </div>
      </nav>

      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
    </>
  );
};

export default Navbar;







// import Sidebar from "./SidebarComponents/Sidebar";import { FaSearch, FaUserCircle, FaBars } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { useState } from "react";

// const Navbar = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <>
//       <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-6 py-3 flex items-center justify-between z-50">
//         {/* Menu Icon (Left Side, only on small screens) */}
//         <button
//           className="sm:hidden text-gray-700 text-xl mr-1"
//           onClick={() => setSidebarOpen(!sidebarOpen)}
//         >
//           <FaBars />
//         </button>

//         {/* Logo */}
//         <div className="sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-700">
//           ExpiryTracker
//         </div>

//         {/* Search Bar (Hidden on Small Screens) */}
//         <div className="bg-gray-200 flex rounded-full px-4 py-2 items-center w-1/2  ">
//           <FaSearch className="text-gray-500" />
//           <input
//             type="text"
//             placeholder="Search"
//             className="bg-transparent w-full px-2 focus:outline-none"
//           />
//         </div>

//         {/* Right Section - Profile Icon */}
//         <div className="flex items-center space-x-6">
//           <Link to="/login" className="text-2xl">
//                     <span className="text-sm">Login</span>
//           </Link>

//           {/* profile  */}
//           <Link  className="flex flex-col items-center text-gray-600 hover:text-black">
//             <FaUserCircle className="text-2xl" />
//           </Link>
//         </div>
//       </nav>

//       {/* Sidebar: Always visible on large screens, toggleable on small screens */}
//       <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
//     </>
//   );
// };

// export default Navbar;







