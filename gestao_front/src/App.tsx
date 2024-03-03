import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Routes from "./routes";
import "./App.css";
import MuiTheme from "#utils/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpcReact } from "#services/server";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpcReact.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3334/trpc",
          async headers() {
            return {};
          },
        }),
      ],
    }),
  );

  return (
    <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={MuiTheme}>
          <RouterProvider router={Routes} />
        </ThemeProvider>
      </QueryClientProvider>
    </trpcReact.Provider>
  );
}

export default App;
