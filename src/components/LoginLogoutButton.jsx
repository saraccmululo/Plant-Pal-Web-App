import { useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth.js";
import { useAuth } from "./AuthContext.jsx";
import styles from './LoginLogoutButton.module.css'

const LoginLogoutButton = () => {
	const navigate = useNavigate();
	const { userLoggedIn } = useAuth();

	const handleLogout = async () => {
		try{
			await doSignOut();
			navigate("/");
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	const handleLogin = () => {
		navigate("/login");
	}

	return(
		<button onClick={userLoggedIn? handleLogout : handleLogin} className={styles.loginLogoutButton}>{userLoggedIn? "Logout": "Login"}</button>
	)
}

export default LoginLogoutButton;