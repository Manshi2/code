import React from "react";
// import moment from "moment";
import { Link } from "react-router-dom";
// import { AiFillCaretRight } from "react-icons/ai";

const PostCard = ({ post }) => {
  return (
    <>
      <div className="relative w-full flex h-full">
        <div className="w-full h-full">
          <Link to={`/blog/post/${post.slug}`}>
            <div
              className=" rounded-lg w-72 h-[25rem] mb-4"
              style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
            />
          </Link>
          <div className="max-h-min mx-auto">
            <p className="pr-5 mb-2 text-shadow font-semibold text-lg text-black">
              {post.title}
            </p>
            <div className="flex items-center justify-center">
              <p className="pr-5 align-middle text-black text-sm text-shadow  font-medium">
                {post.excerpt.slice(0, 150)}
                <Link to={`/blog/post/${post.slug}`}>
                  <span className="text-[#E94C60] font-semibold">Read more</span>
                </Link>
              </p>
            </div>
          </div>

          {/* <p className="flex pt-2">
            {" "}
            <AiFillCaretRight className="rounded-full  bg-[#E94C60] text-white text-md  mt-1 mr-2" />{" "}
            8 min
          </p> */}
        </div>
        {/* <div className="w-[20rem] h-full">
          <div
            className=" rounded-lg w-72 h-[25rem] mb-4"
            style={{ backgroundImage: `url('${post.featuredImage.url}')` }}
          />

          <p className=" mb-2 text-shadow font-semibold text-lg   text-black">
            {post.title}
          </p>
          <div className="flex items-center justify-center">
            <p className=" align-middle text-black text-sm text-shadow  font-medium">
              {post.excerpt}
              <Link to={`/blog/post/${post.slug}`}>
                <span className="text-[#E94C60] font-semibold">Read more</span>
              </Link>
            </p>
          </div>
          <p className="flex pt-2">
            {" "}
            <AiFillCaretRight className="rounded-full   bg-[#E94C60] text-white  text-md mt-1 mr-2 " />{" "}
            8 min
          </p>
        </div> */}
      </div>
    </>
  );
};

export default PostCard;
