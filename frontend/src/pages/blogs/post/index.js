import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
// import { useRouter } from 'next/router';
import MetaTags from 'react-meta-tags';

import { PostDetail,  Comments, CommentsForm, Author } from '../../../components';
import { getPostDetails } from '../../../services/index';
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

const PostDetails = (props) => {
  // const { post } = props
  const params = useParams();
  const {slug} = params;
  const [post, setPost] = useState(null)
  useEffect(() => {
    getPostDetails(slug).then(res => {
      setPost(res)
    })
  }, [slug])

  return (
    <>
     
      <Header />
      {
        post ? 
        <>
        <MetaTags>
      
     <title> {post.title}</title>
     <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.keywords} />
      
</MetaTags>
        
        <div className="container mx-auto px-10  pt-40 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            <CommentsForm slug={post.slug} />
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:top-8">
              <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
                <h1 className='text-xl mb-8 font-semibold border-b pb-4'>WELCOME</h1>
                <p className='pb-4 text-justify'>{post.excerpt}</p>
               
              </div>
             {/*} <PostWidget slug={post.slug} categories={post.categories.map((category) => category.slug)} />{/*}
            {/*}  <SideCategories />*/}
            </div>
          </div>
        </div>
      </div> 
      </>
      : <div className="w-full h-full flex justify-center items-center">
        <span className="text-lg">Loading...</span>
      </div>
      }
      <Footer />
    </>
  );
};
export default PostDetails;

export async function getServerSideProps({ params }) {
  const data = await getPostDetails(params.slug);
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      post: data,
    },
  };
}
