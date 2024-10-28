import React from 'react'
import { githubApi } from '../store/github/github.api'

function HomePage() {
    const { isLoading, isError, data } = githubApi.useSearchUsersQuery({ username: 'ivan', page_limit: 10 })
    return (
        <div className='flex justify-center pt-10 mx-auto h-screen w-screen'>
            {isError && <p className='text-center text-red-600'>Something went wrong...</p>}

            <div className='relative w-[560px]'>
                <input className='border py-2 px-4 w-full h-[42px] mb-2'
                    type="text"
                    placeholder='Search for github username...'
                />
            </div>
        </div>
    )
}

export default HomePage