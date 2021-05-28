import create from "zustand";
import { fetchWishes } from "../api/apiWishes";
import { Wish } from "../types/types";

type WishState = {
  isLoading: boolean;
  wishes: Wish[];
  active: Wish | null;
  change: number | null;
  setIsLoading: (isLoading: boolean) => void;
  setWishes: (wishes: Wish[]) => void;
  setActive: (wish: Wish) => void;
  setChange: (value: number) => void;
  clearActive: () => void;
  fetchWishes: () => void;
};

const useWishStore = create<WishState>((set, get) => ({
  isLoading: false,
  wishes: [],
  active: null,
  change: null,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setWishes: (wishes: Wish[]) => set({ wishes }),
  setActive: (wish: Wish) => set({ active: wish }),
  setChange: (value: number) => set({ change: value }),
  clearActive: () => set({ active: null }),
  fetchWishes: async () => {
    const setIsLoading = get().setIsLoading;
    setIsLoading(true);
    const wishes = await fetchWishes();
    if (!wishes) return;
    set({ wishes, isLoading: false });
  },
}));

export default useWishStore;
