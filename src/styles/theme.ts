import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    blue: {
      900: "#0A111F",
      500: "#52D6DD",
    },
    white: {
      100: "#F6F7F7",
    },
    orange: {
      500: "#F65333",
    },
    red: {
      700: "#9F4D55",
    },
  },
  fonts: {
    heading: "Poller One, cursive",
    body: "Rubik, sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "blue.900",
        color: "white.100",
      },
    },
  },
});
