import { create } from "zustand";

interface ThemeStore {
  currentTheme: "light" | "dark";
  changeTheme: () => void;
}

const useThemeStore = create<ThemeStore>()((set) => ({
  currentTheme: "light",
  changeTheme: () => {
    set((prev) => ({
      currentTheme: prev.currentTheme === "light" ? "dark" : "light",
    }));
  },
}));

export default useThemeStore
