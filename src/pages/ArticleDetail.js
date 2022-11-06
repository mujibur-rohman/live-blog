import { useMutation, useSubscription } from '@apollo/client';
import {
  PaperAirplaneIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ADD_COMMENT,
  ARTICLE_DETAIL,
  DELETE_ARTICLE,
} from '../utility/constant';
import parse from 'html-react-parser';
import SkeletonCard from '../components/skeleton/SkeletonCard';
import { formatDistanceToNow } from 'date-fns';
import useAuth from '../hooks/useAuth';
import SpinnerButton from '../components/SpinnerButton';
import { Helmet } from 'react-helmet';

const ArticleDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { data, loading, error } = useSubscription(ARTICLE_DETAIL, {
    variables: { id: id },
  });
  const [addComent, { loading: loadingComment }] = useMutation(ADD_COMMENT);
  const [deleteArticle, { loading: loadingDelete }] =
    useMutation(DELETE_ARTICLE);

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

  const deleteHandler = async () => {
    await deleteArticle({
      variables: {
        id: data?.articles_by_pk.id,
      },
    });
    if (loadingDelete === false) {
      navigate(-1);
      setShowModal(false);
    }
  };

  const modal = (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => setShowModal(false)}
      ></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-1/2 max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
          <div className="mt-3 sm:flex">
            <div className="mt-2 text-center sm:ml-4 sm:text-left">
              <h4 className="text-lg font-medium text-gray-800">
                Delete Article ?
              </h4>
              <div className="items-center gap-2 mt-3 sm:flex justify-en">
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                  onClick={deleteHandler}
                >
                  {loadingDelete ? <SpinnerButton /> : 'Delete'}
                </button>
                <button
                  className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {showModal && modal}
      <div className="bg-white p-4 rounded-lg">
        <Helmet>
          <title>Detail Article</title>
        </Helmet>
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex justify-between">
            <h3 className="text-xl font-medium">
              {data?.articles_by_pk.title}
            </h3>

            {user?.uid === data?.articles_by_pk.user.id && (
              <div className="flex gap-2 cursor-pointer">
                <TrashIcon
                  className="w-6 text-red-400"
                  onClick={() => setShowModal(true)}
                />
                <PencilSquareIcon
                  className="w-6 text-orange-600"
                  onClick={() => navigate(`/update/${data?.articles_by_pk.id}`)}
                />
              </div>
            )}
          </div>
          <span className="text-sm text-gray-400">
            {formatDistanceToNow(new Date(data?.articles_by_pk.created_at))}
          </span>
          <span
            className="text-sm text-text inline-block underline cursor-pointer"
            onClick={() => navigate(`/author/${data?.articles_by_pk.user.id}`)}
          >
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

          {user && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
