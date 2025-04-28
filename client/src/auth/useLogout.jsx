import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        // localStorage.removeItem("token"); // Remove authentication token
        // localStorage.removeItem("user"); // Remove stored user data
    Cookies.remove("token");
    Cookies.remove("user");
    localStorage.removeItem("devicetoken");

    window.location.href = '/login';

        // navigate("/register"); // Redirect to login page
    };

    return logout;
};

export default useLogout;
