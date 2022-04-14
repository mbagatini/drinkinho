import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

import { theme } from "../styles/theme";
import { FiltersProvider } from "../hooks/useFilters";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <FiltersProvider>
          <Component {...pageProps} />
        </FiltersProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
