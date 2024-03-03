import { createTheme } from "@mui/material";

const MuiTheme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
        fullWidth: true,
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: "small",
        fullWidth: true,
      },
    },
  },
});

export default MuiTheme;
