import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth.js'; 
import styles from './CreateAccount.module.css';

const CreateAccount = ({ setIsCreateAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      await doCreateUserWithEmailAndPassword(email, password);
      navigate("/plant-dashboard"); 
    } catch (err) {
      setError("Failed to create account. Please try again.");
    }
  };

  return (
    <section>
      <h2 className={styles.accountBoxH2}>Create an account</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleCreateAccount}>
        <input
          className={styles.accountInput}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className={styles.accountInput}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.createAccountButton} type="submit">Create Account</button>
      </form>
      <p className={styles.accountP}>Already have an account? {" "}
			<button className={styles.accountLoginButton} onClick={() => setIsCreateAccount(false)}>Login</button></p>
    </section>
  );
};

export default CreateAccount;
