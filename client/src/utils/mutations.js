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
  mutation addPost($postDescription: String,  $address: String, $dateOfSale: String, $image: String, $postName: String, $lat: Float, $lng: Float) {
    addPost(postDescription: $postDescription, address: $address, dateOfSale: $dateOfSale, image: $image, postName: $postName, lat: $lat, lng: $lng) {
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
export const EDIT_POST = gql`
mutation editPost($id: ID, $postDescription: String,  $address: String, $dateOfSale: String, $image: String, $postName: String, $lat: Float, $lng: Float) {
  editPost(id: $id, postDescription: $postDescription, address: $address, dateOfSale: $dateOfSale, image: $image, postName: $postName,lat: $lat, lng: $lng) {
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
`
export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
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
