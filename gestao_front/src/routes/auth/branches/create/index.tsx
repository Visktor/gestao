import Popup from "#components/Popup";
import { trpcReact } from "#services/server";
import { Box, Button, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { branchesUpsertInput } from "#schemas/branches";
import TextFieldHookForm from "#components/TextFields/HookForm";

export default function BranchUpsertPopup({
  open,
  close,
}: {
  open: boolean;
  close: () => void;
}) {
  const { control, handleSubmit } = useForm({
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

  return (
    <Popup
      title="Create Branch"
      open={open}
      onClose={close}
      component="form"
      onSubmit={handleSubmit((data) => {
        branchMutation.mutate(data, {
          onSuccess: () => {},
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
