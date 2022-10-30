import React from 'react';
import ArticleCard from '../components/article/ArticleCard';

const Profile = () => {
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
        <ArticleCard />
        <ArticleCard />
      </div>
    </>
  );
};

export default Profile;
