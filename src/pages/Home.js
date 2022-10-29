import React, { useEffect, useRef, useState } from 'react';
import SearchMobile from '../components/app/SearchMobile';
import ArticleCard from '../components/article/ArticleCard';
import { motion } from 'framer-motion';

const Home = () => {
  const carousel = useRef();
  const [width, setwidth] = useState(0);

  useEffect(() => {
    setwidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <div>
      <SearchMobile className="bg-white md:hidden" />

      <div className="flex flex-col gap-7">
        <div>
          <div className="mb-3 flex justify-between items-center">
            <h2 className="text-lg lg:text-2xl font-bold">Popular</h2>
          </div>
          <motion.div
            ref={carousel}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-3 min-w-full"
          >
            <ArticleCard drag={true} />
            <ArticleCard drag={true} />
            <ArticleCard drag={true} />
            <ArticleCard drag={true} />
          </motion.div>
        </div>
        <div>
          <div className="mb-3 flex justify-between items-center">
            <h2 className="text-lg lg:text-2xl font-bold">10 Newest Article</h2>
            <button className="text-sm font-medium text-primary">
              Show All
            </button>
          </div>
          <div className="flex flex-col lg:grid grid-cols-2 gap-3">
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
          </div>
        </div>
        <div>
          <div className="mb-3 mt-5 md:mt-2 flex items-center">
            <h2 className="text-lg lg:text-2xl font-bold">Feeds</h2>
          </div>
          <div className="flex flex-col lg:grid grid-cols-2 gap-3">
            <ArticleCard />
            <ArticleCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
