import {
  Autocomplete,
  AutocompleteProps,
  InputAdornment,
  TextField,
  TextFieldProps,
  CircularProgress,
} from "@mui/material";
import useDebounce from "src/hooks/useDebounce";

export default function AutocompleteDebounce<
  T,
  M extends boolean,
  DC extends boolean,
>(props: {
  autocomplete: Omit<
    AutocompleteProps<T, M, DC, false, any>,
    "inputValue" | "onInputChange" | "renderInput"
  > & {
    inputValue: Exclude<
      AutocompleteProps<T, M, DC, false, any>["inputValue"],
      undefined
    >;
    onInputChange: Exclude<
      AutocompleteProps<T, M, DC, false, any>["onInputChange"],
      undefined
    >;
    renderInput?: AutocompleteProps<T, M, DC, false, any>["renderInput"];
  };
  debounce: {
    callback: () => void;
    timeout?: number;
    error?: boolean;
    pending?: boolean;
  };
  textField?: TextFieldProps<"outlined">;
}) {
  useDebounce({
    callback: props.debounce.callback,
    error: props.debounce.error,
    timeout: props.debounce.timeout,
    depValue: props.autocomplete.inputValue,
  });

  return (
    <Autocomplete
      {...props.autocomplete}
      renderInput={
        props.autocomplete.renderInput
          ? props.autocomplete.renderInput
          : (riProps) => {
            return (
              <TextField
                {...riProps}
                {...props.textField}
                InputProps={
                  props.debounce.pending ||
                    !props.autocomplete.options?.length
                    ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <CircularProgress />
                        </InputAdornment>
                      ),
                    }
                    : riProps.InputProps
                }
              />
            );
          }
      }
    />
  );
}
