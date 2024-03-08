import { create } from "zustand";
import { TypographyVariant } from "@mui/material";

interface ConfirmStore {
  isOpen: boolean;
  setOpen: (config: {
    content: string;
    onConfirm: () => void;
    onDeny?: () => void;
  }) => void;
  content: string;
  reset: () => void;
  onConfirm: (() => void) | null;
  onDeny: (() => void) | null;
  textVariant: TypographyVariant;
}

const useConfirmStore = create<ConfirmStore>()((set) => ({
  isOpen: false,
  setOpen: (config) => {
    set((prev) => ({
      ...prev,
      ...config,
      isOpen: true,
    }));
  },
  onConfirm: null,
  onDeny: null,
  reset: () => {
    set({
      isOpen: false,
      onConfirm: null,
      onDeny: null,
      textVariant: "body1",
      content: "",
    });
  },
  content: "",
  textVariant: "body1",
}));

export default useConfirmStore;
