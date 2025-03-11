import { useState } from 'react';
import { doPasswordReset } from "../firebase/auth.js";

const ResetPassword = ({ setIsResetPassword }) => {
	const [email, setEmail] = useState("");
	const [error, setError] = useState(null);
	const [resetMessage, setResetMessage] = useState("");


	const handleResetPassword = async (e) => {
		e.preventDefault();
		try{
			await doPasswordReset(email);
			setResetMessage("A password rest link has been sent to your email address.")
			setError(null);    
		}catch (err){
			setError("failed to send reset email. Plase check your email address");
		}
	};

	return(
		<section className="reset-password-box">
			<h2>Reset Password</h2>
			{error && <p className="error-message">{error}</p>}
			{resetMessage && <p className="sucess-message">{resetMessage}</p>}
			<form onSubmit={handleResetPassword}>
				<input
				type="email"
				placeholder="Enter your email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				required
				/>
				<button type="submit" className="reset-email-button">Send Reset Email</button>
			</form>
			<button className="reset-login-button" onClick={() => setIsResetPassword(false)}>Back to Login</button>
		</section>
	)
}

export default ResetPassword;