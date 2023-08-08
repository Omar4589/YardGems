import { gql } from '@apollo/client';

export const ME_QUERY = gql`
query userMe {
    me {
      _id
      username
      email
      userPosts {
        _id
       description
       address
       dateOfSale
       image
       title
       lat
       lng
       createdAt
      }
      savedFavorites {
        _id
        description
        address
        dateOfSale
        image
        author
        title
      }
    }
  }
`;

export const QUERY_LISTINGS = gql`
  query getListings {
    allListings {
      _id
      description
      address
      dateOfSale
      image
      author
      title
      lat
      lng
      createdAt
    }
  }
`;
export const QUERY_SINGLE_LISTING= gql`
  query getSingleListing($listingId: ID!) {
    listing(listingId: $listingId) {
      _id
      description
      address
      dateOfSale
      image
      author
      title
      lat
      lng
      createdAt
    }
  }
`;
