import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
    IUser,
    ServerResponse,
    SearchUsersParams,
    IRepo,
    TrendingParams,
    RepoDetailsParams,
    IUserDetails,
} from '../../models/models';

// Helper function to get date for timeframe
const getDateForTimeframe = (timeframe: string): string => {
    const date = new Date();

    switch (timeframe) {
        case 'daily':
            date.setDate(date.getDate() - 1);
            break;
        case 'weekly':
            date.setDate(date.getDate() - 7);
            break;
        case 'monthly':
            date.setMonth(date.getMonth() - 1);
            break;
        default:
            date.setDate(date.getDate() - 1);
    }

    return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

export const githubApi = createApi({
    reducerPath: 'github/api/v1',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
    refetchOnFocus: true,
    endpoints: build => ({
        searchUsers: build.query<IUser[], SearchUsersParams>({
            query: (search: SearchUsersParams) => ({
                url: 'search/users',
                params: {
                    q: search.username,
                    per_page: search.page_limit,
                },
            }),
            transformResponse: (response: ServerResponse<IUser>) => response.items,
        }),
        getUserRepos: build.query<IRepo[], string>({
            query: (username: string) => ({
                url: `users/${username}/repos`,
            }),
        }),
        getTrendingRepos: build.query<IRepo[], TrendingParams>({
            query: (params: TrendingParams) => ({
                url: 'search/repositories',
                params: {
                    q: `language:${params.language} sort:stars`,
                    sort: 'stars',
                    order: 'desc',
                    per_page: 10,
                    created: `>${getDateForTimeframe(params.since)}`,
                },
            }),
            transformResponse: (response: ServerResponse<IRepo>) => response.items,
        }),
        getRepoDetails: build.query<IRepo, RepoDetailsParams>({
            query: (params: RepoDetailsParams) => ({
                url: `repos/${params.owner}/${params.repo}`,
            }),
        }),
        getUserDetails: build.query<IUserDetails, string>({
            query: (username: string) => ({
                url: `users/${username}`,
            }),
        }),
    }),
});
