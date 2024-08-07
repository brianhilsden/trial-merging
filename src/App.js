
import React from 'react';


import ClerksPage from './components/ClerksPage';



import Signup from './components/Signup'; // Ensure the path is correct

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Login from './components/Login';

import './App.css';



const App = () => {
 /*  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      fetch('https://my-duka-back-end.vercel.app/check_session', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to verify token');
        }
        return response.json(); // Parse JSON response
      })
      .then(userData => {
        setIsLoggedIn(true);
        setUser(userData); // Set user data once fetched
      })
      .catch(error => {
        console.error('Token verification failed:', error);
        setIsLoggedIn(false);
        setUser(null); // Reset user state if verification fails
        localStorage.removeItem('access_token');
      });
    }
  }, []); */
  return (


    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/clerk/:id" element={<ClerksPage/>}/>
      </Routes>
    </Router>


  );
};

export default App;



