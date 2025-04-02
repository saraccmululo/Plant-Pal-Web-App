import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { toast } from "react-toastify";
import styles from './PrivateRoute.module.css';

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
    toast.success('Please login to see your collection 🪴')
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

