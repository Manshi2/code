import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { getPosts } from "../../services";
import { IoClose } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { FeaturedPosts, Features, Explore } from "../../sections/index";
import MetaTags from 'react-meta-tags';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    getPosts().then((result) => {
      setPosts(result);
    });
  }, []);

  const [filterValue, setFilterValue] = useState([]);
  // console.log(filterValue)

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    console.log(posts)
    const filterArray = posts.filter((post) => {
      return post.title
        .toLowerCase()
        .includes(searchValue.toLowerCase())
        // .includes(searchValue.toLowerCase());
    });
    if (searchValue === "") {
      setFilterValue([]);
    } else {
      setFilterValue(filterArray);
    }
  };

  return (
    <>
    <MetaTags> 
                <title>CareNest - Blog</title>
      </MetaTags>
      <div className="App ">
        <Header />
        <div className="flex px-10 lg:px-20 mt-10 md:mr-4 inline-flex">
          <div className=" ">
            <button
              className="float-left w-20 h-20 "
              onClick={() => setShowModal(true)}
            >
              <AiOutlineSearch className=" rounded-full w-12 h-12 p-2 bg-[#E94C60] text-white" />
            </button>
            {showModal ? (
              <>
                <div className="flex bg-white rounded-lg ml-2 mt-4 float-left ">
                  <div className="rounded-lg  flex flex-inline pt-1 pl-1">
                    <input
                      type="text"
                      placeholder="Search ...."
                      onChange={handleSearch}
                      className=" h-8 pl-2 "
                    />

                    <IoClose
                      className="text-gray-600 text-3xl text-right cursor-pointer pt-1"
                      onClick={() => {setShowModal(false); setFilterValue([])}}
                    />
                  </div>
                  {filterValue.length !== 0 ? null : ""}
                  <div className=" rounded-lg border-2">
                    {filterValue.length !== 0 &&
                      filterValue.map((e, i) => {
                        return (
                          <div key={`searchResult${i}`} className="w-full p-2 hover:bg-primary">
                            <Link to={`/blog/post/${e.slug}`}>
                              {e.title}
                            </Link>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
        <div>
          {/* {filterValue ? <>
            ul.
          </> : null} */}
          <FeaturedPosts />
          <Features />
          <Explore />
        </div>
        <Footer />
      </div>
    </>
  );
}
