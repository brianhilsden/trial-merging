import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <ul>
        <li><Link to="/dashboard">My Duka</Link></li>
        <li><Link to="/request-products">Request Products</Link></li>
        <li><Link to="/sell-item">Sell Item</Link></li>
        <li><button onClick={handleLogout}>Log Out</button></li>
      </ul>
    </nav>
  );
};

export default Navigation;
