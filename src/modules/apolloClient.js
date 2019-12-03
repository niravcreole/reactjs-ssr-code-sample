import ApolloClient, { createNetworkInterface } from 'apollo-client';

const networkInterface = createNetworkInterface({
  uri:
    process.env.REACT_APP_RWS_GRAPHQL_URL || 'https://api.abb.com.au/graphql',
});

const client = new ApolloClient({ networkInterface });

export default client;
