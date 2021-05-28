import create from "zustand";

export type FormType =
  | "NONE"
  | "ADD_WALLET"
  | "ADD_WISH"
  | "WALLET_DEPOSIT"
  | "WALLET_WITHDRAW";

type ModalsState = {
  showForm: FormType;
  toggleForm: (type: FormType) => void;
};

const useModalsStore = create<ModalsState>((set) => ({
  showForm: "NONE",
  toggleForm: (type: FormType) => set({ showForm: type }),
}));

export default useModalsStore;
