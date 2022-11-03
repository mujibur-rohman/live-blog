import { useMutation, useSubscription } from '@apollo/client';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ADD_COMMENT, ARTICLE_DETAIL } from '../utility/constant';
import parse from 'html-react-parser';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import { formatDistanceToNow } from 'date-fns';
import useAuth from '../hooks/useAuth';
import SpinnerButton from '../components/SpinnerButton';

const ArticleDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const { data, loading, error } = useSubscription(ARTICLE_DETAIL, {
    variables: { id: id },
  });
  const [addComent, { loading: loadingComment }] = useMutation(ADD_COMMENT);

  if (error) console.log(error);

  const submitComment = () => {
    if (comment.trim()) {
      addComent({
        variables: {
          articleId: id,
          displayName: user.displayName,
          body: comment,
          photoURL: user.photoURL,
        },
      });
      setComment('');
    }
  };

  if (loading) {
    return (
      <>
        <SkeletonCard />
        <SkeletonCard />
      </>
    );
  }

  return (
    <>
      <div className="bg-white p-4 rounded-lg">
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="text-xl font-medium">{data?.articles_by_pk.title}</h3>
          <span className="text-sm text-gray-400">
            {formatDistanceToNow(new Date(data?.articles_by_pk.created_at))}
          </span>
          <span className="text-sm text-text inline-block underline cursor-pointer">
            {data?.articles_by_pk.user.displayName}
          </span>
        </div>
        <div>{parse(data?.articles_by_pk?.content.toString())}</div>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <p className="font-semibold border-b-[1px] pb-3">Comments</p>
        <div className="py-5 flex flex-col gap-5">
          {data?.articles_by_pk.comments.length === 0 && (
            <p className="text-center">No Comment</p>
          )}
          {data?.articles_by_pk.comments.map((comment, i) => (
            <div className="flex gap-2" key={i}>
              <img
                className="w-9 h-9 rounded-full self-start object-cover"
                src={
                  comment.photoURL ||
                  `https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`
                }
                alt="profile-pictures"
              />
              <div>
                <div className="bg-background text-sm mb-1 rounded-lg p-2 px-3">
                  <h6 className="text-sm font-medium">{comment.displayName}</h6>
                  <p>{comment.body}</p>
                </div>
                <p className="text-xs text-gray-400 mb-1 pl-2">
                  {formatDistanceToNow(new Date(comment.created_at))}
                </p>
              </div>
            </div>
          ))}

          <div className="flex gap-2">
            <textarea
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              type="text"
              className="input-text text-sm w-full"
              placeholder="Comment"
            />
            <div
              onClick={submitComment}
              className="py-2 px-3 bg-primary self-start rounded-lg cursor-pointer"
            >
              {loadingComment ? (
                <SpinnerButton />
              ) : (
                <PaperAirplaneIcon className="w-5 text-white" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
