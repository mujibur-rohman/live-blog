import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import React from 'react';

const ArticleDetail = () => {
  return (
    <>
      <div className="bg-white p-4 rounded-lg">
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="text-xl font-medium">Title</h3>
          <span className="text-sm text-gray-400">3 minutes ago</span>
          <span className="text-sm text-text inline-block underline cursor-pointer">
            Author
          </span>
        </div>
        <div>
          Mendeley ini merupakan salah satu aplikasi wajib buat para mahasiswa,
          khususnya bagi mereka yang sedang menulis artikel ilmiah, jurnal,
          ataupun skripsi dan tesis. Mendeley adalah aplikasi yang membantu kamu
          dalam penyisipan, penulisan, dan pemformatan sitase atau citation.
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <p className="font-semibold border-b-[1px] pb-3">Comments</p>
        <div className="py-5 flex flex-col gap-5">
          <div className="flex gap-2">
            <img
              className="w-9 h-9 rounded-full self-start"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
              alt="profile-pictures"
            />
            <div className="bg-background text-sm rounded-lg p-2 px-3">
              <h6 className="text-sm font-bold">User</h6>
              <p>
                Mendeley adalah aplikasi yang membantu kamu dalam penyisipan,
                penulisan, dan pemformatan sitase atau citation.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <textarea
              type="text"
              className="input-text text-sm w-full"
              placeholder="Comment"
            />
            <div className="py-2 px-3 bg-primary self-start rounded-lg">
              <PaperAirplaneIcon className="w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
