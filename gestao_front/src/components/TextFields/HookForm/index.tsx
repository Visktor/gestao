import { TextField } from "@mui/material";
import { Controller, Control, Path } from "react-hook-form";

export default function TextFieldHookForm<T extends Record<string, any>>({
  control,
  name,
  label,
}: {
  control: Control<T>;
  name: Path<T>;
  label: string;
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <TextField
            value={field.value}
            onChange={field.onChange}
            helperText={fieldState.error?.message}
            error={!!fieldState.error}
            label={label}
          />
        );
      }}
    />
  );
}
