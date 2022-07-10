import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";

const httplLink = createHttpLink({
  uri: "http://localhost:3332/graphql",
  fetch,
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: from([httplLink]),
  cache,
});
