import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { IoMdClose } from 'react-icons/io'

const Searchbar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className='w-80 flex items-center px-4 bg-slate-100 rounded-md'>
        <input 
        type="text"
        placeholder='Search notes...'
        className='w-full text-xs bg-transparent outline-none py-[11px]'
        value={value}
        onChange={onChange}
         />

         {value && (<IoMdClose
         className='text-slate-500 cursor-pointer hover:text-slate-900'
            onClick={onClearSearch}
        />)}

         <FaMagnifyingGlass
         className='text-slate-500 cursor-pointer hover:text-slate-900'
            onClick={handleSearch}
        />
    </div>
  )
}

export default Searchbar