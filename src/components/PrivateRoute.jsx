import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const PrivateRoute = ({ children }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    return <Navigate to="/plant-dashboard" />;
  }
  
  return children;
};

export default PrivateRoute;
