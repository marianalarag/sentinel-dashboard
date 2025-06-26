import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth } from "../firebase";
import './login.css'; 
//import logo from './images/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard'); 
    } catch (e) {
      if (e.code === 'auth/user-not-found') {
        alert("No User Found for that Email");
      } else if (e.code === 'auth/wrong-password') {
        alert("Wrong Password Provided by User");
      } else {
        alert(e.message);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      handleLogin();
    }
  };

  return (
    <div style={{ fontFamily: 'Poppins' }}>
      <div style={{
        height: '40vh',
        background: 'linear-gradient(to bottom right,rgb(90, 89, 89),rgb(224, 223, 223))',
      }} />
      
      <div style={{
        marginTop: '-10vh',
        backgroundColor: '#fff',
        borderTopLeftRadius: '40px',
        borderTopRightRadius: '40px',
        padding: '20px',
      }}>

        <form onSubmit={handleSubmit} style={{
          maxWidth: '400px',
          margin: '0 auto',
          boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
          borderRadius: '20px',
          padding: '20px',
        }}>
          <h2 className="headline">Login</h2>

          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>

          <div style={{ textAlign: 'right', marginBottom: '10px' }}>
            <span
              className="link"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </span>
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button type="submit" className="login-button">LOGIN</button>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <span className="link" onClick={() => navigate('/signup')}>
            Don't have an account? Sign up
          </span>
        </div>
      </div>
    </div>
  );
}
