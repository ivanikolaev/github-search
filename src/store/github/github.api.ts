import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IUser, ServerResponse, SearchUsersParams } from '../../models/models'

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
        })
    })
})