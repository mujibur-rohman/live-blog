import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  HomeIcon,
  PencilSquareIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import React, { useCallback, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import Drawer from './Drawer';
import SearchMobile from './SearchMobile';

const Author = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const toggleDrawer = useCallback(
    () => setShowDrawer(!showDrawer),
    [showDrawer]
  );
  const toggleDropdown = useCallback(
    () => setShowDropdown(!showDropdown),
    [showDropdown]
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
        {loading || (
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
            {user && (
              <>
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
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-5 items-center relative">
        <SearchMobile className="hidden md:flex bg-gray-100" />
        {!user ? (
          loading || (
            <button
              className="btn bg-primary text-xs md:text-sm hover:bg-primaryAlt text-white"
              onClick={() => navigate('/login')}
            >
              Let's make an Article!
            </button>
          )
        ) : (
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src={user.photoURL}
              className="w-7 h-7 rounded-full object-cover"
              alt="avatar"
            />
            <span className="text-text text-sm hidden md:inline-block font-medium">
              {user.displayName}
            </span>
            <ChevronDownIcon width="10" />
          </div>
        )}
        <div
          className={`dropdown ${showDropdown ? 'scale-100' : 'scale-0'}`}
          onClick={async () => {
            await logout();
            toggleDropdown();
            navigate('/login');
          }}
        >
          <div className="flex gap-2 p-2 cursor-pointer">
            <ArrowRightOnRectangleIcon width={'15'} />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Author;
