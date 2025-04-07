import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useActions } from '../hooks/actions';

function FavouriteCard({ repo }: { repo: string }) {
    const navigate = useNavigate();
    const { removeFavourite } = useActions();

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        removeFavourite(repo);
    };

    const openExternalLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation();
    };

    const navigateToDetails = () => {
        const urlParts = repo.split('/');
        const owner = urlParts[urlParts.length - 2];
        const repoName = urlParts[urlParts.length - 1];
        const repoPath = encodeURIComponent(`${owner}/${repoName}`);
        navigate(`/repo/${repoPath}`);
    };

    const repoFullName = repo.substring(repo.indexOf('/') + 13);
    const [owner, repoName] = repoFullName.split('/');

    return (
        <div
            className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all mb-4 overflow-hidden cursor-pointer"
            onClick={navigateToDetails}
        >
            <div className="p-5">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="mb-3 md:mb-0">
                        <h3 className="text-xl font-bold text-gray-800">{repoName}</h3>
                        <p className="text-gray-600">
                            by <span className="font-medium">{owner}</span>
                        </p>
                    </div>

                    <div className="flex items-center gap-3 self-end md:self-auto">
                        <a
                            href={repo}
                            target="_blank"
                            onClick={openExternalLink}
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                            GitHub
                        </a>

                        <button
                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                            onClick={handleDelete}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FavouriteCard;
