import { gql } from '@apollo/client';

export const USER_QUERY = gql`
query userMe {
    user {
      _id
      username
      email
      name
      savedPost {
       description
       address
       dateOfSale
       image
       createdAt
      }
  }
}`;