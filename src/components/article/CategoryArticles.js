import { useSubscription } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_ARTICLES_BY_CATEGORY } from '../../utility/constant';
import SkeletonCard from '../skeleton/SkeletonCard';
import ArticleCard from './ArticleCard';

const CategoryArticles = () => {
  const { category } = useParams();
  const { data, loading, error } = useSubscription(GET_ARTICLES_BY_CATEGORY, {
    variables: {
      cat: category,
    },
  });
  if (error) console.log(error);

  return (
    <>
      <div className="mb-3 flex justify-between items-center">
        <h2 className="text-lg lg:text-2xl font-bold">Category : {category}</h2>
      </div>
      <div className="flex flex-col lg:grid grid-cols-2 gap-3">
        {data?.articles?.length === 0 && (
          <p className="text-center font-medium text-xl w-screen">
            No Articles
          </p>
        )}
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

export default CategoryArticles;
