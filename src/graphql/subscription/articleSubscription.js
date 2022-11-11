import { gql } from '@apollo/client';

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

export const GET_ARTICLES_BY_FOLLOWERS = gql`
  subscription GetArticlesByFollowers($uid: String!) {
    articles(
      where: { user: { followers: { follower: { _eq: $uid } } } }
      order_by: { id: desc }
    ) {
      id
      title
      content
      view
      user {
        id
        displayName
        email
        photoURL
      }
      created_at
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

export const SEARCH_ARTICLES = gql`
  subscription SearchArticles($title: String = "%%", $content: String = "%%") {
    articles(
      order_by: { id: desc }
      where: {
        _or: { title: { _ilike: $title }, content: { _ilike: $content } }
      }
    ) {
      id
      title
      content
      view
      created_at
      user {
        id
        displayName
        email
        photoURL
      }
      category {
        id
        name
      }
      comments {
        id
      }
    }
  }
`;

export const CATEGORIES = gql`
  subscription GetCategories($limit: Int) {
    categories(limit: $limit, order_by: { name: asc }) {
      id
      name
    }
  }
`;

export const ARTICLE_DETAIL = gql`
  subscription ArticleDetail($id: Int!) {
    articles_by_pk(id: $id) {
      id
      title
      content
      view
      created_at
      user {
        id
        displayName
        photoURL
      }
      category {
        id
        name
      }
      comments {
        displayName
        body
        created_at
        photoURL
      }
    }
  }
`;

export const CATEGORIES_POPULAR = gql`
  subscription GetCategories($limit: Int = 5) {
    categories(
      order_by: { articles_aggregate: { count: desc } }
      limit: $limit
    ) {
      id
      name
    }
  }
`;
