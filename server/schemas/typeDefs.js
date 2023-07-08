const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    savedPost: [Post]
    savedFavorites: [Post]
  }

  type Post {
    _id: ID
    postDescription: String
    address: String
    dateOfSale: String
    image: String
    postAuthor: String
    postName: String
    lat: Float
    lng: Float
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: User
    allUsers: [User]
    allPost: [Post]
    post(listingId: ID!): Post
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    addPost(postDescription: String, address: String, dateOfSale: String, image: String, postName: String, lat: Float, lng: Float): Post
    editPost(id: ID, postDescription: String, address: String, dateOfSale: String, image: String, postName: String, lat: Float, lng: Float): Post
    removePost(postId: ID!): Post
    removeAll: [Post]

  }
`;

module.exports = typeDefs;
