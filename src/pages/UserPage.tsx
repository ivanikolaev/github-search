import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { Navigate, Link } from 'react-router-dom';

const UserPage: React.FC = () => {
    const { isAuthenticated, user } = useAppSelector(state => state.auth);
    
    // If not authenticated or not a user, redirect to login
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" />;
    }
    
    // If authenticated but not a user (e.g., admin), redirect to appropriate page
    if (user.role !== 'user') {
        return <Navigate to={`/${user.role}`} />;
    }
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">User Dashboard</h1>
                
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome, {user.username}!</h2>
                    <p className="text-gray-600">
                        You are logged in as a regular user. This is your personal dashboard.
                    </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-md">
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Your Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-gray-500">Username</p>
                            <p className="text-gray-800">{user.username}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Role</p>
                            <p className="text-gray-800 capitalize">{user.role}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">User ID</p>
                            <p className="text-gray-800">{user.id}</p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Quick Access</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link to="/search" className="block">
                            <div className="bg-blue-50 p-4 rounded-md hover:bg-blue-100 transition-colors">
                                <h4 className="font-medium text-blue-700">Search GitHub</h4>
                                <p className="text-sm text-blue-600 mt-1">
                                    Search for repositories and users on GitHub.
                                </p>
                            </div>
                        </Link>
                        <Link to="/favourites" className="block">
                            <div className="bg-green-50 p-4 rounded-md hover:bg-green-100 transition-colors">
                                <h4 className="font-medium text-green-700">View Favorites</h4>
                                <p className="text-sm text-green-600 mt-1">
                                    Access your saved favorite repositories.
                                </p>
                            </div>
                        </Link>
                        <Link to="/trending" className="block">
                            <div className="bg-purple-50 p-4 rounded-md hover:bg-purple-100 transition-colors">
                                <h4 className="font-medium text-purple-700">Trending Repos</h4>
                                <p className="text-sm text-purple-600 mt-1">
                                    Discover trending repositories on GitHub.
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
                
                <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Recent Activity</h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                        <p className="text-gray-600">No recent activity to display.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserPage;
