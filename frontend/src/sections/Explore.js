import React, { useState, useEffect } from "react";
import Carousel from "nuka-carousel";
import { CategoriesPostCard } from "../components/index";
import { getPosts } from "../services";
import {Link} from 'react-router-dom';

const Explore = () => {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    // getFeaturedPosts().then((result) => {
    //   setFeaturedPosts(result);
    //   setDataLoaded(true);
    // });
    getPosts(4).then((result) => {
      setFeaturedPosts(result);
      setDataLoaded(true);
    });
  }, []);

  return (
    <div className="text-black mt-20 px-20">
      <h3 className="text-5xl font-semibold">Explore <Link to="/blog/post/all"><span className="text-3xl text-[#E94C60]">(See All)</span></Link> </h3>
      <Carousel
        wrapAround={true}
        slidesToShow={2}
        animation={"scroll"}
        autoplay={true}
        autoplayInterval={5000}
        speed={2000}
        renderCenterLeftControls={false}
        renderCenterRightControls={false}
        className="pt-10 pb-10"
      >
        {dataLoaded &&
          featuredPosts.map((post, index) => (
            <CategoriesPostCard key={index} post={post} />
          ))}
      </Carousel>
    </div>
  );
};

export default Explore;
