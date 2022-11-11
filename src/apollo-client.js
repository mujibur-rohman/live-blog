import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({
  uri: 'https://dynamic-cicada-64.hasura.app/v1/graphql',
  headers: {
    'x-hasura-admin-secret':
      'JtGJ1NxBKd0llSOnw3pj2oOnlPy07Cv0V6Z1Tsw0al3PgdcHdeq8zlzzaSQVlEWu',
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'wss://dynamic-cicada-64.hasura.app/v1/graphql',
    connectionParams: {
      headers: {
        'x-hasura-admin-secret':
          'JtGJ1NxBKd0llSOnw3pj2oOnlPy07Cv0V6Z1Tsw0al3PgdcHdeq8zlzzaSQVlEWu',
      },
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
