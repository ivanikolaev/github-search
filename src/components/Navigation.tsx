import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <nav className="flex justify-between items-center h-[60px] px-6 shadow-md bg-gray-600 text-white">
            <h3 className="text-xl font-bold">Github Search</h3>

            <div className="flex items-center space-x-6">
                <Link
                    to="/"
                    className={`px-3 py-2 rounded-md transition-colors ${
                        isActive('/')
                            ? 'bg-gray-800 text-white font-medium'
                            : 'hover:bg-gray-700 hover:text-gray-100'
                    }`}
                >
                    Home
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
            </div>
        </nav>
    );
}

export default Navigation;
