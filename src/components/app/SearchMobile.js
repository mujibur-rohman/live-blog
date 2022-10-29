import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import React from 'react';

const SearchMobile = ({ className }) => {
  return (
    <div className={`flex rounded-full ${className}`}>
      <input
        placeholder="Search"
        type="text"
        className={`w-full py-3 pl-4 rounded-full outline-none text-sm bg-transparent`}
      />
      <button className={`search-icon-mobile`}>
        <MagnifyingGlassIcon width="22" />
      </button>
    </div>
  );
};

export default SearchMobile;
