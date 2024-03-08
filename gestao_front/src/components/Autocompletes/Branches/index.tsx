import { AutocompleteChangeReason } from "@mui/material";
import AutocompleteDebounce from "../Debounce";
import { useState } from "react";
import { trpcReact } from "#services/server";

type BranchSelect = { branch_id: string; name: string };

export default function AutocompleteBranches({
  value,
  onChange,
}: {
  value: BranchSelect | null;
  onChange: (
    e: React.SyntheticEvent<Element, Event>,
    newValue: BranchSelect | null,
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
        pending: isLoading,
        callback: async (dValue, signal) => {
          setIsLoading(true);
          const result = await getBranches(
            { searchType: "name", searchValue: dValue },
            {
              signal,
            },
          );
          setOptions(result);
          setIsLoading(false);
        },
      }}
      textField={{
        label: "Branch",
      }}
      autocomplete={{
        value: value,
        multiple: false,
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
