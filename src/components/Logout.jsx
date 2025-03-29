import { useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth.js";
import { useAuth } from "./AuthContext.jsx";

const Logout = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await doSignOut();
      navigate("/"); 
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  if (!userLoggedIn) {
    return null;
  }

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
