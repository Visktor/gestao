import AutocompleteBranches from "#components/Autocompletes/Branches";
import Popup from "#components/Popup";
import useAlertStore from "#context/alert";
import { zscPlansUpsert } from "#schemas/plans";
import { trpcReact } from "#services/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, TextField, Box } from "@mui/material";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";
import { Controller, useForm } from "react-hook-form";

export type PlanUpsertForm = {
  name: string;
  monthly_fee: string;
  duration: string;
  branches: string[];
};

function PlansCreate(
  {
    open,
    close,
    refetchList,
  }: {
    open: boolean;
    close: () => void;
    refetchList: () => void;
  },
  ref: ForwardedRef<{
    reset: (data: PlanUpsertForm) => void;
  }>,
) {
  const { control, handleSubmit, reset } = useForm<PlanUpsertForm>({
    defaultValues: {
      name: "",
      monthly_fee: "",
      duration: "12",
      branches: [],
    },
    resolver: zodResolver(zscPlansUpsert),
  });
  const { alertSuccess, alertError } = useAlertStore();

  const plansUpsertMutation = trpcReact.plans.upsert.useMutation().mutate;
  const submit = handleSubmit((data) =>
    plansUpsertMutation(
      {
        ...data,
        monthly_fee: Number(data.monthly_fee),
        duration: Number(data.duration),
      },
      {
        onSuccess: () => {
          alertSuccess("Plan successfuly created");
          refetchList();
          close();
        },
        onError: () => {
          alertError(
            "There was an error processing your request, try again later.",
          );
        },
      },
    ),
  );

  useImperativeHandle(
    ref,
    () => ({
      reset,
    }),
    [],
  );

  return (
    <Popup
      title="Create Plan"
      open={open}
      onClose={close}
      component="form"
      onSubmit={submit}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => {
              return (
                <TextField
                  label="Name"
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
            name="monthly_fee"
            render={({ field, fieldState }) => {
              return (
                <TextField
                  label="Monthly Fee"
                  type="number"
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
            name="duration"
            render={({ field, fieldState }) => {
              return (
                <TextField
                  label="Duration (months)"
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
            name="branches"
            render={({ field, fieldState }) => {
              return (
                <AutocompleteBranches
                  multiple
                  useIdValue
                  value={field.value}
                  onChange={(_, newValue) => {
                    field.onChange(newValue);
                  }}
                  helperText={fieldState.error?.message}
                  error={!!fieldState.error}
                />
              );
            }}
          />
        </Grid>
      </Grid>
      <Box display="flex" gap={1}>
        <Button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            close();
          }}
          color="error"
        >
          {"CANCEL"}
        </Button>
        <Button type="submit">{"SEND"}</Button>
      </Box>
    </Popup>
  );
}

export default forwardRef(PlansCreate);
