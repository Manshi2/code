import React from "react"

import { Link } from 'react-router-dom'


const FeaturedPostCard = ({ post }) => (
  <div className="relative h-[33rem] md:h-auto  md:flex  lg:pb-10 text-black px-10 lg:px-20">
    <div className="my-6 w-full py-2 md:my-2 md:mr-6 lg:my-12 lg:w-2/3">
      <h3 className="mb-4 text-3xl md:mr-4 md:text-4xl font-semibold line-clamp-2 md:line-clamp-none">{post.title}</h3>
      <p className="mb-4 text-md md:mr-4 md:text-xl ">{post.excerpt}</p>
      <button className="text-xl text-white bg-[#9AB898] px-6 py-2 rounded mt-10">
        <Link to={`/blog/post/${post.slug}`}>
          Read More
        </Link>
      </button>
    </div>

    <div className=" w-4/7 float-right ">
      <Link to={`/blog/post/${post.slug}`}>
        <span>
          <img
            // unoptimized
            alt={post.title}
            width={800}
            height={500}
            className="rounded "
            src={post.featuredImage.url}
          />
        </span>
      </Link>
    </div>
  </div>
)

export default FeaturedPostCard
