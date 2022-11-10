import { useSubscription } from '@apollo/client';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Helmet } from 'react-helmet';
import ArticleCard from '../components/article/ArticleCard';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import SkeletonProfile from '../components/skeleton/SkeletonProfile';
import { GET_MY_ARTICLES } from '../graphql/subscription/articleSubscription';
import { GET_FOLLOWERS } from '../graphql/subscription/userSubscription';
import useAuth from '../hooks/useAuth';
import { nFormatter } from '../utility/formatter';

const Profile = () => {
  const { user } = useAuth();
  const { data, loading, error } = useSubscription(GET_MY_ARTICLES, {
    variables: {
      uid: user.uid,
    },
  });

  const { data: followers } = useSubscription(GET_FOLLOWERS, {
    variables: {
      uid: user.uid,
    },
  });

  const view = () => {
    if (data?.articles?.length !== undefined) {
      let count = 0;
      data?.articles?.forEach((element) => {
        count += element.view;
      });
      return nFormatter(count);
    }
    return null;
  };

  if (error) console.log(error);
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>
      {data?.articles?.length !== undefined ? (
        <div className="flex flex-col md:flex-row md:items-center justify-center border-b-[1px] pt-3 pb-7 gap-6">
          <div className="flex flex-col items-center">
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-24 object-cover h-24 rounded-full mb-3"
            />
            <p className="font-bold">{user.displayName}</p>
          </div>
          <div className="w-full basis-7/12 flex flex-col gap-3 mb-5 items-center">
            <div className="flex justify-between w-full mb-3">
              <div className="flex flex-col basis-4/12 justify-center items-center">
                <p className="font-medium">Article</p>
                <span className="block">
                  {nFormatter(data?.articles.length)}
                </span>
              </div>
              <div className="flex flex-col basis-4/12 justify-center items-center">
                <p className="font-medium">Total View</p>
                <span className="block">{view()}</span>
              </div>
              <div className="flex flex-col basis-4/12 justify-center items-center">
                <p className="font-medium">Followers</p>
                <span className="block">
                  {nFormatter(followers?.followers.length)}
                </span>
              </div>
            </div>
            <div className="flex justify-center gap-3 w-full">
              <div className="bg-primary p-2 rounded-lg">
                <EnvelopeIcon width="20" className="text-white" />
              </div>
              <button className="btn bg-primary text-white text-sm w-fit lg:w-3/4">
                {user.email}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <SkeletonProfile />
      )}
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
      </div>
      {data?.articles.length === 0 && (
        <p className="text-center font-medium w-full">No Articles</p>
      )}
    </>
  );
};

export default Profile;
