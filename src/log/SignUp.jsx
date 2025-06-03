import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; // Asegúrate de tener configurado firebase.js
import './signup.css' // Opcional: para estilos personalizados

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registered successfully:", userCredential.user);

      alert("Registered Successfully");

      // Aquí puedes guardar más datos en Firestore y localStorage
      // Por ejemplo:
      // await setDoc(doc(db, "users", uid), { name, email, wallet: "0" });

      navigate("/dashboard"); // Redirige al usuario después del registro
    } catch (error) {
      if (error.code === "auth/weak-password") {
        alert("Password Provided is too Weak");
      } else if (error.code === "auth/email-already-in-use") {
        alert("Account Already Exists");
      } else {
        console.error("Registration error:", error);
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-header">
        <img src="/images/logo.png" alt="Logo" className="signup-logo" />
      </div>
      <form className="signup-form" onSubmit={handleRegister}>
        <h2>Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <button type="submit">SIGN UP</button>

        <p className="login-redirect">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={{ color: "#ff5722", cursor: "pointer" }}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
