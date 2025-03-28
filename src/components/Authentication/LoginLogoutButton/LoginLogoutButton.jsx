import { useNavigate } from "react-router-dom";
import { doSignOut } from "../../../firebase/authHelpers.js";
import { useAuth } from "../AuthContext.jsx";
import styles from './LoginLogoutButton.module.css';
import { toast } from "react-toastify";

const LoginLogoutButton = () => {
	const navigate = useNavigate();
	const { userLoggedIn } = useAuth();

	const handleLogout = async () => {
		try{
			await doSignOut();
			navigate("/");
			toast.success("See you later 🌼")
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