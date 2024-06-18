import Popup from "#components/Popup";
import { Button, Grid, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zscUsersUpsert } from "#schemas/users";
import { trpcReact } from "#services/server";
import AutocompleteBranches from "#components/Autocompletes/Branches";
import AutocompleteRoles from "#components/Autocompletes/Roles";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import useAlertStore from "#context/alert";
import { useCallback } from "react";

export type UserUpsertForm = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  address: string;
  branch_id: string;
  role_id: string;
  user_id?: string;
};

function UserUpsertPopup(
  {
    open,
    close,
    onSuccess,
  }: {
    open: boolean;
    close: () => void;
    onSuccess?: () => void;
  },
  ref: ForwardedRef<{ reset: (data: UserUpsertForm) => void }>,
) {
  const { control, reset, handleSubmit } = useForm<UserUpsertForm>({
    resolver: zodResolver(zscUsersUpsert),
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      username: "",
      first_name: "",
      last_name: "",
      address: "",
      branch_id: "",
      role_id: "",
    },
  });

  const { alertError, alertSuccess } = useAlertStore();
  const userUpsertMutation = trpcReact.users.upsert.useMutation().mutate;

  const formSubmitHandler = useCallback(
    handleSubmit((data) => {
      userUpsertMutation(data, {
        onSuccess: () => {
          alertSuccess(
            `User successfuly ${data.user_id ? "altered" : "created"}.`,
          );
          close();
          onSuccess?.();
        },
        onError: () => {
          alertError(
            "There's been an error processing your request. Try again later.",
          );
        },
      });
    }),
    [],
  );

  useImperativeHandle(
    ref,
    () => ({
      reset: (data) => {
        reset(data);
      },
    }),
    [],
  );

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
      onSubmit={formSubmitHandler}
    >
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState }) => {
              return (
                <TextField
                  label="Email"
                  value={field.value}
                  onChange={field.onChange}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
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
                  helperText={fieldState.error?.message}
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
                  helperText={fieldState.error?.message}
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
                  helperText={fieldState.error?.message}
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
                  helperText={fieldState.error?.message}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="branch_id"
            render={({ field, fieldState }) => {
              return (
                <AutocompleteBranches
                  value={field.value}
                  useIdValue
                  helperText={fieldState.error?.message}
                  error={!!fieldState.error}
                  onChange={(_, newValue) => {
                    field.onChange(newValue ?? "");
                  }}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="role_id"
            render={({ field }) => {
              return (
                <AutocompleteRoles
                  useIdValue
                  value={field.value}
                  onChange={(_, newValue) => {
                    field.onChange(newValue ?? "");
                  }}
                />
              );
            }}
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained">
        {"SEND"}
      </Button>
    </Popup>
  );
}

export default forwardRef(UserUpsertPopup);
