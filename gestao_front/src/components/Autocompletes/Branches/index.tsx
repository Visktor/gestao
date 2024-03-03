import { AutocompleteChangeReason } from "@mui/material";
import AutocompleteDebounce from "../Debounce";
import { useState } from "react";
import { trpcReact } from "#services/server";

type BranchSelect = { branch_id: string; name: string };

export default function BranchesAutocomplete({
  value,
  onChange,
}: {
  value: BranchSelect;
  onChange: (
    e: React.SyntheticEvent<Element, Event>,
    newValue: BranchSelect | null,
    changeReason: AutocompleteChangeReason,
  ) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const { data: options, refetch } = trpcReact.branches.getSelect.useQuery({
    searchType: "name",
    searchValue: inputValue,
  });

  return (
    <AutocompleteDebounce
      debounce={{
        callback: refetch,
      }}
      autocomplete={{
        value: value,
        multiple: false,
        inputValue: inputValue,
        options: options ?? [],
        onChange: onChange,
        onInputChange: (_, newValue) => {
          setInputValue(newValue);
        },
      }}
    />
  );
}
