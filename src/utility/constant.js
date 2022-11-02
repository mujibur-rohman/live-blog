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

export const GET_ALL_ARTICLES = gql`
  subscription GetAllArticles {
    articles(order_by: { id: desc }) {
      id
      title
      content
      view
      created_at
      category {
        id
        name
      }
      user {
        id
        photoURL
        email
        displayName
      }
      comments {
        id
      }
    }
  }
`;

export const GET_ARTICLES_BY_CATEGORY = gql`
  subscription GetAllArticlesCat($cat: String!) {
    articles(
      order_by: { id: desc }
      where: { category: { name: { _eq: $cat } } }
    ) {
      id
      title
      content
      view
      created_at
      category {
        id
        name
      }
      user {
        id
        photoURL
        email
        displayName
      }
      comments {
        id
      }
    }
  }
`;

export const GET_POPULAR_ARTICLES = gql`
  subscription GetArticlesPopular {
    articles(order_by: { view: desc }, limit: 5) {
      id
      title
      content
      view
      created_at
      user {
        id
        photoURL
        email
        displayName
      }
      comments {
        id
      }
      category {
        id
        name
      }
    }
  }
`;

export const GET_NEWEST_ARTICLES = gql`
  subscription GetNewestArticles {
    articles(limit: 4, order_by: { id: desc }) {
      id
      title
      content
      view
      created_at
      user {
        id
        photoURL
        email
        displayName
      }
      comments {
        id
      }
      category {
        id
        name
      }
    }
  }
`;

export const GET_MY_ARTICLES = gql`
  subscription GetMyArticles($uid: String!) {
    articles(order_by: { id: desc }, where: { user: { id: { _eq: $uid } } }) {
      id
      title
      content
      view
      created_at
      user {
        id
        photoURL
        email
        displayName
      }
      comments {
        id
      }
      category {
        id
        name
      }
    }
  }
`;
