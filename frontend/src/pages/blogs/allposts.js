import React, {useState, useEffect} from 'react';
import { getPosts } from '../../services';
import PostCard  from '../../components/Post';
import Header  from '../../components/Header';
import Footer  from '../../components/Footer';

const AllPosts = () => {
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
      getPosts().then(result => {
          setPosts(result)
      })
  }, [])

  return (
    <>
      {/* <Head>
        <title>{categoryPost.name} category blog posts - eveIT</title>
        <meta name="description" content={categoryPost.description} />
        <meta name="keywords" content={categoryPost.keywords} />
      </Head> */}

      <Header />
      {
        posts && posts.length > 0 ? <>
            <div className="container mx-auto px-10 pt-28">
                <div className="w-full">
                    <div className="w-full lg:w-3/4  mx-auto">
                        {posts.map((post, index) => (
                        <PostCard key={index} post={post} />
                        ))}
                    </div>
                </div>
            </div>
        </> : <div className="flex justify-center items-center w-full h-flex">
            <h3 className="text-2xl text-center"> Loading....</h3>
        </div>
      }
      <Footer />
    </>
  );
};
export default AllPosts;
