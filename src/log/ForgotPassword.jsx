import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import "./forgotpassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email has been sent!");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("No user found for that email.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="forgot-container">
      <h1 className="forgot-header">Password Recovery</h1>
      <p className="forgot-subtext">Enter your email</p>

      <form onSubmit={handleSubmit} className="forgot-form">
        <input
          type="email"
          placeholder="Email"
          className="forgot-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="forgot-error">{error}</p>}
        {message && <p className="forgot-success">{message}</p>}

        <button type="submit" className="forgot-button">Send Email</button>
      </form>

      <div className="forgot-footer">
        <p>Don't have an account?</p>
        <span className="forgot-link" onClick={() => navigate("/signup")}>
          Create
        </span>
      </div>
    </div>
  );
}

export default ForgotPassword;
