import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doSignInWithEmailAndPassword } from '../../../firebase/authHelpers.js';
import { useAuth } from '../AuthContext.jsx';
import CreateAccount from '../CreateAccount/CreateAccount.jsx';
import ResetPassword from '../ResetPassword/ResetPassword.jsx';
import styles from './LoginPage.module.css';
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
	const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);

  const navigate = useNavigate();
  const { userLoggedIn, currentUser } = useAuth();

  useEffect(()=> {
    if (userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await doSignInWithEmailAndPassword(email, password);
      navigate("/"); 
      toast.success(`You’re in, plant lover 🌱`);
    } catch (err) {
      setError("Failed to log in. Please check your email and password.");
    }
  };

	const handleClose = () => {
		navigate("/");
	};

  return (
    <section className={styles.loginContainer}>
      <section className={styles.loginBox}>
				<section className={styles.closeButtonContainer}>
					<button className={styles.closeButton} onClick={handleClose}>X</button>
				</section>

        {isResetPassword? (
          <ResetPassword setIsResetPassword={setIsResetPassword} />
        ) : isCreateAccount? (
          <CreateAccount setIsCreateAccount={setIsCreateAccount} />
        ) : (
        <>
          <h2 className={styles.loginBoxH2}>Login to add a plant</h2>
          {error && <p className={styles.errorMessage}>{error}</p>}
          <form onSubmit={handleLogin}>
           <input
              className ={styles.loginBoxInput}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className ={styles.loginBoxInput}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
           />
            <button className={styles.loginBoxFormButton} type="submit">Login</button>
          </form>
          <p className={styles.loginP}>Forgot your password?</p>
          <button className={styles.loginBoxButton} onClick={() => setIsResetPassword(true)}>Reset Password</button>
				  <p className={styles.loginP}>Don't have an account?</p>
					<button className={styles.loginBoxButton} onClick={() => setIsCreateAccount(true)}>Create one here</button>
				  </>
				)}
			</section>
    </section>
  );
};

export default LoginPage;
