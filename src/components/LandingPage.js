import React from 'react';
import './LandingPage.css';
import myImage from '../assets/images/pexels-rebrand-cities-581004-1367272.jpg';



const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="left-panel">
        <h1>Welcome to MY DUKA</h1>
        <img src={myImage} alt ="Background" />

        
      </div>
      <div className="right-panel">
        <h2>Continue As</h2>
        <button>merchant</button>
        <button>admin</button>
        <button>clerk</button>
      </div>
    </div>
  );
}

export default LandingPage;
