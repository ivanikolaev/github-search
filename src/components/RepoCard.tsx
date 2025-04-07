import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IRepo } from '../models/models';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';

function RepoCard({ repo }: { repo: IRepo }) {
    const navigate = useNavigate();
    const { addFavourite } = useActions();
    const { favourites } = useAppSelector(state => state.github);
    const [isFav, setIsFav] = useState(favourites.includes(repo.html_url));

    const addToFavourites = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (!isFav) {
            addFavourite(repo.html_url);
            setIsFav(true);
        }
    };

    const openExternalLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation();
    };

    const navigateToDetails = () => {
        const repoPath = encodeURIComponent(`${repo.owner.login}/${repo.name}`);
        navigate(`/repo/${repoPath}`);
    };

    return (
        <div
            className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all cursor-pointer"
            onClick={navigateToDetails}
        >
            <div>
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">{repo.name}</h2>
                    <a
                        href={repo.html_url}
                        target="_blank"
                        onClick={openExternalLink}
                        className="text-blue-500 text-sm hover:underline"
                    >
                        View on GitHub
                    </a>
                </div>
                <p className="text-sm">
                    Forks: <span className="font-bold mr-2">{repo.forks}</span>
                    Watchers: <span className="font-bold">{repo.watchers}</span>
                </p>
                <p className="text-sm font-thin">{repo?.description}</p>

                <button
                    className={`mt-2 py-1 px-5 ${!isFav ? `bg-yellow-400` : `bg-green-400`} rounded hover:shadow-md transition-all`}
                    onClick={addToFavourites}
                >
                    {!isFav ? 'Add' : 'Added'}
                </button>
            </div>
        </div>
    );
}

export default RepoCard;
