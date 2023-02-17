import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.REACT_APP_GCMS_URL;

export const getPosts = async (limit) => {
  const query = gql`
    query GetPosts {
      posts (${limit ? ('first: ' + limit) : ''}) {
        title
        slug
        createdAt
        featuredImage {
          url
        }
        createdBy {
          name
          picture
        }
        keywords
        excerpt
      }
    }
  `;

  const result = await request(graphqlAPI, query);
  return result.posts;
};
 
export const getFeaturedPosts = async () => {
  const query = gql`
    query GetFeaturedPosts() {
      posts(where: {featuredPost: true}
        orderBy: createdAt_DESC
        first: 4) {
        
        featuredImage {
          url
        }
        title
        slug
        excerpt
        createdAt
        
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};

export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        keywords
        featuredImage {
          url
        }
        author{
          name
          bio
          degree
          photo { url }
        }
        createdAt
        slug
        content {
          raw
        }
       
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

export const submitComment = async (obj) => {
  const result = await fetch(process.env.REACT_APP_API_URL + '/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  return result.json();
};

export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug:String!) {
      comments(where: {post: {slug:$slug}}){
        name
        createdAt
        comment
      }
    }
  `;
  const result = await request(graphqlAPI, query, { slug });
  return result.comments;
};