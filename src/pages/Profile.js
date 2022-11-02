import { useSubscription } from '@apollo/client';
import React from 'react';
import ArticleCard from '../components/article/ArticleCard';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import useAuth from '../hooks/useAuth';
import { GET_MY_ARTICLES } from '../utility/constant';

const Profile = () => {
  const { user } = useAuth();
  const { data, loading, error } = useSubscription(GET_MY_ARTICLES, {
    variables: {
      uid: user.uid,
    },
  });

  if (error) console.log(error);
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-around border-b-[1px] pt-3 pb-7 gap-6">
        <div className="flex flex-col items-center">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
            alt="photoProfile"
            className="w-24 h-24 rounded-full mb-3"
          />
          <p className="font-bold">Display Name</p>
        </div>
        <div className="w-full basis-7/12 flex flex-col gap-3 mb-5 items-center">
          <div className="flex justify-between w-full mb-3">
            <div className="flex flex-col basis-4/12 justify-center items-center">
              <p className="font-medium">Article</p>
              <span className="block">10</span>
            </div>
            <div className="flex flex-col basis-4/12 justify-center items-center">
              <p className="font-medium">Total View</p>
              <span className="block">12.1k</span>
            </div>
            <div className="flex flex-col basis-4/12 justify-center items-center">
              <p className="font-medium">Followers</p>
              <span className="block">10</span>
            </div>
          </div>
          <div className="flex justify-center gap-3 w-full">
            <button className="btn bg-white text-primary text-sm w-full lg:w-3/4">
              Unfollow
            </button>
            <button className="btn bg-primary text-white text-sm w-full lg:w-3/4">
              Follow
            </button>
          </div>
        </div>
      </div>
      <div className="mb-3 flex justify-between items-center mt-6">
        <h2 className="text-lg lg:text-2xl font-bold">Articles</h2>
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
        {data?.articles.length === 0 && (
          <p className="text-center font-medium w-full">No Articles</p>
        )}
      </div>
    </>
  );
};

export default Profile;
