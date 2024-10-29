import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser, ServerResponse, SearchUsersParams, IRepo } from '../../models/models'

export const githubApi = createApi({
    reducerPath: 'github/api/v1',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
    refetchOnFocus: true,
    endpoints: (build) => ({
        searchUsers: build.query<IUser[], SearchUsersParams>({
            query: (search: SearchUsersParams ) => ({
                url: 'search/users',
                params: {
                    q: search.username,
                    per_page: search.page_limit
                }
            }),
            transformResponse: (response: ServerResponse<IUser>) => (response.items)
        }),
        getUserRepos: build.query<IRepo[], string>({
            query: (username: string) => ({
                url: `users/${username}/repos`
            })
        })
    })
})