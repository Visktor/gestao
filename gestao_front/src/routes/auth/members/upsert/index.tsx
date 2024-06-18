import Popup from "#components/Popup";
import { Controller, useForm } from "react-hook-form";
import { Grid, TextField, MenuItem, Box, Button } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import AutocompleteBranches, {
  BranchSelect,
} from "#components/Autocompletes/Branches";
import AutocompletePlans from "#components/Autocompletes/Plans";
import { zodResolver } from "@hookform/resolvers/zod";
import { zscMembersUpsert } from "#schemas/members";
import { trpcReact } from "#services/server";
import { z } from "zod";

export default function MembersUpsert({
  open,
  close,
  onSuccess,
}: {
  open: boolean;
  close: () => void;
  onSuccess?: () => void;
}) {
  const { control, handleSubmit } = useForm<{
    member_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    join_date: Date;
    branch_id: BranchSelect | null;
    plan_id: string;
    status: 0 | 1 | 2;
  }>({
    defaultValues: {
      member_id: "",
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      join_date: new Date(),
      branch_id: null,
      plan_id: "",
      status: 0,
    },
    mode: 'onChange',
    resolver: zodResolver(zscMembersUpsert),
  });

  const memberUpsertMutate = trpcReact.members.upsert.useMutation().mutate;
  const handleSendButton = handleSubmit((data) =>
    memberUpsertMutate(data as z.input<typeof zscMembersUpsert>, {
      onSuccess: () => {
        onSuccess?.();
      },
    }),
  );

  return (
    <Popup
      title=""
      open={open}
      onClose={() => {
        close();
      }}
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
            name="first_name"
            render={({ field, fieldState }) => {
              return (
                <TextField
                  label="First Name"
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
            name="last_name"
            render={({ field, fieldState }) => {
              return (
                <TextField
                  label="Last Name"
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
            name="phone_number"
            render={({ field, fieldState }) => {
              return (
                <TextField
                  label="Phone Number"
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
            name="join_date"
            render={({ field, fieldState }) => {
              return (
                <DesktopDatePicker
                  value={field.value}
                  onChange={field.onChange}
                  label={"Join Date"}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      helperText: fieldState.error?.message,
                      error: !!fieldState.error,
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
            name="branch_id"
            render={({ field, fieldState }) => {
              return (
                <AutocompleteBranches
                  helperText={fieldState.error?.message}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  error={!!fieldState.error}
                  value={field.value}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="plan_id"
            render={({ field, fieldState }) => {
              return (
                <AutocompletePlans
                  helperText={fieldState.error?.message}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  error={!!fieldState.error}
                  value={field.value}
                  useIdValue
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="status"
            render={({ field, fieldState }) => {
              return (
                <TextField
                  label="Status"
                  value={field.value}
                  onChange={field.onChange}
                  helperText={fieldState.error?.message}
                  error={!!fieldState.error}
                >
                  <MenuItem value={0}>{"ACTIVE"}</MenuItem>
                  <MenuItem value={1}>{"INACTIVE"}</MenuItem>
                  <MenuItem value={2}>{"CANCELLED"}</MenuItem>
                </TextField>
              );
            }}
          />
        </Grid>
      </Grid>
      <Box width="100%" display="flex" justifyContent="end">
        <Button
          onClick={() => {
            handleSendButton();
          }}
        >
          SEND
        </Button>
      </Box>
    </Popup>
  );
}
