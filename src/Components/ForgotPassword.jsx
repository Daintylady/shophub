import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";



function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const { findUserByEmail, resetPassword } = useAuth();
  const navigate = useNavigate();

  function handleSendCode(e) {
    e.preventDefault();
    const user = findUserByEmail(email);
    if (!user) {
      setError("No account found with that email.");
      return;
    }
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
    setError("");
    setStep(2);
    alert(`(Simulated SMS) Your verification code is: ${code}`);
  }

  function handleVerifyCode(e) {
    e.preventDefault();
    if (enteredCode !== generatedCode) {
      setError("That code doesn't match. Please try again.");
      return;
    }
    setError("");
    setStep(3);
  }

  function handleResetPassword(e) {
    e.preventDefault();
    resetPassword(email, newPassword);
    alert("Password updated! Please log in with your new password.");
    navigate("/login");
  }

  return (
    <div className="auth-page">
      <form
        className="auth-form"
        onSubmit={step === 1 ? handleSendCode : step === 2 ? handleVerifyCode : handleResetPassword}
      >
        <h2>Forgot Password</h2>
        {error && <p className="auth-error">{error}</p>}

        {step === 1 && (
          <>
            <label>Enter your account email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Send Code</button>
          </>
        )}

        {step === 2 && (
          <>
            <label>Enter the code we sent you</label>
            <input type="text" value={enteredCode} onChange={(e) => setEnteredCode(e.target.value)} required />
            <button type="submit">Verify Code</button>
          </>
        )}

        {step === 3 && (
          <>
            <label>New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={6} />
            <button type="submit">Reset Password</button>
          </>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
