import { gql } from '@apollo/client';

export const GET_FOLLOWERS = gql`
  subscription GetFollowers($uid: String!) {
    followers(where: { userId: { _eq: $uid } }) {
      id
      follower
    }
  }
`;
