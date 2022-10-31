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

export const ADD_ARTICLE = gql`
  mutation AddArticle(
    $title: String!
    $content: String!
    $category_id: Int!
    $userId: String!
  ) {
    insert_articles(
      objects: {
        title: $title
        content: $content
        category_id: $category_id
        userId: $userId
      }
    ) {
      returning {
        id
        title
        content
        view
        category_id
        userId
        created_at
      }
    }
  }
`;
