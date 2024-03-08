import { createTheme } from "@mui/material";
import muiBaseTheme from "./theme";

const muiLightTheme = createTheme({
  ...muiBaseTheme,
  palette: {
    mode: "light",
    primary: {
      main: "#4193F0",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

export default muiLightTheme;
