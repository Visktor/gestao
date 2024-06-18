import { AutocompleteChangeReason, AutocompleteValue } from "@mui/material";
import AutocompleteDebounce from "../Debounce";
import { useState } from "react";
import { trpcReact } from "#services/server";
import { CustomAutocompleteValue } from "src/@types/autocomplete";

type RoleSelect = { role_id: string; name: string };

export default function AutocompleteRoles<
  T extends RoleSelect,
  M extends boolean = false,
  I extends boolean = false,
>({
  value,
  onChange,
  multiple,
  error,
  helperText,
  useIdValue,
}: {
  useIdValue?: I;
  value: CustomAutocompleteValue<T, I, "role_id", M>;
  multiple?: M;
  error?: boolean;
  helperText?: string;
  onChange: (
    e: React.SyntheticEvent<Element, Event>,
    newValue: CustomAutocompleteValue<T, I, "role_id", M>,
    changeReason: AutocompleteChangeReason,
  ) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const utils = trpcReact.useUtils();
  const getRoles = utils.roles.autocomplete.fetch;

  const [options, setOptions] = useState<RoleSelect[]>([]);

  return (
    <AutocompleteDebounce
      labelField="name"
      valueField="role_id"
      debounce={{
        pending: isLoading,
        setOptions,
        callback: async (dValue, signal) => {
          setIsLoading(true);
          const result = await getRoles(
            { searchType: "name", searchValue: dValue },
            {
              signal,
            },
          );
          setIsLoading(false);
          return result;
        },
      }}
      textField={{
        label: `Role${multiple ? "s" : ""}`,
        error,
        helperText,
      }}
      autocomplete={{
        value: (useIdValue
          ? options.find((o) => o.role_id === value) ?? null
          : value) as AutocompleteValue<T, M, false, false>,
        multiple: multiple,
        inputValue: inputValue,
        options: options,
        onChange: (e, newValue, reason) => {
          if (!Array.isArray(newValue)) {
            onChange(
              e,
              useIdValue ? newValue?.role_id ?? ("" as any) : newValue,
              reason,
            );
          } else {
            onChange(
              e,
              useIdValue ? (newValue.map((b) => b.role_id) as any) : newValue,
              reason,
            );
          }
        },
        onInputChange: (_, newValue) => {
          setInputValue(newValue);
        },
      }}
    />
  );
}
