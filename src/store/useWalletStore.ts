import create from "zustand";
import { fetchWallets } from "../api/apiWallets";
import { Wallet } from "../types/types";

type WalletState = {
  isLoading: boolean;
  wallets: Wallet[] | null;
  active: Wallet | null;
  setIsLoading: (isLoading: boolean) => void;
  setWallets: (wallets: Wallet[]) => void;
  setActive: (wallet: Wallet) => void;
  fetchWallets: () => void;
};

const useWalletStore = create<WalletState>((set, get) => ({
  isLoading: false,
  wallets: null,
  active: null,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setWallets: (wallets: Wallet[]) => set({ wallets }),
  setActive: (wallet: Wallet) => set({ active: wallet }),
  fetchWallets: async () => {
    const setIsLoading = get().setIsLoading;
    const active = get().active;
    setIsLoading(true);
    const wallets = await fetchWallets();
    if (!wallets) return;
    set({ wallets, active: active || wallets[0], isLoading: false });
  },
}));

export default useWalletStore;
