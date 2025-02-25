import { FaSearch, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-6 py-3 flex items-center justify-between z-50">

      <div className="text-lg sm:text-2xl md:text-2xl lg:text-3xl font-bold text-gray-700">
        ExpiryTracker
      </div>

      {/* Search Bar */}
      <div className="flex bg-gray-200 rounded-full px-4 py-2 items-center w-1/2">
        <FaSearch className="text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent w-full px-2 focus:outline-none"
        />
      </div>

      {/* Right Section - Icons */}
      <div className="flex items-center space-x-6">
        <Link className="flex flex-col items-center text-gray-600 hover:text-black">
          <FaUserCircle className="text-2xl" />
          {/* <span className="text-sm">Profile</span> */}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
