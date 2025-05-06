import React from 'react';
import { useAppSelector } from '../hooks/redux';
import { Navigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
    const { isAuthenticated, user } = useAppSelector(state => state.auth);
    
    // If not authenticated or not a user, redirect to login
    if (!isAuthenticated || !user) {
        return <Navigate to="/login" />;
    }
    
    // If authenticated but not an admin, redirect to appropriate page
    if (user.role !== 'admin') {
        return <Navigate to={`/${user.role}`} />;
    }
    
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
                
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome, {user.username}!</h2>
                    <p className="text-gray-600">
                        You are logged in as an administrator. This is your admin dashboard.
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
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Admin Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-red-50 p-4 rounded-md">
                            <h4 className="font-medium text-red-700">User Management</h4>
                            <p className="text-sm text-red-600 mt-1">
                                Manage user accounts and permissions.
                            </p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-md">
                            <h4 className="font-medium text-yellow-700">System Settings</h4>
                            <p className="text-sm text-yellow-600 mt-1">
                                Configure application settings and preferences.
                            </p>
                        </div>
                        <div className="bg-indigo-50 p-4 rounded-md">
                            <h4 className="font-medium text-indigo-700">Analytics</h4>
                            <p className="text-sm text-indigo-600 mt-1">
                                View detailed usage statistics and reports.
                            </p>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Registered Users</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b text-left">ID</th>
                                    <th className="py-2 px-4 border-b text-left">Username</th>
                                    <th className="py-2 px-4 border-b text-left">Role</th>
                                    <th className="py-2 px-4 border-b text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="py-2 px-4 border-b">1</td>
                                    <td className="py-2 px-4 border-b">user</td>
                                    <td className="py-2 px-4 border-b">user</td>
                                    <td className="py-2 px-4 border-b">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded mr-4">Edit</button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-3 rounded">Delete</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="py-2 px-4 border-b">2</td>
                                    <td className="py-2 px-4 border-b">admin</td>
                                    <td className="py-2 px-4 border-b">admin</td>
                                    <td className="py-2 px-4 border-b">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded mr-4">Edit</button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-3 rounded">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
