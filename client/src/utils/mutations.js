import { gql } from '@apollo/client';

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
export const ADD_POST = gql`
  mutation addPost($description: String!,  $address: String!, $dateOfSale: String!, $image: String) {
    addPost(description: $description, address: $adress, dateOfSale: $dateOfSale, image: $image ) {
      _id
      description
      address
      dateOfSale
      image
      createdAt
    }
  }
`;