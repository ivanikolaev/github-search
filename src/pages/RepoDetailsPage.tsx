import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { githubApi } from '../store/github/github.api';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';

function RepoDetailsPage() {
    const { repoId } = useParams<{ repoId: string }>();
    const navigate = useNavigate();
    const { addFavourite, removeFavourite } = useActions();
    const { favourites } = useAppSelector(state => state.github);

    const decodedRepoId = repoId ? decodeURIComponent(repoId) : '';
    const [owner, repo] = decodedRepoId.split('/');

    const {
        data: repoData,
        isLoading: repoLoading,
        isError: repoError,
    } = githubApi.useGetRepoDetailsQuery(
        { owner, repo },
        {
            skip: !owner || !repo,
        }
    );

    const {
        data: userData,
        isLoading: userLoading,
        isError: userError,
    } = githubApi.useGetUserDetailsQuery(owner, {
        skip: !owner,
    });

    const isFavourite = favourites.includes(repoData?.html_url || '');

    const toggleFavourite = () => {
        if (!repoData) return;

        if (isFavourite) {
            removeFavourite(repoData.html_url);
        } else {
            addFavourite(repoData.html_url);
        }
    };

    if (!repoId) {
        return <div className="text-center mt-10">Repository ID is missing</div>;
    }

    if (repoError || userError) {
        return (
            <div className="text-center mt-10 text-red-500">Error loading repository details</div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            >
                ← Back
            </button>

            {repoLoading || userLoading ? (
                <div className="text-center">Loading repository details...</div>
            ) : (
                <>
                    {repoData && (
                        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                            <div className="flex justify-between items-start">
                                <h1 className="text-3xl font-bold mb-2">{repoData.name}</h1>
                                <button
                                    onClick={toggleFavourite}
                                    className={`px-4 py-2 rounded ${isFavourite ? 'bg-green-500 text-white' : 'bg-yellow-400'}`}
                                >
                                    {isFavourite ? 'Remove from Favourites' : 'Add to Favourites'}
                                </button>
                            </div>

                            <div className="text-gray-600 mb-4">
                                <a
                                    href={repoData.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    {repoData.full_name}
                                </a>
                            </div>

                            {repoData.description && (
                                <p className="text-gray-700 mb-6">{repoData.description}</p>
                            )}

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                <div className="bg-gray-100 p-3 rounded">
                                    <div className="text-sm text-gray-500">Stars</div>
                                    <div className="font-bold">
                                        {repoData.stargazers_count.toLocaleString()}
                                    </div>
                                </div>
                                <div className="bg-gray-100 p-3 rounded">
                                    <div className="text-sm text-gray-500">Forks</div>
                                    <div className="font-bold">
                                        {repoData.forks_count.toLocaleString()}
                                    </div>
                                </div>
                                <div className="bg-gray-100 p-3 rounded">
                                    <div className="text-sm text-gray-500">Watchers</div>
                                    <div className="font-bold">
                                        {repoData.watchers_count.toLocaleString()}
                                    </div>
                                </div>
                                <div className="bg-gray-100 p-3 rounded">
                                    <div className="text-sm text-gray-500">Open Issues</div>
                                    <div className="font-bold">
                                        {repoData.open_issues_count.toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {repoData.language && (
                                    <div>
                                        <span className="text-gray-500">Primary Language:</span>{' '}
                                        {repoData.language}
                                    </div>
                                )}
                                <div>
                                    <span className="text-gray-500">Created:</span>{' '}
                                    {new Date(repoData.created_at).toLocaleDateString()}
                                </div>
                                <div>
                                    <span className="text-gray-500">Last Updated:</span>{' '}
                                    {new Date(repoData.updated_at).toLocaleDateString()}
                                </div>
                                <div>
                                    <span className="text-gray-500">Last Push:</span>{' '}
                                    {new Date(repoData.pushed_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    )}

                    {userData && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-4">Repository Owner</h2>

                            <div className="flex items-center mb-6">
                                <img
                                    src={userData.avatar_url}
                                    alt={`${userData.login}'s avatar`}
                                    className="w-16 h-16 rounded-full mr-4"
                                />
                                <div>
                                    <h3 className="text-xl font-semibold">
                                        {userData.name || userData.login}
                                    </h3>
                                    <a
                                        href={userData.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                    >
                                        @{userData.login}
                                    </a>
                                </div>
                            </div>

                            {userData.bio && (
                                <div className="mb-4">
                                    <h4 className="text-gray-500 mb-1">Bio</h4>
                                    <p>{userData.bio}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-100 p-3 rounded">
                                    <div className="text-sm text-gray-500">Followers</div>
                                    <div className="font-bold">
                                        {userData.followers.toLocaleString()}
                                    </div>
                                </div>
                                <div className="bg-gray-100 p-3 rounded">
                                    <div className="text-sm text-gray-500">Following</div>
                                    <div className="font-bold">
                                        {userData.following.toLocaleString()}
                                    </div>
                                </div>
                                <div className="bg-gray-100 p-3 rounded">
                                    <div className="text-sm text-gray-500">Public Repos</div>
                                    <div className="font-bold">
                                        {userData.public_repos.toLocaleString()}
                                    </div>
                                </div>
                                <div className="bg-gray-100 p-3 rounded">
                                    <div className="text-sm text-gray-500">Public Gists</div>
                                    <div className="font-bold">
                                        {userData.public_gists.toLocaleString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default RepoDetailsPage;
