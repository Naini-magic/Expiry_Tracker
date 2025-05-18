import { useState } from "react";
import axios from "axios";
import { generateToken } from "../notification/Firebase";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const deviceToken = await generateToken();
      localStorage.setItem("deviceToken", deviceToken);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
        {
          ...formData,
          deviceToken,
        }
      );
      Cookies.set("token", response.data.token, { expires: 30 });
      Cookies.set("user", JSON.stringify(response.data.user), { expires: 30 });

      toast.success(response.data.message || "Login successful!");
      setTimeout(() => navigate("/"), 1500);


    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex justify-center min-h-screen bg-gray-100">

      <div className="w-full max-w-md bg-gray-200 p-6 rounded-lg shadow-md mt-28 h-1/2">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>
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
            disabled={isLoading}
            aria-busy={isLoading}
            className={`w-full ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-500 hover:bg-gray-600"
            } text-white py-2 rounded-md transition duration-200 flex items-center justify-center`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-gray-700 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
