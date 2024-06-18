import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ThemeStore {
  currentTheme: "light" | "dark";
  changeTheme: () => void;
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      currentTheme: "light",
      changeTheme: () => {
        set((prev) => ({
          currentTheme: prev.currentTheme === "light" ? "dark" : "light",
        }));
      },
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useThemeStore;
