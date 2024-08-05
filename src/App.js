import React from 'react';
import LandingPage from './components/LandingPage';
import './components/LandingPage.css';
import Login from './components/Login'

const App = () => {
  return (
    <div className="App">
      
      <LandingPage />
      <Login />
    </div>
  );
}

export default App;
