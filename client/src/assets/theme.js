import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#4A90E2",
    },
    secondary: {
      main: "#AEDFF7",
    },
    background: {
      default: "#F9FAFB",
    },
    text: {
      primary: "#003371",
    },
  },
  typography: {
    fontFamily: "Bebas Neue",
  },
});

export const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#02CCBA",
    },
    secondary: {
      main: "#2E4057",
    },
    background: {
      default: "#0A192F",
    },
    text: {
      primary: "#CADAEF",
    },
  },
  typography: {
    fontFamily: "Bebas Neue",
  },
});
