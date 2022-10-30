import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://dynamic-cicada-64.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    'x-hasura-admin-secret':
      'JtGJ1NxBKd0llSOnw3pj2oOnlPy07Cv0V6Z1Tsw0al3PgdcHdeq8zlzzaSQVlEWu',
  },
});

export default client;
