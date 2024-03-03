import { TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { z } from "zod";

interface TextFieldEmailProps<M extends boolean> {
  value: string;
  onChange: (
    value: M extends true
      ? ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      : string,
    error?: boolean,
  ) => void;
  useOnChangeValidation?: M extends true ? never : true;
  useHookForms?: M;
  error: boolean;
}

export default function TextFieldEmail<M extends boolean>({
  value,
  onChange,
  useOnChangeValidation,
  error,
  useHookForms,
}: TextFieldEmailProps<M>) {
  return (
    <TextField
      label="Email"
      value={value}
      error={error}
      onChange={(e) => {
        const v = (useHookForms ? e : e.target.value) as M extends true
          ? ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          : string;
        const err =
          useOnChangeValidation &&
          z.string().email().safeParse(e.target.value).success;

        if (useHookForms === true && useOnChangeValidation) {
          onChange(v, !err);
          return;
        } else {
          onChange(v);
        }
      }}
    />
  );
}
