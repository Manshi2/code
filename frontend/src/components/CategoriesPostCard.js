import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const CategoriesPostCard = ({ post }) => {
  return (
    <>
      <div className="relative h-1/2 mt-8 mx-10">
        <div className=" rounded-lg ">
          <Link to={`/blog/post/${post.slug}`}>
              <img
                unoptimized
                alt={post.title}
                width={800}
                height={500}
                className="rounded "
                src={post.featuredImage.url}
              />
          </Link>
        </div>
        <div className="flex flex-col rounded-lg p-4 mt-4 ">
          <p className="text-black mb-4 text-shadow font-semibold text-xl">
            <Link to={`/blog/post/${post.slug}`}>
              {post.title}
            </Link>
          </p>
          <p className=" align-middle text-black text-sm text-shadow  font-medium">
            {post.excerpt}
            <Link to={`/blog/post/${post.slug}`}>
              <span className="text-[#E94C60] font-semibold ml-3 mt-2">Read More ➡️</span>
            </Link>
          </p>

          <p className="text-black mb-4 mt-4 bottom-2 font-semibold text-xs">
            {moment(post.createdAt).format("MMM DD, YYYY")}
          </p>
        </div>
      </div>
    </>
  );
};
export default CategoriesPostCard;
