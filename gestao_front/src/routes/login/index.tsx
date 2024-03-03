import TextFieldEmail from "#components/TextFields/Email";
import TextFieldPassword from "#components/TextFields/Password";
import { Box, Paper, Grid, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formState, setFormState] = useState({
    email: { value: "", error: false },
    password: { value: "", error: false },
  });

  function formStateChange(
    value: string,
    error: boolean | undefined,
    field: keyof typeof formState,
  ) {
    setFormState((prev) => ({ ...prev, [field]: { value, error: !!error } }));
  }

  const navigator = useNavigate();

  return (
    <Box
      display="flex"
      width="100%"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        minWidth="30vw"
        height="50vh"
        bgcolor="#c4c4c4"
        component={Paper}
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={2}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} display="flex" justifyContent="center">
            <Typography textAlign="center" variant="h6">
              {"GymBoard"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextFieldEmail
              value={formState.email.value}
              error={formState.email.error}
              onChange={(...args) => formStateChange(...args, "email")}
              useOnChangeValidation
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldPassword
              value={formState.password.value}
              error={formState.password.error}
              onChange={(...args) => formStateChange(...args, "password")}
              useOnChangeValidation
            />
          </Grid>
          <Grid item display="flex" justifyContent="center" xs={12}>
            <Button
              variant="contained"
              onClick={() => {
                navigator("/home");
              }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
