import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const navigate = useNavigate();

    // Fetch user data from localStorage when the component loads
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setFormData({
                name: user.name,
                email: user.email,
                password: "",
                confirmPassword: "",
            });
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/auth/edit-profile`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert(response.data.message);

            // Update user details in localStorage
            localStorage.setItem("user", JSON.stringify(response.data.user));

            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Profile update failed");
        }
    };

    return (
        <section className="flex justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-gray-200 p-6 rounded-lg shadow-md mt-28">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
                    Edit Profile
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="New Password (leave empty if unchanged)"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </section>
    );
};

export default EditProfile;
