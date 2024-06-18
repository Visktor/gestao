import { set } from "date-fns";
import {
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DesktopTimePicker } from "@mui/x-date-pickers";
import { zscRolesUpsert } from "#schemas/roles";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpcReact } from "#services/server";
import Popup from "#components/Popup";
import useAlertStore from "#context/alert";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";

function RolesCreate(
  {
    open,
    close,
    onMutated,
  }: {
    open: boolean;
    close: () => void;
    onMutated?: () => void;
  },
  ref: ForwardedRef<{
    reset: (data: RoleForm) => void;
  } | null>,
) {
  const { control, handleSubmit, reset } = useForm<RoleForm>({
    defaultValues: {
      permissions: {
        create_user: false,
        update_role: false,
        manage_equipment: false,
        schedule_classes: false,
      },
      salary: "",
      shift_start: set(new Date(), { hours: 9, minutes: 0, seconds: 0 }),
      shift_end: set(new Date(), { hours: 17, minutes: 0, seconds: 0 }),
      name: "",
    },
    resolver: zodResolver(zscRolesUpsert),
    shouldFocusError: true,
  });

  const createRoleCall = trpcReact.roles.upsert.useMutation().mutate;
  const { alertSuccess, alertError } = useAlertStore();

  useImperativeHandle(
    ref,
    () => ({
      reset,
    }),
    [],
  );

  return (
    <Popup
      title="Create Role"
      open={open}
      onClose={close}
      component="form"
      TransitionProps={{
        onExited: () => {
          reset();
        },
      }}
      onSubmit={handleSubmit((data) => {
        createRoleCall(
          { ...data, salary: Number(data.salary) },
          {
            onSuccess: () => {
              alertSuccess("Role successfuly created.");
              onMutated?.();
              close();
            },
            onError: () => {
              alertError(
                "Unexpected error during role criation, try again later.",
              );
            },
          },
        );
      })}
    >
      <Grid container spacing={3} p={1}>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => {
              return (
                <TextField
                  label="Name"
                  onChange={field.onChange}
                  value={field.value}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="salary"
            render={({ field, fieldState }) => {
              return (
                <TextField
                  type="number"
                  label="Salary"
                  onChange={field.onChange}
                  value={field.value}
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
            name="shift_start"
            render={({ field }) => {
              return (
                <DesktopTimePicker
                  value={field.value}
                  onChange={field.onChange}
                  label="Shift Start"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="shift_end"
            render={({ field, fieldState }) => {
              return (
                <DesktopTimePicker
                  value={field.value}
                  onChange={field.onChange}
                  label="Shift End"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!fieldState.error,
                      helperText: fieldState.error?.message,
                    },
                  }}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={12} mt={1}>
          <Divider flexItem orientation="horizontal" />
        </Grid>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={12}>
            <Typography variant="caption" color="primary">
              Permissions
            </Typography>
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="permissions.create_user"
              render={({ field }) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={(_, checked) => {
                          field.onChange(checked);
                        }}
                      />
                    }
                    label="Create User"
                  />
                );
              }}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="permissions.update_role"
              render={({ field }) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={(_, checked) => {
                          field.onChange(checked);
                        }}
                      />
                    }
                    label="Update Role"
                  />
                );
              }}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="permissions.manage_equipment"
              render={({ field }) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={(_, checked) => {
                          field.onChange(checked);
                        }}
                      />
                    }
                    label="Manage Equipment"
                  />
                );
              }}
            />
          </Grid>
          <Grid item>
            <Controller
              control={control}
              name="permissions.schedule_classes"
              render={({ field }) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={(_, checked) => {
                          field.onChange(checked);
                        }}
                      />
                    }
                    label="Schedule Classes"
                  />
                );
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Button type="submit">{"SEND"}</Button>
    </Popup>
  );
}

export type RoleForm = {
  permissions: {
    create_user: boolean;
    update_role: boolean;
    manage_equipment: boolean;
    schedule_classes: boolean;
  };
  salary: string;
  shift_start: Date;
  shift_end: Date;
  name: string;
};

export default forwardRef(RolesCreate);
