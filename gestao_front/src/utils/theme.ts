import { ThemeOptions } from "@mui/material";

const baseTheme: ThemeOptions = {
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
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
    },
  },
};

export default baseTheme;
