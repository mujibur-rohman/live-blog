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

export const ADD_FOLLOWERS = gql`
  mutation Following($userId: String!, $follower: String!) {
    insert_followers(objects: { userId: $userId, follower: $follower }) {
      returning {
        userId
        follower
      }
    }
  }
`;

export const UNFOLLOW = gql`
  mutation Unfollow($userId: String!, $follower: String!) {
    delete_followers(
      where: { userId: { _eq: $userId }, follower: { _eq: $follower } }
    ) {
      returning {
        userId
        follower
      }
    }
  }
`;
