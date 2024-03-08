import { createTheme } from "@mui/material";
import baseTheme from "./theme";

const muiDarkTheme = createTheme({
  ...baseTheme,
  palette: {
    mode: "dark",
    primary: {
      main: "#415BF0",
    },
    secondary: {
      main: "#f50057",
    },
  },
});
export default muiDarkTheme;
