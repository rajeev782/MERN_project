// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // or use a proper auth check

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
