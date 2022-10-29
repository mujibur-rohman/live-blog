import { ChatBubbleBottomCenterIcon, EyeIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ArticleCard = ({ drag }) => {
  const navigate = useNavigate();

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
        Title
      </h3>
      <div className="flex flex-col gap-1 mb-1">
        <span className="text-sm text-gray-400">3 minutes ago</span>
      </div>
      <p className="text-sm text-justify">
        Mendeley ini merupakan salah satu aplikasi wajib buat para mahasiswa,
        khususnya bagi mereka yang sedang menulis artikel ilmiah, jurnal,
        ataupun skripsi dan tesis. Mendeley adalah aplikasi yang membantu kamu
        dalam penyisipan, penulisan, dan pemformatan sitase atau citation.
      </p>
      <div className="mt-4 flex justify-between">
        <span className="text-sm text-text inline-block underline cursor-pointer">
          by Author
        </span>
        <div className=" flex gap-3">
          <div className="footer-card">
            <EyeIcon width="18" />
            <span className="text-sm">10</span>
          </div>
          <div className="footer-card">
            <ChatBubbleBottomCenterIcon width="18" />
            <span className="text-sm">10</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
