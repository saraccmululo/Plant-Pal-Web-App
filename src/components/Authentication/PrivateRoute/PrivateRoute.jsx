import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
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
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;

