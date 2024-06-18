import Popup from "#components/Popup";
import { trpcReact } from "#services/server";
import { Box, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { branchesUpsertInput } from "#schemas/branches";
import TextFieldHookForm from "#components/TextFields/HookForm";
import useAlertStore from "#context/alert";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";

export type BranchUpsertForm = {
  name: string;
  city: string;
  neighborhood: string;
  street: string;
  state: string;
};

function BranchUpsertPopup(
  {
    open,
    close,
    onRegistered,
  }: {
    open: boolean;
    close: () => void;
    onRegistered?: () => void;
  },
  ref: ForwardedRef<{
    reset: (data: Partial<BranchUpsertForm>) => void;
  }>,
) {
  const { control, handleSubmit, reset } = useForm<BranchUpsertForm>({
    defaultValues: {
      name: "",
      city: "",
      neighborhood: "",
      street: "",
      state: "",
    },
    resolver: zodResolver(branchesUpsertInput),
  });

  const branchMutation = trpcReact.branches.upsert.useMutation();
  const { alertError, alertSuccess } = useAlertStore();

  useImperativeHandle(
    ref,
    () => ({
      reset,
    }),
    [],
  );

  return (
    <Popup
      title="Create Branch"
      open={open}
      onClose={close}
      component="form"
      onSubmit={handleSubmit((data) => {
        branchMutation.mutate(data, {
          onSuccess: () => {
            close();
            alertSuccess("Branch Successfully created.");
            onRegistered?.();
          },
          onError: () => {
            alertError(
              "There was an error processing your request. Try again later.",
            );
          },
        });
      })}
    >
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextFieldHookForm control={control} name="name" label="Name" />
        </Grid>
        <Grid item xs={6}>
          <TextFieldHookForm control={control} name="city" label="City" />
        </Grid>
        <Grid item xs={6}>
          <TextFieldHookForm
            control={control}
            name="neighborhood"
            label="Neighborhood"
          />
        </Grid>
        <Grid item xs={6}>
          <TextFieldHookForm control={control} label="Street" name="street" />
        </Grid>
        <Grid item xs={6}>
          <TextFieldHookForm control={control} name="state" label="State" />
        </Grid>
      </Grid>
      <Box mt="auto" ml="auto">
        <Button type="submit" variant="contained">
          {"SEND"}
        </Button>
      </Box>
    </Popup>
  );
}
export default forwardRef(BranchUpsertPopup);
