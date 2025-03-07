import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../firebase/auth.js";
import { useAuth } from "./AuthContext.jsx";
import CreateAccount from "./CreateAccount.jsx";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
	const [isCreateAccount, setIsCreateAccount] = useState(false);
  const navigate = useNavigate();

  const { userLoggedIn, loading } = useAuth();

  useEffect(()=> {
    if (userLoggedIn) {
      navigate("/plant-dashboard");
    }
  }, [userLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await doSignInWithEmailAndPassword(email, password);
      navigate("/plant-dashboard"); 
    } catch (err) {
      setError("Failed to log in. Please check your credentials.");
    }
  };

	const handleClose = () => {
		navigate("/");
	};

  if (userLoggedIn) {
    return <></>;
  }

  return (
    <section className="login-container">
      <section className="login-box">
				<section className="close-button-container">
					<button className="close-button" onClick={handleClose}>X</button>
				</section>
        <h2>{isCreateAccount? "Create an Account": "Login to add the plant"}</h2>
        {error && <p className="error-message">{error}</p>}
				{!isCreateAccount? (
				<>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
				<p>Don't have an account?</p>
					<button className="login-account-button" onClick={() => setIsCreateAccount(true)}>Create one here</button>
				
				</>
				) : (
					<CreateAccount setIsCreateAccount={setIsCreateAccount}/>
				)}
			</section>
    </section>
  );
};

export default Login;
