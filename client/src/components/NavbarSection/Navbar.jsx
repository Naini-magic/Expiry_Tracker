import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaBars } from "react-icons/fa";
import Sidebar from "../SidebarComponents/Sidebar";
import Profile from "./Profile";  // Import Profile Component
import SearchItems from "./SearchItems";
import Cookies from "js-cookie"; 

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(Cookies.get("user") ? JSON.parse(Cookies.get("user")) : null);

  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const storedUser = Cookies.get("user");
  //     setUser(storedUser ? JSON.parse(storedUser) : null);
  //   };
  //   window.addEventListener("storage", handleStorageChange);
  //   return () => {
  //     window.removeEventListener("storage", handleStorageChange);
  //   };
  // }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const storedUser = Cookies.get("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    }, 1000); // Check every second
  
    return () => clearInterval(interval);
  }, []);


  return (
    <>
      <nav className="fixed top-0 left-0 w-full shadow-md px-6  flex items-center justify-between z-50"
      style={{background : "#0A0A32"}}>
      {/* style={{background : "#f5f5f5"}}> */}
        {/* Menu Icon (Only on Small Screens) */}
        <button
          className="sm:hidden text-gray-700 text-xl mr-1"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>

        {/* Logo */}
        <div className="sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-200">
          ExpiryTracker
        </div>

        {/* Search Bar (Hidden on Small Screens) */}
        <SearchItems/>

        {/* Right Section - Profile Icon & Dropdown */}
        <div className="flex items-center space-x-6 relative">
          {!user ? (
            <Link to="/login" className="text-md text-gray-200 font-bold hover:text-white hover:text-lg">
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






