import { gql } from '@apollo/client';

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

export const UPDATE_VIEW = gql`
  mutation UpdateView($id: Int!) {
    update_articles(where: { id: { _eq: $id } }, _inc: { view: 1 }) {
      returning {
        id
        title
        view
      }
    }
  }
`;

export const UPDATE_ARTICLE = gql`
  mutation UpdateArticle(
    $id: Int!
    $title: String!
    $category_id: Int!
    $content: String!
  ) {
    update_articles(
      where: { id: { _eq: $id } }
      _set: { title: $title, content: $content, category_id: $category_id }
    ) {
      returning {
        id
        title
        view
      }
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($id: Int!) {
    delete_comments(where: { articleId: { _eq: $id } }) {
      returning {
        id
      }
    }
    delete_articles_by_pk(id: $id) {
      id
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment(
    $articleId: Int!
    $displayName: String!
    $body: String!
    $photoURL: String!
  ) {
    insert_comments(
      objects: {
        articleId: $articleId
        displayName: $displayName
        body: $body
        photoURL: $photoURL
      }
    ) {
      returning {
        displayName
        body
        created_at
        photoURL
      }
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation AddCategory($name: String!) {
    insert_categories(objects: { name: $name }) {
      returning {
        id
        name
      }
    }
  }
`;
