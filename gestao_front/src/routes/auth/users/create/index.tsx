import Popup from "#components/Popup";
import TextFieldEmail from "#components/TextFields/Email";
import { Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zscUsersUpsert } from "#schemas/users";
import { trpcReact } from "#services/server";
import AutocompleteBranches from "#components/Autocompletes/Branches";

export default function UserUpsertPopup({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  const { control, handleSubmit, reset } = useForm<{
    email: string;
    username: string;
    first_name: string;
    last_name: string;
    address: string;
    branch: { branch_id: string; name: string } | null;
  }>({
    resolver: zodResolver(zscUsersUpsert),
    defaultValues: {
      email: "",
      username: "",
      first_name: "",
      last_name: "",
      address: "",
      branch: null,
    },
  });

  const submit = trpcReact.users.upsert.useMutation().mutate;

  return (
    <Popup
      open={open}
      title={"Create User"}
      onClose={() => {
        close();
      }}
      onTransitionExited={() => {
        reset();
      }}
      keepMounted={false}
      component="form"
      onSubmit={handleSubmit((data) => {
        if (!data.branch) {
          return;
        }
        const branch_id = data.branch.branch_id;
        submit(
          { ...data, branch_id: branch_id, role_id: "" },
          {
            onSuccess: () => { },
          },
        );
      })}
    >
      <Grid container spacing={1}>
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
        <Grid item xs={6}>
          <Controller
            control={control}
            name="branch"
            render={({ field }) => {
              return (
                <AutocompleteBranches
                  value={field.value}
                  onChange={(_, newValue) => field.onChange(newValue)}
                />
              );
            }}
          />
        </Grid>
      </Grid>
      <Button variant="contained" onClick={() => { }}>
        {"SEND"}
      </Button>
    </Popup>
  );
}
