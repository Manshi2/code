const express = require( 'express' );
const { GraphQLClient, gql } = require('graphql-request');

const graphqlAPI = process.env.GRAPHCMS_ENDPOINT;
const router = express.Router();

const graphQLClient = new GraphQLClient((graphqlAPI), {
  headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});


router.post('/comments', async (req, res) => {
  try{
    const query = gql`
      mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
        createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}) { id }
      }
    `;
    
    const result = await graphQLClient.request(query, {
      name: req.body.name,
      email: req.body.email,
      comment: req.body.comment,
      slug: req.body.slug,
    });

    console.log(result)
    res.status(200).send(result);
  }catch(err) {
    console.log(err)
    res.status(500).json({msg: 'Failed to fetch comments!'})
  }
})

module.exports = router;