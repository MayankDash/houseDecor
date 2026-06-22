import { RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { apolloClient } from "@/api/apolloClient";
import { queryClient } from "@/api/queryClient";
import { router } from "@/routes";

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ApolloProvider>
  );
}
