import { FaHome, FaBell, FaPlus } from "react-icons/fa";
import { BiCollection } from "react-icons/bi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-20 bg-white shadow-md flex flex-col items-center py-4 space-y-6">
      {/* Navigation Icons */}
      <div className="flex flex-col space-y-9">
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
