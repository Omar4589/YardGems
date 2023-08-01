import { gql } from '@apollo/client';

export const USER_QUERY = gql`
query userMe {
    me {
      _id
      username
      email
      userPosts {
        _id
       postDescription
       address
       dateOfSale
       image
       postName
       lat
       lng
       createdAt
      }
      savedFavorites {
        _id
        postDescription
        address
        dateOfSale
        image
        postAuthor
        postName
      }
    }
  }
`;

export const QUERY_POSTS = gql`
  query getPosts {
    allPost {
      _id
      postDescription
      address
      dateOfSale
      image
      postAuthor
      postName
      lat
      lng
      createdAt
    }
  }
`;
export const QUERY_SINGLE_POST= gql`
  query getSinglePost($listingId: ID!) {
    post(listingId: $listingId) {
      _id
      postDescription
      address
      dateOfSale
      image
      postAuthor
      postName
      lat
      lng
      createdAt
    }
  }
`;
