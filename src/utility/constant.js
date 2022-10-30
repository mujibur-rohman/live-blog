import { gql } from '@apollo/client';

export const ADD_USERS = gql`
  mutation AddUser(
    $id: String!
    $displayName: String!
    $email: String!
    $photoURL: String!
  ) {
    insert_users(
      objects: {
        id: $id
        displayName: $displayName
        email: $email
        photoURL: $photoURL
      }
    ) {
      returning {
        id
        displayName
        email
        photoURL
      }
    }
  }
`;
