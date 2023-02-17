require('dotenv').config();
const graphqlAPI = process.env.GRAPHCMS_ENDPOINT;
const fs = require("fs")
const path = require("path")
const { GraphQLClient, gql } = require('graphql-request')

const graphQLClient = new GraphQLClient((graphqlAPI), {
    headers: {
      authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
});

const getPosts = async (limit) => {
  const query = gql`
    query GetPosts {
      posts (${limit ? ('first: ' + limit) : ''}) {
        slug
      }
    }
  `;

  const result = await graphQLClient.request(query);
  return result.posts;
};
 

const base = "https://www.carenest.in";

async function generateSitemap () {

    const posts = await getPosts()

    const xml = `
    <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>${base + "/"}</loc>
        </url>
        <url>
            <loc>${base}/appointment</loc>
        </url>
        <url>
            <loc>${base}/blog</loc>
        </url> 
        <url>
            <loc>${base}/#contact</loc>
        </url> 
        <url>
            <loc>${base}/#services</loc>
        </url> 
        <url>
            <loc>${base}/terms&amp;conditions</loc>
        </url> 
        <url>
            <loc>${base}/privacy</loc>
        </url> 
        <url>
            <loc>${base}/returnpolicy</loc>
        </url>
        ${
          posts?.length > 0 ? posts.map(post => `<url>
            <loc>${base}/blog/post/${post.slug}</loc>
          </url>
          `).join(" ") : ""
        }
    </urlset>
    `
  const sitemapPath1 = "../frontend/build/sitemap.xml"
  const sitemapPath2 = "../frontend/public/sitemap.xml"
  try{
    fs.writeFileSync(sitemapPath1, xml)
    fs.writeFileSync(sitemapPath2, xml)  
  }catch(err){
    console.log(err)
  }
  
  return xml
}

module.exports = generateSitemap