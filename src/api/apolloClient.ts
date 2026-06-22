import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
} from "@apollo/client/core";
import { SetContextLink } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import type { ApolloLink } from "@apollo/client/link";

export const TOKEN_KEY = "hd_access_token";

const httpLink = createHttpLink({
  uri: "/graphql",
});

/* In Apollo Client v4 the ContextSetter receives (prevContext, operation) */
const authLink = new SetContextLink((prevContext) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const existing = (prevContext as Record<string, unknown>)["headers"] as
    | Record<string, string>
    | undefined;
  return {
    headers: {
      ...existing,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
});

/* In Apollo Client v4 onError receives { error } not { graphQLErrors, networkError } */
const errorLink = onError(({ error }) => {
  if (!error) return;
  const msg = error.message ?? String(error);

  /* CombinedGraphQLErrors carries an extensions property */
  const code = (error as { extensions?: { code?: string } }).extensions?.code;
  if (code === "AUTHENTICATION_REQUIRED") {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/login";
  }

  console.error(`[Apollo Error]: ${msg}`);
}) as unknown as ApolloLink;

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            keyArgs: ["filter", "sort"],
            merge(_existing: unknown, incoming: unknown) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: { fetchPolicy: "cache-and-network" },
    query: { fetchPolicy: "network-only" },
  },
});
