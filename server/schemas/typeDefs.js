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
    description: String!
    address: String!
    dateOfSale: String!
    image: String
    postAuthor: String
    postName: String
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
    posts(username: String!): [Post]
    allPost: [Post]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    addPost(description: String!, address: String!, dateOfSale: String!, image: String, postName: String!): Post
    editPost(description: String!, address: String!, dateOfSale: String!, image: String, postName: String!): Post
    removePost(postId: ID!): Post

  }
`;

module.exports = typeDefs;
