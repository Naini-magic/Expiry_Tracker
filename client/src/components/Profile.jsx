import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useLogout from "../auth/useLogout";

const Profile = () => {
    const logout = useLogout();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    // Fetch user details from localStorage
    const user = JSON.parse(localStorage.getItem("user")) || { 
        name: "User", 
        email: "user@example.com" 
    };

    return (
        <div 
            className="relative"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            {/* Profile Icon (Always Visible) */}
            <FaUserCircle className="text-3xl text-gray-600 hover:text-black cursor-pointer" />

            {/* Dropdown Menu (Appears on Hover) */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-50 shadow-lg rounded-lg border-gray-300 z-50">
                    <div className="p-4 border-b-gray-300">
                        <p className="text-gray-800 font-semibold">Hello {user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    {/* Edit Profile Option */}
                    <button 
                        onClick={() => navigate("/edit-profile")} 
                        className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                        Edit Profile
                    </button>
                    {/* Logout Option */}
                    <button 
                        onClick={logout} 
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Profile;
