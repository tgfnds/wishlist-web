export type Color = "primary" | "secondary" | "success" | "danger";

export type WalletTransferFormType = "DEPOSIT" | "WITHDRAW" | "NONE";

export interface Wish {
  id?: string;
  name: string;
  cost: number;
  invested?: number;
  bought?: false;
}

export interface Wallet {
  id?: string;
  name: string;
  amount: number;
}

export type AlertType = "INFO" | "SUCCESS" | "WARNING" | "ERROR";

export type Alert = {
  id: string;
  message: string;
  type: AlertType;
};
