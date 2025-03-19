// import { useState } from "react";
// import axios from "axios";
// import { generateToken } from "../notification/Firebase";

// const Register = () => {
//     const [formData , setFormData] = useState({
//         name : "",
//         email : "",
//         password: "",
//         confirmPassword: ""
//     });

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit  = async(e) => {
//         e.preventDefault();
//         try{
//             const deviceToken = await generateToken();
//             const response = await axios.post("http://localhost:5000/api/auth/register" , 
//                 {
//                     ...formData,
//                     deviceToken
//                 }
//             );
//             alert(response.data.message);
//         }catch (error){
//           alert(error.response?.data?.message || "Registration failed");
//         }
//     };
//     return(
//         <form onSubmit={handleSubmit}>
//            <input type="text" name="name" placeholder="Name" onChange={handleChange} required/>
//            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
//             <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
//             <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
//             <button type="submit">Sign in</button>
//         </form>
//     );
// };

// export default Register;


import { useState } from "react";
import axios from "axios";
import { generateToken } from "../notification/Firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const deviceToken = await generateToken();
            const response = await axios.post("http://localhost:5000/api/auth/register", 
                {
                    ...formData,
                    deviceToken
                }
            );
            alert(response.data.message);
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed");
        }
    };

    return (
        <section className="flex justify-center min-h-screen bg-gray-100 ">
            <div className="w-full max-w-md bg-gray-200 p-6 rounded-lg shadow-md mt-28 h-1/2">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        onChange={handleChange} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
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
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        placeholder="Confirm Password" 
                        onChange={handleChange} 
                        required 
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                    <button 
                        type="submit" 
                        className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200"
                    >
                        Sign up
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Register;
