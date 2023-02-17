import React, { useState, useEffect } from "react";
import Carousel from "nuka-carousel";
import { FeaturedPostCard } from "../components/index";
import { getFeaturedPosts } from "../services";
import { AiOutlineArrowRight } from "react-icons/ai";

const FeaturedPosts = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setFeaturedPosts(result);
      setDataLoaded(true);
    });
  }, []);

  return (
    <div className="text-black">
      <Carousel
        wrapAround={true}
        slidesToShow={1}
        animation={"scroll"}
        autoplay={true}
        autoplayInterval={5000}
        speed={2000}
        renderCenterLeftControls={false}
        renderCenterRightControls={false}
        renderBottomRightControls={({ nextSlide }) => (
          <button onClick={nextSlide}>
            <AiOutlineArrowRight className="rounded-full p-2 bg-[#9AB898] text-white text-4xl  " />
          </button>
        )}
      >
        {dataLoaded &&
          featuredPosts.map((post, index) => (
            <FeaturedPostCard key={index} post={post} />
          ))}
      </Carousel>
    </div>
  );
};

export default FeaturedPosts;
