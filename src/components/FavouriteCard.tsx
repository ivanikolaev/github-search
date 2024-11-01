import { useActions } from '../hooks/actions'

function FavouriteCard({ repo }: { repo: string }) {
    const { removeFavourite } = useActions()

    return (
        <div className='flex justify-between gap-20 align-center border py-2 px-8 rounded hover:bg-gray-100 mb-3'>
            <a
                className='flex justify-center align-center font-bold'
                href={repo}
                target='_blank'
            >
                {repo.substring(repo.indexOf('/') + 13)}
            </a>
            <button
                className='py-1 px-5 bg-red-400 rounded hover:shadow-md transition-all'
                onClick={() => removeFavourite(repo)}
            >
                Delete
            </button>
        </div>
    )
}

export default FavouriteCard