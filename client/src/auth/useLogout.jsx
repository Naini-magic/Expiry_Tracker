import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token"); // Remove authentication token
        localStorage.removeItem("user"); // Remove stored user data

        navigate("/login"); // Redirect to login page
    };

    return logout;
};

export default useLogout;
