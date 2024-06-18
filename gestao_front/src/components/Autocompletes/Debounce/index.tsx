/**
 * I'm not particularly proud of this component. Since this is an experimental project and it's the
 * first time I'm using TRPC, i've allowed myselft to create some ~tech debt~ here but I'd never ship
 * this to production.
 * */

import {
  Autocomplete,
  AutocompleteProps,
  InputAdornment,
  TextField,
  TextFieldProps,
  CircularProgress,
  AutocompleteInputChangeReason,
  AutocompleteChangeReason,
  AutocompleteValue,
} from "@mui/material";
import useDebounce from "#hooks/useDebounce";
import { ExtractKeysOfType } from "src/@types/util";
import { useState } from "react";

export default function AutocompleteDebounce<
  T extends Record<any, any>,
  VF extends ExtractKeysOfType<T, string | number>,
  M extends boolean = false,
  DC extends boolean = false,
>(props: {
  autocomplete: Omit<
    AutocompleteProps<T, M, DC, false, any>,
    "inputValue" | "onInputChange" | "renderInput" | "value" | "onChange"
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
    value: AutocompleteValue<T, M, DC, false>;
    onChange: (
      e: React.SyntheticEvent<Element, Event>,
      newValue: AutocompleteValue<T, M, DC, false>,
      changeReason: AutocompleteChangeReason,
    ) => void;
  };
  valueField: VF;
  labelField: ExtractKeysOfType<T, string>;
  debounce: {
    callback: (
      debouncedValue: string,
      abortSignal: AbortSignal,
    ) => Promise<T[]>;
    timeout?: number;
    error?: boolean;
    pending?: boolean;
    setOptions: (data: T[]) => void;
  };
  textField?: Omit<TextFieldProps<"outlined">, "variant">;
}) {
  const [lastInputChangeReason, setLastInputChangeReason] =
    useState<AutocompleteInputChangeReason>("input");

  useDebounce({
    callback: async (debouncedV, abortSignal) => {
      const result = await props.debounce.callback(debouncedV, abortSignal);
      if (
        (props.autocomplete.multiple &&
          (props.autocomplete.value as T[]).length) ||
        (!props.autocomplete.multiple && !!props.autocomplete.value)
      ) {
        const previousValue = (
          Array.isArray(props.autocomplete.value)
            ? props.autocomplete.value
            : [props.autocomplete.value]
        ) as T[];

        const previousNotInResult = previousValue.filter(
          (p) =>
            !result.some((r) => r[props.valueField] === p[props.valueField]),
        );
        props.debounce.setOptions([...previousNotInResult, ...result]);
      } else {
        props.debounce.setOptions(result);
      }
    },
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
      inputValue={props.autocomplete.inputValue}
      onChange={(e, newValue, reason) => {
        if (!Array.isArray(newValue)) {
          props.autocomplete.onChange(
            e,
            newValue,
            reason,
          );
        } else {
          props.autocomplete.onChange(
            e,
            newValue,
            reason,
          );
        }
      }}
      getOptionLabel={(opt) => opt[props.labelField]}
      filterOptions={(x) => x}
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
