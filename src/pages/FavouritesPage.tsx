import React from 'react';
import { useAppSelector } from '../hooks/redux';
import FavouriteCard from '../components/FavouriteCard';

function FavouritesPage() {
    const { favourites } = useAppSelector(state => state.github);

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                Favourite Repositories
            </h1>

            {favourites.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto text-gray-400 mb-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                    <h2 className="text-xl font-medium text-gray-700 mb-2">
                        No favourite repositories yet
                    </h2>
                    <p className="text-gray-500">
                        Search for repositories and add them to your favourites to see them here.
                    </p>
                </div>
            ) : (
                <div>
                    <p className="text-gray-600 mb-4 text-center">
                        You have {favourites.length} favourite{' '}
                        {favourites.length === 1 ? 'repository' : 'repositories'}
                    </p>
                    <ul className="list-none">
                        {favourites.map(item => (
                            <li key={item}>
                                <FavouriteCard repo={item} />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default FavouritesPage;
