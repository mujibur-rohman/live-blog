import React from 'react';
import ArticleCard from './ArticleCard';

const NewestArticles = () => {
  return (
    <>
      <div className="mb-3 flex justify-between items-center">
        <h2 className="text-lg lg:text-2xl font-bold">10 Newest Article</h2>
      </div>
      <div className="flex flex-col lg:grid grid-cols-2 gap-3">
        <ArticleCard />
        <ArticleCard />
      </div>
    </>
  );
};

export default NewestArticles;
