import { useState } from "react";
import { z } from "zod";
import { InputAdornment, TextField, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
interface TextFieldPasswordProps {
  value: string;
  onChange: (value: string, error?: boolean) => void;
  error: boolean;
  useOnChangeValidation: boolean;
}

export default function TextFieldPassword({
  value,
  onChange,
  error,
  useOnChangeValidation,
}: TextFieldPasswordProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  return (
    <TextField
      label="Password"
      value={value}
      error={error}
      type={isPasswordVisible ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => {
                setIsPasswordVisible((prev) => !prev);
              }}
            >
              <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
            </IconButton>
          </InputAdornment>
        ),
      }}
      onChange={(e) => {
        if (useOnChangeValidation) {
          const validationResult = z.string().safeParse(e.target.value).success;
          onChange(e.target.value, !validationResult);
          return;
        }
        onChange(e.target.value);
      }}
    />
  );
}
