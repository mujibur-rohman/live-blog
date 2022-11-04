import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchInput = ({ className }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    navigate(`search/${searchInput}`);
    setSearchInput('');
  };
  return (
    <form onSubmit={onSubmit} className={`flex rounded-full ${className}`}>
      <input
        placeholder="Search"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className={`w-full py-3 pl-4 rounded-full outline-none text-sm bg-transparent`}
      />
      <button className={`search-icon-mobile`}>
        <MagnifyingGlassIcon width="22" />
      </button>
    </form>
  );
};

export default SearchInput;
