import React from 'react'

const Search = () => {
    return (
        <div className='hidden md:flex flex-1'>
            <input className='py-2 px-3 border-none outline-none flex flex-1' type="text" placeholder='Arama Yap...' />
            <button className='p-2 bg-blue-800 text-sm border border-transparent'>Ara</button>
        </div>
    )
}

export default Search
