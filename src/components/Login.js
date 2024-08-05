import React from 'react';
import { useNavigate  , useLocation} from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "user"

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic
    navigate('/dashboard'); // Redirect to the dashboard after login
  };

  return (
    <div className="login-container">
      <div className="left">
        <h1>Welcome to MY DUKA</h1>
      </div>
      <div className="right">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input type="text" placeholder="Full Name" required />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Email" required />
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
};

export default Login;
