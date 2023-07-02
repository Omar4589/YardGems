import { gql } from '@apollo/client';

export const USER_QUERY = gql`
query userMe {
    user {
      _id
      username
      email
      savedPost {
       description
       address
       dateOfSale
       image
       createdAt
      }
  }
}`;

export const QUERY_POSTS = gql`
  query getPosts {
    posts {
      _id
      description
      address
      dateOfSale
      image
      postAuthor
      createdAt
    }
  }
`;
