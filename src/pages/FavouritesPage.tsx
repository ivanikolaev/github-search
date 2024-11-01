import React from 'react'
import { useAppSelector } from '../hooks/redux'
import FavouriteCard from '../components/FavouriteCard'

function FavouritesPage() {
    const { favourites } = useAppSelector(state => state.github)

    if (favourites.length === 0)
        return <p className='text-center mt-4'>No items</p>

    return (
        <div className='flex justify-center pt-10 h-full w-full'>
            <ul className='list-none'>
                {favourites.map(item => (
                    <li key={item}>
                        <FavouriteCard repo={item} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default FavouritesPage