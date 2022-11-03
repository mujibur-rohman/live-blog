import { useMutation, useSubscription } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import ArticleCard from '../components/article/ArticleCard';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import SkeletonProfile from '../components/skeleton/SkeletonProfile';
import SpinnerButton from '../components/SpinnerButton';
import useAuth from '../hooks/useAuth';
import useAuthor from '../hooks/useAuthor';
import {
  ADD_FOLLOWERS,
  GET_FOLLOWERS,
  GET_MY_ARTICLES,
  UNFOLLOW,
} from '../utility/constant';

const Author = () => {
  const { id } = useParams();
  const author = useAuthor(id);
  const { user } = useAuth();
  const [addFollowers, { loading: loadingFollow }] = useMutation(ADD_FOLLOWERS);
  const [unfollow, { loading: loadingUnfollow }] = useMutation(UNFOLLOW);
  const { data, loading, error } = useSubscription(GET_MY_ARTICLES, {
    variables: {
      uid: id,
    },
  });
  if (error) console.log(error);
  const { data: followers } = useSubscription(GET_FOLLOWERS, {
    variables: {
      uid: id,
    },
  });

  const view = () => {
    if (data?.articles?.length !== undefined) {
      let count = 0;
      data?.articles?.forEach((element) => {
        count += element.view;
      });
      return count;
    }
    return null;
  };

  const followHandler = () => {
    addFollowers({ variables: { userId: id, follower: user.uid } });
  };
  const unfollowHandler = () => {
    unfollow({ variables: { userId: id, follower: user.uid } });
  };

  return (
    <>
      {data?.articles?.length !== undefined ? (
        <div className="flex flex-col md:flex-row md:items-center justify-center border-b-[1px] pt-3 pb-7 gap-6">
          <div className="flex flex-col items-center">
            <img
              src={author.photoURL}
              alt="avatar"
              className="w-24 object-cover h-24 rounded-full mb-3"
            />
            <p className="font-bold">{author.displayName}</p>
          </div>
          <div className="w-full basis-7/12 flex flex-col gap-3 mb-5 justify-center">
            <div className="flex justify-between w-full mb-3">
              <div className="flex flex-col basis-4/12 justify-center items-center">
                <p className="font-medium">Article</p>
                <span className="block">{data?.articles.length}</span>
              </div>
              <div className="flex flex-col basis-4/12 justify-center items-center">
                <p className="font-medium">Total View</p>
                <span className="block">{view()}</span>
              </div>
              <div className="flex flex-col basis-4/12 justify-center items-center">
                <p className="font-medium">Followers</p>
                <span className="block">{followers?.followers.length}</span>
              </div>
            </div>
            <div className="flex justify-center gap-3 w-full">
              {followers?.followers.find(
                (fol) => fol.follower === user?.uid
              ) ? (
                <button
                  onClick={unfollowHandler}
                  className="btn bg-white text-primary text-sm w-6/12"
                >
                  {loadingUnfollow ? <SpinnerButton /> : 'Unfollow'}
                </button>
              ) : (
                <button
                  onClick={followHandler}
                  className="btn bg-primary text-white text-sm w-6/12"
                >
                  {loadingFollow ? <SpinnerButton /> : 'Follow'}
                </button>
              )}
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
        {data?.articles.length === 0 && (
          <p className="text-center font-medium w-full">No Articles</p>
        )}
      </div>
    </>
  );
};

export default Author;
