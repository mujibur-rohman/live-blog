import {
  DocumentTextIcon,
  HomeIcon,
  PencilSquareIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import React, { useCallback, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Drawer from './Drawer';
import SearchMobile from './SearchMobile';

const Header = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = useCallback(
    () => setShowDrawer(!showDrawer),
    [showDrawer]
  );
  return (
    <header className="header fixed right-0 left-0 z-10">
      {/* Drawer */}
      <Drawer toggleDrawer={toggleDrawer} showDrawer={showDrawer} />

      {/* Hamburger */}
      <div
        className="space-y-[6px] cursor-pointer md:hidden"
        onClick={toggleDrawer}
      >
        <span className="block w-5 h-0.5 bg-gray-600"></span>
        <span className="block w-7 h-0.5 bg-gray-600"></span>
        <span className="block w-7 h-0.5 bg-gray-600"></span>
      </div>
      {/* Logo */}
      <div className="hidden md:flex items-center basis-5/12 lg:basis-4/12 justify-between">
        <Link
          to="/"
          className="text-lg pl-3 md:pl-0 hidden md:block font-bold text-primary"
        >
          LiveArticle
        </Link>
        <div className="flex gap-3">
          <NavLink
            to="/"
            end
            className="mobile-nav transisi"
            onClick={toggleDrawer}
          >
            <HomeIcon width="20" className="text-sm" />
          </NavLink>
          <NavLink
            to="/articles"
            className="mobile-nav transisi"
            onClick={toggleDrawer}
          >
            <DocumentTextIcon width="20" className="text-sm" />
          </NavLink>
          <NavLink
            to="/add-article"
            className="mobile-nav transisi"
            onClick={toggleDrawer}
          >
            <PencilSquareIcon width="20" className="text-sm" />
          </NavLink>
          <NavLink
            to="/profile"
            className="mobile-nav transisi"
            onClick={toggleDrawer}
          >
            <UserIcon width="20" className="text-sm" />
          </NavLink>
        </div>
      </div>

      <div className="flex gap-5 items-center">
        <SearchMobile className="hidden md:flex bg-gray-100" />
        <button className="btn bg-primary text-xs md:text-sm hover:bg-primaryAlt text-white">
          Let's make an Article!
        </button>

        {/* <div className="flex gap-2 items-center">
          <img
            src="https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg"
            alt="avatar-user"
            className="w-7 h-7 rounded-full"
          />
          <span className="text-text text-sm hidden md:inline-block">
            Display Name
          </span>
        </div> */}
      </div>
    </header>
  );
};

export default Header;
