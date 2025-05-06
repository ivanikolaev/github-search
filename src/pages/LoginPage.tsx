import React, { useState, FormEvent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth/auth.slice';
import { useAppSelector } from '../hooks/redux';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, user } = useAppSelector(state => state.auth);
    
    // If already authenticated, redirect to the appropriate page
    useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/user');
            }
        }
    }, [isAuthenticated, user, navigate]);
    
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        if (!username.trim() || !password.trim()) {
            setError('Please enter both username and password');
            return;
        }
        
        // In this mock implementation, the username and password should be the same
        // For user: username = 'user', password = 'user'
        // For admin: username = 'admin', password = 'admin'
        dispatch(authActions.login({ username, password }));
        
        // Check if login was successful by checking if isAuthenticated changed
        setTimeout(() => {
            const currentAuth = localStorage.getItem('auth_user');
            if (!currentAuth) {
                setError('Invalid username or password');
            }
        }, 100);
    };
    
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-60px)]">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Login</h1>
                    <p className="mt-2 text-gray-600">
                        Sign in to your account
                    </p>
                </div>
                
                {error && (
                    <div className="p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}
                
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
