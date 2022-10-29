import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Olahraga' },
  { id: 2, name: 'Kuliner' },
  { id: 3, name: 'Fashion' },
  { id: 4, name: 'Tech' },
];

const Articles = () => {
  return (
    <>
      <div className="mb-3 mt-5 md:mt-2 flex gap-4 ">
        <div className="flex gap-5">
          <NavLink to="/articles" end className="btn-category transisi">
            All
          </NavLink>
          {categories.map((cat) => (
            <NavLink
              key={cat.id}
              to={`${cat.name.toLowerCase()}`}
              className="btn-category transisi"
            >
              {cat.name}
            </NavLink>
          ))}
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Articles;
