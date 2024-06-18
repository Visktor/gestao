import { AutocompleteChangeReason, AutocompleteValue } from "@mui/material";
import AutocompleteDebounce from "../Debounce";
import { useState } from "react";
import { trpcReact } from "#services/server";

export type BranchSelect = { branch_id: string; name: string };

export default function AutocompleteBranches<
  M extends boolean = false,
>({
  value,
  onChange,
  multiple,
  error,
  helperText,
}: {
  value: M extends true ? BranchSelect[] : BranchSelect | null;
  multiple?: M;
  error?: boolean;
  helperText?: string;
  onChange: (
    e: React.SyntheticEvent<Element, Event>,
    newValue: AutocompleteValue<BranchSelect, M, false, false>,
    changeReason: AutocompleteChangeReason,
  ) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const utils = trpcReact.useUtils();
  const getBranches = utils.branches.getSelect.fetch;

  const [options, setOptions] = useState<BranchSelect[]>([]);

  return (
    <AutocompleteDebounce
      labelField="name"
      valueField="branch_id"
      debounce={{
        setOptions,
        pending: isLoading,
        callback: async (dValue, signal) => {
          setIsLoading(true);
          const result = await getBranches(
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
        label: `Branch${multiple ? "es" : ""}`,
        error,
        helperText,
      }}
      autocomplete={{
        value: value,
        multiple: multiple,
        limitTags: 3,
        inputValue: inputValue,
        options: options,
        onChange: (e, newValue, reason) => {
          onChange(e, newValue, reason);
        },
        onInputChange: (_, newValue) => {
          setInputValue(newValue);
        },
      }}
    />
  );
}
