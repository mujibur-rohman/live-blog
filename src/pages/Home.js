import React, { useEffect, useRef, useState } from 'react';
import ArticleCard from '../components/article/ArticleCard';
import { motion } from 'framer-motion';
import { useSubscription } from '@apollo/client';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import SearchInput from '../components/app/SearchInput';
import {
  GET_ARTICLES_BY_FOLLOWERS,
  GET_NEWEST_ARTICLES,
  GET_POPULAR_ARTICLES,
} from '../graphql/subscription/articleSubscription';

const Home = () => {
  const carousel = useRef();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [width, setwidth] = useState(0);
  const { data, loading, error } = useSubscription(GET_POPULAR_ARTICLES);
  const {
    data: newest,
    loading: loadingNewest,
    error: errorNewest,
  } = useSubscription(GET_NEWEST_ARTICLES);
  const { data: feed, loading: loadingFeed } = useSubscription(
    GET_ARTICLES_BY_FOLLOWERS,
    { variables: { uid: user?.uid } }
  );
  if (error) console.log(error);
  if (errorNewest) console.log(errorNewest);

  useEffect(() => {
    setwidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  const showAll = () => {
    navigate('/articles');
  };

  return (
    <div>
      <SearchInput className="bg-white md:hidden" />

      <div className="flex flex-col gap-7">
        <div>
          <div className="mb-3 flex justify-between items-center">
            <h2 className="text-lg lg:text-2xl font-bold">Popular</h2>
          </div>
          {data?.articles.length === 0 && (
            <p className="text-center font-medium w-full">No Articles</p>
          )}
          <motion.div
            ref={carousel}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-3 min-w-full"
          >
            {loading && (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}

            {data?.articles?.map((article) => (
              <ArticleCard article={article} drag={true} key={article?.id} />
            ))}
          </motion.div>
        </div>
        <div>
          <div className="mb-3 flex justify-between items-center">
            <h2 className="text-lg lg:text-2xl font-bold">4 Newest Article</h2>
            <button
              className="text-sm font-medium text-primary"
              onClick={showAll}
            >
              Show All
            </button>
          </div>
          <div className="flex flex-col lg:grid grid-cols-2 gap-3">
            {loadingNewest && (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            )}
            {newest?.articles?.map((article) => (
              <ArticleCard article={article} key={article?.id} />
            ))}
            {newest?.articles.length === 0 && (
              <p className="text-center font-medium w-full">No Articles</p>
            )}
          </div>
        </div>
        {user?.uid && (
          <div>
            <div className="mb-3 mt-5 md:mt-2 flex items-center">
              <h2 className="text-lg lg:text-2xl font-bold">Feeds</h2>
            </div>
            <div className="flex flex-col lg:grid grid-cols-2 gap-3">
              {loadingFeed && (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              )}
              {feed?.articles?.map((article) => (
                <ArticleCard article={article} key={article?.id} />
              ))}
            </div>
            {feed?.articles.length === 0 && (
              <p className="text-center font-medium w-full">No Articles</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
