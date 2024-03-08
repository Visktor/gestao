import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import Routes from "./routes";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpcReact } from "#services/server";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import useThemeStore from "#context/theme";
import muiLightTheme from "#utils/lightTheme";
import muiDarkTheme from "#utils/darkTheme";

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
  const { currentTheme } = useThemeStore();

  return (
    <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          theme={currentTheme === "light" ? muiLightTheme : muiDarkTheme}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <RouterProvider router={Routes} />
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </trpcReact.Provider>
  );
}

export default App;
