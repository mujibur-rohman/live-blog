import { useQuery, useSubscription } from '@apollo/client';
import React from 'react';
import { GET_ALL_ARTICLES } from '../../utility/constant';
import SkeletonCard from '../skeleton/SkeletonCard';
import ArticleCard from './ArticleCard';

const NewestArticles = () => {
  // const { data, loading, error } = useQuery(GET_ALL_ARTICLES);
  const { data, loading, error } = useSubscription(GET_ALL_ARTICLES);
  if (error) console.log(error);

  return (
    <>
      <div className="mb-3 flex justify-between items-center">
        <h2 className="text-lg lg:text-2xl font-bold">Newest Article</h2>
      </div>
      <div className="flex flex-col lg:grid grid-cols-2 gap-3">
        {loading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}
        {data?.articles?.map((article) => (
          <ArticleCard article={article} key={article?.id} />
        ))}
      </div>
    </>
  );
};

export default NewestArticles;
