import React, { useState, useEffect } from "react";
import Carousel from "nuka-carousel";
import { PostCard } from "../components/index";
import { getFeaturedPosts } from "../services";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "../styles/appointment.css";

const Features = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(() => window.screen.width)

  useEffect(() => {
    getFeaturedPosts().then((result) => {
      setFeaturedPosts(result);
      setDataLoaded(true);
    });
    window.onresize = () => setWindowWidth(window.screen.width)
  }, []);

  return (
    <div className="text-black mt-20 ">
      <div className="flex w-full h-[37rem]  bg-[#FEF9E7] px-20">
        <div className="w-1/2 pt-24">
          <h3 className="text-5xl font-semibold">Features </h3>
          <p className="text-xl pt-10 pr-20">
          We all want to maintain good health as we get older. You can rely on our health related articles for better understanding of a healthy lifestyle, from heart to brain, we have it all.
          </p>
        </div>
        <div className="star w-1/2 ">
          <Carousel
            wrapAround={true}
            slidesToShow={windowWidth < 900 ? 1 : 2}
            animation={"scroll"}
            autoplay={true}
            autoplayInterval={5000}
            speed={2000}
            renderCenterLeftControls={false}
            renderCenterRightControls={false}
            renderTopLeftControls={({ nextSlide }) => (
              <button onClick={nextSlide}>
                <AiOutlineArrowLeft className="rounded-full p-2 bg-gray-200 text-black text-4xl mt-60 -ml-6 " />
              </button>
            )}
            renderTopRightControls={({ nextSlide }) => (
              <button onClick={nextSlide}>
                <AiOutlineArrowRight className="rounded-full p-2 bg-gray-200 text-black text-4xl  mt-60" />
              </button>
            )}
            className="pb-10"
          >
            {dataLoaded &&
              featuredPosts.map((post, index) => (
                <PostCard key={index} post={post} />
              ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Features;
