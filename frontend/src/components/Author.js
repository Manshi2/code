import React from 'react';
// import { grpahCMSImageLoader } from '../util';
const Author = ({ author }) => (
    <>
        {
            author ? 
                <div className="text-center mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-50">
                    <div className="w-24 h-20 rounded-full absolute left-[50%] transform -translate-x-[50%] -top-14">
                    <img
                        alt="/"
                        className="w-full rounded-full"
                        src={author?.photo?.url}
                    />
                    </div>
                    <h3 className="text-white mt-4 mb-4 text-xl font-bold">{author?.name}</h3>
                    <p className="text-white mb-2 text-ls">{author?.degree}</p>
                    <p className="text-white text-ls text-left">{author?.bio}</p>
                </div> : null
        }
    </>
);
export default Author;