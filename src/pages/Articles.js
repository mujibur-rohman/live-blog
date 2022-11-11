import { useSubscription } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet';
import { NavLink, Outlet } from 'react-router-dom';
import { CATEGORIES_POPULAR } from '../graphql/subscription/articleSubscription';

const Articles = () => {
  const { data: categories } = useSubscription(CATEGORIES_POPULAR);
  return (
    <>
      <Helmet>
        <title>Articles</title>
      </Helmet>
      <div className="mb-3 mt-5 md:mt-2 flex gap-4 ">
        <div className="flex gap-5 overflow-auto scrollbar-hide items-center">
          <p className="font-bold text-2xl">Popular Category :</p>
          {categories?.categories.map((cat) => (
            <NavLink
              key={cat.id}
              to={`${cat.name}`}
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
