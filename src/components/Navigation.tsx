import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth/auth.slice';

function Navigation() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useAppSelector(state => state.auth);

    const isActive = (path: string) => {
        return location.pathname === path;
    };
    
    const handleLogout = () => {
        dispatch(authActions.logout());
        navigate('/login');
    };

    return (
        <nav className="flex justify-between items-center h-[60px] px-6 shadow-md bg-gray-600 text-white">
            <h3 className="text-xl font-bold">Github Search</h3>

            <div className="flex items-center space-x-6">
                {isAuthenticated && user && (
                    <>
                        {user.role === 'admin' && (
                            <Link
                                to="/admin"
                                className={`px-3 py-2 rounded-md transition-colors ${
                                    isActive('/admin')
                                        ? 'bg-gray-800 text-white font-medium'
                                        : 'hover:bg-gray-700 hover:text-gray-100'
                                }`}
                            >
                                Admin
                            </Link>
                        )}
                        {user.role === 'user' && (
                            <Link
                                to="/user"
                                className={`px-3 py-2 rounded-md transition-colors ${
                                    isActive('/user')
                                        ? 'bg-gray-800 text-white font-medium'
                                        : 'hover:bg-gray-700 hover:text-gray-100'
                                }`}
                            >
                                Dashboard
                            </Link>
                        )}
                        
                        <Link
                            to="/search"
                            className={`px-3 py-2 rounded-md transition-colors ${
                                isActive('/search')
                                    ? 'bg-gray-800 text-white font-medium'
                                    : 'hover:bg-gray-700 hover:text-gray-100'
                            }`}
                        >
                            Search
                        </Link>
                        <Link
                            to="/favourites"
                            className={`px-3 py-2 rounded-md transition-colors ${
                                isActive('/favourites')
                                    ? 'bg-gray-800 text-white font-medium'
                                    : 'hover:bg-gray-700 hover:text-gray-100'
                            }`}
                        >
                            Favourites
                        </Link>
                        <Link
                            to="/trending"
                            className={`px-3 py-2 rounded-md transition-colors ${
                                isActive('/trending')
                                    ? 'bg-gray-800 text-white font-medium'
                                    : 'hover:bg-gray-700 hover:text-gray-100'
                            }`}
                        >
                            Trending
                        </Link>
                    </>
                )}
                
                {isAuthenticated ? (
                    <button
                        onClick={handleLogout}
                        className="px-3 py-2 rounded-md transition-colors bg-red-600 hover:bg-red-700 text-white"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className={`px-3 py-2 rounded-md transition-colors ${
                            isActive('/login')
                                ? 'bg-gray-800 text-white font-medium'
                                : 'hover:bg-gray-700 hover:text-gray-100'
                        }`}
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navigation;
