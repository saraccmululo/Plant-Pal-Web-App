import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import styles from './PrivateRoute.module.css';
import { toast } from "react-toastify";

const PrivateRoute = ({ children }) => {
  const { userLoggedIn, loading } = useAuth();

  if(loading) {
    return (
      <section className={styles.loadingContainer}>
        <p className={styles.loadingSpinner}></p>
      </section>
    )
  }

  if (!userLoggedIn) {
    return <Navigate to="/login" />;
    
  }

  return children;
};

export default PrivateRoute;

