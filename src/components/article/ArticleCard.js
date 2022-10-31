import { ChatBubbleBottomCenterIcon, EyeIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import parse from 'html-react-parser';
import React from 'react';

const ArticleCard = ({ drag, article }) => {
  const navigate = useNavigate();
  console.log(article);

  return (
    <motion.div
      className={`bg-white ${
        drag && 'active:cursor-grabbing cursor-grab'
      } rounded-2xl p-4 min-w-[13rem] md:min-w-[24rem]`}
    >
      <h3
        className="font-medium text-lg cursor-pointer"
        onClick={() => navigate('/article/id')}
      >
        {article.title}
      </h3>
      <div className="flex flex-col gap-1 mb-1">
        <span className="text-sm text-gray-400">3 minutes ago</span>
      </div>
      <div className="flex flex-col gap-1 mb-1 bg-orange-400 w-fit py-1 px-2 rounded-full">
        <span className="text-xs text-white">{article.category.name}</span>
      </div>
      <React.Fragment>{parse(article.content)}</React.Fragment>
      <div className="mt-4 flex justify-between">
        <span className="text-sm text-text inline-block underline cursor-pointer">
          by {article.user.displayName}
        </span>
        <div className=" flex gap-3">
          <div className="footer-card">
            <EyeIcon width="18" />
            <span className="text-sm">{article.view}</span>
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
