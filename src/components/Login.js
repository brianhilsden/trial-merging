import React, { useState } from 'react';
import { useNavigate  , useLocation} from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "user"
  console.log(role);
  
  

  const [formData,setFormData] = useState({email:"",full_name:"",password:""})

  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(formData);
    fetch("https://my-duka-back-end.vercel.app/login",{
      method:"POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...formData,role:role})
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      
      localStorage.setItem("access_token", data.access_token);
      let loggedIn = data.user
      if (data.role = "Clerk"){
        
        navigate(`/clerk/${loggedIn.id}`)
      }
      else if(data.role = "Admin"){
        navigate(`/admin/${loggedIn.id}`)
      }
      else if(data.role = "Merchant"){
        navigate("/merchant")
      }
      else{
        navigate("/")
      }
  
      
    })
    
   
  }




  return (
    <div className="login-container">
      <div className="left">
        <h1>Welcome to MY DUKA</h1>
      </div>
      <div className="right">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input type="text" placeholder="Full Name" name='full_name' value={formData.full_name} required onChange={handleChange}/>
          </div>
          <div className="input-group">
            <input type="email" placeholder="Email" name='email' value={formData.email} required onChange={handleChange}/>
          </div>
          <div className="input-group">
            <input type="password" placeholder="Password" name='password' value={formData.password} required onChange={handleChange}/>
          </div>
          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit" >LOG IN</button>
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
