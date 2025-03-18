// import { useState } from "react";
// import axios from "axios";
// import { generateToken } from "../notification/Firebase";

// const Login = () => {
//     const [formData , setFormData] = useState({ email: "" , password: ""});

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };
    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try{
//             const deviceToken = await generateToken();
//             const response = await axios.post("http://localhost:5000/api/auth/login", { ...formData, deviceToken });
//         }catch (error){
//             alert(error.response?.data?.message || "Login failed");
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//             <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//             <button type="submit">Login</button>
//         </form>
//     );
// }

// export default Login;



import { useState } from "react";
import axios from "axios";
import { generateToken } from "../notification/Firebase";
import { Link } from "react-router-dom"; // Assuming React Router is used

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const deviceToken = await generateToken();
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                ...formData,
                deviceToken
            });
            alert(response.data.message);
        } catch (error) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <section className="flex justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-gray-200 p-6 rounded-lg shadow-md mt-28 h-1/2">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-gray-700 font-semibold hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Login;
