import create from "zustand";
import { Wish } from "../types/types";

type InvestingState = {
  activeWish: Wish | null;
  change: number | null;
  setActiveWish: (wish: Wish) => void;
  clearActiveWish: () => void;
  setChange: (value: number) => void;
};

const useInvestingState = create<InvestingState>((set) => ({
  activeWish: null,
  change: null,
  setActiveWish: (wish: Wish) => set({ activeWish: wish }),
  clearActiveWish: () => set({ activeWish: null }),
  setChange: (value: number) => set({ change: value }),
}));

export default useInvestingState;
