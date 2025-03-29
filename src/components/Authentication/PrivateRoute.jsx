import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { userLoggedIn, loading } = useAuth();

  if(loading) {
    return <p>Loading...</p>
  }

  if (!userLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

