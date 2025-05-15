import React from 'react'
import ProfileInfo from './ProfileInfo'
import { useNavigate } from 'react-router-dom'
import Searchbar from './Searchbar';
import { useState } from 'react';

const Navbar = ({ userinfo, onSearchNote, handleClearSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.clear();
    navigate("/login");
  }

  const handleSearch = () => {
    if(searchValue){
      onSearchNote(searchValue);
    }
  }

  const onClearSearch = () => {
    setSearchValue("");
    handleClearSearch();
  }
  return (
    <div className='bg-white flex items-center justify-between px-6 py-3 drop-shadow-md'>
      <h2 className='text-xl font-medium text-black py-2'>Notes</h2>

      <Searchbar 
      value={searchValue} 
      onChange={({ target }) =>{
        setSearchValue(target.value);
      }}
      handleSearch={handleSearch}
      onClearSearch={onClearSearch} 
      />

      <ProfileInfo userinfo={userinfo} onLogout={onLogout} />

    </div>
  )
}

export default Navbar