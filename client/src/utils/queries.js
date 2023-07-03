import { gql } from '@apollo/client';

export const USER_QUERY = gql`
query userMe {
    me {
      _id
      username
      email
      savedPost {
       description
       address
       dateOfSale
       image
       postName
       createdAt
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query getPosts {
    allPost {
      _id
      description
      address
      dateOfSale
      image
      postAuthor
      postName
      createdAt
    }
  }
`;
