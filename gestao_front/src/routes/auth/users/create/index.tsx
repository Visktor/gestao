import Popup from "#components/Popup";
import TextFieldEmail from "#components/TextFields/Email";
import { Button, Grid, TextField, Box } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zscUsersUpsert } from "#schemas/users";
import { trpcReact } from "#services/server";

export default function UserUpsertPopup({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  const { control, handleSubmit } = useForm({

    resolver: zodResolver(zscUsersUpsert),
    defaultValues: {
      email: "",
      username: "",
      first_name: "",
      last_name: "",
      address: "",
    },
  });

  return (
    <Popup open={open} title={"Create User"} onClose={close}>
      <Grid
        container
        spacing={1}
        component="form"
        onSubmit={handleSubmit((data) => trpcReact.users.upsert.useQuery(data))}
      >
        <Grid item xs={6}>
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => {
              return (
                <TextFieldEmail
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  error={!!fieldState.error}
                  useHookForms
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="username"
            render={({ field, fieldState }) => {
              return (
                <TextField
                  label="Username"
                  {...field}
                  error={!!fieldState.error}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="first_name"
            render={({ field, fieldState }) => {
              return (
                <TextField
                  label="First Name"
                  {...field}
                  error={!!fieldState.error}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="last_name"
            render={({ field, fieldState }) => {
              return (
                <TextField
                  label="Last Name"
                  {...field}
                  error={!!fieldState.error}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="address"
            render={({ field, fieldState }) => {
              return (
                <TextField
                  label="Address"
                  {...field}
                  error={!!fieldState.error}
                />
              );
            }}
          />
        </Grid>
      </Grid>
      <Box mt="auto" ml="auto">
        <Button variant="contained" onClick={() => { }}>
          {"SEND"}
        </Button>
      </Box>
    </Popup>
  );
}
