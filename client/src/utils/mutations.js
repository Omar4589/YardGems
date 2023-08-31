import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const UPDATE_USERNAME = gql`
  mutation updateUsername($newUsername: String!) {
    updateUsername(newUsername: $newUsername) {
      _id
      username
    }
  }
`;
export const ADD_LISTING = gql`
  mutation addListing(
    $description: String
    $address: String
    $dateOfSale: String
    $image: String
    $title: String
    $lat: Float
    $lng: Float
  ) {
    addListing(
      description: $description
      address: $address
      dateOfSale: $dateOfSale
      image: $image
      title: $title
      lat: $lat
      lng: $lng
    ) {
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
export const EDIT_LISTING = gql`
  mutation editListing(
    $id: ID
    $description: String
    $address: String
    $dateOfSale: String
    $image: String
    $title: String
    $lat: Float
    $lng: Float
  ) {
    editListing(
      id: $id
      description: $description
      address: $address
      dateOfSale: $dateOfSale
      image: $image
      title: $title
      lat: $lat
      lng: $lng
    ) {
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
export const REMOVE_LISTING = gql`
  mutation removeListing($listingId: ID!) {
    removeListing(listingId: $listingId) {
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

export const ADD_FAVORITES = gql`
  mutation addFavorites($listingId: ID!) {
    addFavorites(listingId: $listingId) {
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
export const REMOVE_FAVORITES = gql`
  mutation removeFavorites($listingId: ID!) {
    removeFavorites(listingId: $listingId) {
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
