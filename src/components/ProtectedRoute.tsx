import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

interface ProtectedRouteProps {
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { isAuthenticated, user } = useAppSelector(state => state.auth);
    
    // If not authenticated, redirect to login
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" />;
    }
    
    // If authenticated but not authorized for this route, redirect to appropriate page
    if (!allowedRoles.includes(user.role)) {
        // Redirect to the user's role-specific page
        return <Navigate to={`/${user.role}`} />;
    }
    
    // If authenticated and authorized, render the child routes
    return <Outlet />;
};

export default ProtectedRoute;
