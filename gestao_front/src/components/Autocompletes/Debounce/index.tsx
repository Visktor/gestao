import {
  Autocomplete,
  AutocompleteProps,
  InputAdornment,
  TextField,
  TextFieldProps,
  CircularProgress,
  AutocompleteInputChangeReason,
} from "@mui/material";
import useDebounce from "#hooks/useDebounce";
import { ExtractKeysOfType } from "src/@types/util";
import { useState } from "react";

export default function AutocompleteDebounce<
  T extends Record<any, any>,
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
    callback: (debouncedValue: string, abortSignal: AbortSignal) => void;
    timeout?: number;
    error?: boolean;
    pending?: boolean;
  };
  textField?: Omit<TextFieldProps<"outlined">, "variant">;
  valueField: ExtractKeysOfType<T, string | number>;
  labelField: ExtractKeysOfType<T, string>;
}) {
  const [lastInputChangeReason, setLastInputChangeReason] =
    useState<AutocompleteInputChangeReason>("input");

  useDebounce({
    callback: props.debounce.callback,
    error:
      lastInputChangeReason === "reset" ||
      lastInputChangeReason === "clear" ||
      props.debounce.error,
    timeout: props.debounce.timeout,
    depValue: props.autocomplete.inputValue,
  });

  return (
    <Autocomplete
      {...props.autocomplete}
      getOptionLabel={(opt) => opt[props.labelField]}
      isOptionEqualToValue={(opt, val) =>
        opt[props.valueField] === val[props.valueField]
      }
      onInputChange={(e, newValue, reason) => {
        setLastInputChangeReason(reason);
        props.autocomplete.onInputChange(e, newValue, reason);
      }}
      clearOnEscape={false}
      renderInput={
        props.autocomplete.renderInput
          ? props.autocomplete.renderInput
          : (riProps) => {
              return (
                <TextField
                  {...riProps}
                  {...props.textField}
                  variant="outlined"
                  InputProps={
                    props.debounce.pending
                      ? {
                          endAdornment: (
                            <InputAdornment position="end">
                              <CircularProgress size={20} />
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
