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
  mutation addPost($description: String!,  $address: String!, $dateOfSale: String!, $image: String, $postName: String!) {
    addPost(description: $description, address: $address, dateOfSale: $dateOfSale, image: $image, postName: $postName) {
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
export const EDIT_POST = gql`
mutation editPost($description: String!,  $address: String!, $dateOfSale: String!, $image: String, $postName: String!) {
  editPost(description: $description, address: $address, dateOfSale: $dateOfSale, image: $image, postName: $postName) {
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
`