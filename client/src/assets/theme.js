import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#2a2a35f2",
    },
    secondary: {
      main: "#66bb6a",
    },
    background: {
      default: "black",
    },
    text: {
      primary: "#2a2a35f2",
    },
  },
  typography: {
    fontFamily: "Roboto",
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
    fontFamily: "Roboto",
  },
});
