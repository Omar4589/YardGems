const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    savedPost: [Post]
  }

  type Post {
    _id: ID
    description: String!
    address: String!
    dateOfSale: String!
    image: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    user: User
    # will return an array of post made from the user
    post(username: String!): [Post]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth
    addPost(description: String!,  address: String!, dateOfSale: String!, image: String): Post
  }
`;

module.exports = typeDefs;
