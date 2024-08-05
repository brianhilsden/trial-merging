import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import ClerkDashboard from './pages/ClerkDashboard';
import RequestProducts from './pages/RequestProducts';
import SellItem from './pages/SellItem';
import './App.css';

const PrivateRoute = ({ children }) => {
  const user = useSelector(state => state.auth.user);
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <ClerkDashboard />
          </PrivateRoute>
        } />
        <Route path="/request-products" element={
          <PrivateRoute>
            <RequestProducts />
          </PrivateRoute>
        } />
        <Route path="/sell-item" element={
          <PrivateRoute>
            <SellItem />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;


