import React from 'react';
import {
  ArrowLeftOnRectangleIcon,
  DocumentTextIcon,
  HomeIcon,
  PencilSquareIcon,
  UserIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import { Link, NavLink } from 'react-router-dom';

const Drawer = ({ toggleDrawer, showDrawer }) => {
  return (
    <aside
      className={`${
        !showDrawer ? 'translate-x-[-100rem]' : 'translate-x-0'
      } drawer md:hidden`}
    >
      <div className="w-6/12 bg-white h-full">
        <div className="flex h-14 justify-between items-center">
          <Link to="/" className="text-lg pl-3 font-bold text-primary">
            LiveArticle
          </Link>
          <div className="flex justify-end p-3" onClick={toggleDrawer}>
            <XMarkIcon width="25" className="cursor-pointer" />
          </div>
        </div>
        {/* List Menu */}
        <div className="px-3 mt-6 flex flex-col gap-3">
          <NavLink to="/" end className="mobile-nav" onClick={toggleDrawer}>
            <HomeIcon width="20" className="text-sm" />
            <p className="text-sm">Home</p>
          </NavLink>
          <NavLink to="/articles" className="mobile-nav" onClick={toggleDrawer}>
            <DocumentTextIcon width="20" className="text-sm" />
            <p className="text-sm">Newest Article</p>
          </NavLink>
          <NavLink
            to="/add-article"
            className="mobile-nav"
            onClick={toggleDrawer}
          >
            <PencilSquareIcon width="20" className="text-sm" />
            <p className="text-sm">Add Article</p>
          </NavLink>
          <NavLink to="/profile" className="mobile-nav" onClick={toggleDrawer}>
            <UserIcon width="20" className="text-sm" />
            <p className="text-sm">Profile</p>
          </NavLink>
          <div className="mobile-nav cursor-pointer">
            <ArrowLeftOnRectangleIcon width="20" className="text-sm" />
            <button className="text-sm">Logout</button>
          </div>
        </div>
      </div>
      <div
        className="bg-black opacity-10 h-full w-6/12"
        onClick={toggleDrawer}
      ></div>
    </aside>
  );
};

export default Drawer;
