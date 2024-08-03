import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="left">
        <h1>Welcome to MY DUKA</h1>
        
      </div>
      <div className="right">
        <h2>login</h2>
        <form>
          <div className="input-group">
            <input type="text" placeholder="Full Name" required />
          </div>
          <div className="input-group">
            <input type="email" placeholder="email" required />
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" required />
          </div>
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">LOG IN</button>
          <div className="signup-link">
            <a href="#">Sign Up</a>
          </div>
          <div className="or">OR</div>
          <div className="social-login">
            <button type="button">Continue With Google</button>
            <button type="button">Continue With Facebook</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
