import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const username = useSelector((state) => state.user.username);
  console.log("username", username);
  return username ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;