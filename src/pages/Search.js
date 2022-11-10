import { useSubscription } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from '../components/article/ArticleCard';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import { SEARCH_ARTICLES } from '../graphql/subscription/articleSubscription';

export default function Search() {
  const { input } = useParams();
  const { data, loading } = useSubscription(SEARCH_ARTICLES, {
    variables: {
      content: `%${input}%`,
    },
  });
  return (
    <>
      <div className="mb-3 flex justify-between items-center">
        <h2 className="text-lg lg:text-2xl font-bold">
          {data?.articles.length} result : {input}
        </h2>
      </div>
      {data?.articles.length === 0 && (
        <p className="text-center font-medium w-full">No Articles</p>
      )}
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
}
