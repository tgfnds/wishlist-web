import axios from "axios";
import { WalletTransferRequest } from "../types/requests";
import { Wallet } from "../types/types";

const API_URL = "https://localhost:44329";

export const fetchWallets = async (): Promise<Wallet[]> => {
  const res = await axios.get<Wallet[]>(`${API_URL}/wallet`);
  return res.data;
};

export const addWallet = async (wallet: Wallet): Promise<string | null> => {
  const res = await axios.post<string | null>(`${API_URL}/wallet`, wallet);
  if (res.status !== 200) {
    return null;
  }
  return res.data;
};

export const updateWallet = async (wallet: Wallet): Promise<boolean | null> => {
  const res = await axios.put<boolean | null>(`${API_URL}/wallet`, wallet);
  if (res.status !== 200) {
    return null;
  }
  return res.data;
};

export const deleteWallet = async (id: string): Promise<boolean | null> => {
  const res = await axios.delete<boolean | null>(`${API_URL}/wallet/${id}`);
  return res.data;
};

export const deposit = async (
  walletTransfer: WalletTransferRequest,
): Promise<boolean | null> => {
  const res = await axios.post<boolean | null>(
    `${API_URL}/wallet/deposit`,
    walletTransfer,
  );
  return res.data;
};

export const withdraw = async (
  walletTransfer: WalletTransferRequest,
): Promise<boolean | null> => {
  const res = await axios.post<boolean | null>(
    `${API_URL}/wallet/withdraw`,
    walletTransfer,
  );
  return res.data;
};
