"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry(failureCount, error) {
            if (error instanceof Error) {
              if (error.message.includes("Network Error")) {
                return false;
              }
            }
            if (failureCount > 3) {
              return false;
            }
            return true;
          },
          staleTime: 3 * (60 * 1000), // 3 minutes
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
    </QueryClientProvider>
  );
}

export default ReactQueryProvider;
