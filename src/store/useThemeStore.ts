import create from "zustand";

type ThemeState = {
  type: "light" | "dark";
  toggleType: () => void;
};

const useThemeStore = create<ThemeState>((set, get) => ({
  type: "light",
  toggleType: () => {
    const { type } = get();
    set({ type: type === "light" ? "dark" : "light" });
  },
}));

export default useThemeStore;
