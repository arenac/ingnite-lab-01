import { GetServerSidePropsContext, NextPage } from "next";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

export type ApolloClientContext = GetServerSidePropsContext;

export function getApolloClient(
  _context?: ApolloClientContext,
  ssrCache?: NormalizedCacheObject
) {
  const httplLink = createHttpLink({
    uri: "http://localhost:3332/graphql",
    fetch,
  });

  const cache = new InMemoryCache().restore(ssrCache ?? {});

  return new ApolloClient({
    link: from([httplLink]),
    cache,
  });
}

export const withApollo = (Component: NextPage) => {
  return function Provider(props: any) {
    return (
      <ApolloProvider client={getApolloClient(undefined, props.apolloState)}>
        <Component {...props} />
      </ApolloProvider>
    );
  };
};
