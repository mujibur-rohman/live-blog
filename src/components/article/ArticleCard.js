import { ChatBubbleBottomCenterIcon, EyeIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import useAuth from '../../hooks/useAuth';
import { nFormatter, removeTags } from '../../utility/formatter';
import { useMutation } from '@apollo/client';
import { UPDATE_VIEW } from '../../graphql/mutation/articleMutation';
const ArticleCard = ({ drag, article }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const dateToNow = formatDistanceToNow(new Date(article.created_at));
  const [incrementView] = useMutation(UPDATE_VIEW);
  const clickCard = () => {
    navigate(`/article/${article.id}`);
    incrementView({
      variables: {
        id: article.id,
      },
    });
  };

  return (
    <motion.div
      className={`bg-white ${
        drag && 'active:cursor-grabbing cursor-grab'
      } rounded-2xl p-4 min-w-[13rem] md:min-w-[24rem] self-start`}
    >
      <h3 className="font-medium text-lg cursor-pointer" onClick={clickCard}>
        {article.title}
      </h3>

      <div className="flex flex-col gap-1 mb-1">
        <span className="text-sm text-gray-400">{dateToNow}</span>
      </div>
      <>
        <div>
          {removeTags(article.content).substr(0, 100)}...{' '}
          <span
            onClick={clickCard}
            className="text-blue-400 inline underline cursor-pointer"
          >
            Read More
          </span>
        </div>
      </>
      <div className="flex my-2 flex-col gap-1 bg-orange-400 w-fit py-1 px-2 rounded-full">
        <span className="text-xs text-white">{article.category.name}</span>
      </div>
      <div className="flex justify-between">
        <span
          className="text-sm text-text inline-block underline cursor-pointer"
          onClick={() => {
            if (article.user.id === user?.uid) {
              navigate('/profile');
            } else {
              navigate(`/author/${article.user.id}`);
            }
          }}
        >
          by {article.user.displayName}
        </span>
        <div className=" flex gap-3">
          <div className="footer-card">
            <EyeIcon width="18" />
            <span className="text-sm">{nFormatter(article.view)}</span>
          </div>
          <div className="footer-card">
            <ChatBubbleBottomCenterIcon width="18" />
            <span className="text-sm">{article.comments.length}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
