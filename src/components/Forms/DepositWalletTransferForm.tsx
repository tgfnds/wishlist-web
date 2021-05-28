import { useState, ReactElement, MouseEventHandler } from "react";
import { deposit } from "../../api/apiWallets";
import useAlertsState from "../../store/useAlertsState";
import useWalletStore from "../../store/useWalletStore";
import { WalletTransferRequest } from "../../types/requests";
import { Wallet } from "../../types/types";
import WalletTransferForm from "./WalletTransferForm";

type Props = {
  wallet: Wallet;
  close: () => void;
};

const DepositWalletTransferForm = ({ wallet, close }: Props): ReactElement => {
  const fetchWallets = useWalletStore((state) => state.fetchWallets);
  const pushAlert = useAlertsState((state) => state.pushAlert);

  const [amount, setAmount] = useState<string>("");

  const submit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    try {
      const transferInfo: WalletTransferRequest = {
        id: wallet.id,
        amount: Number(amount),
      };
      const result = await deposit(transferInfo);
      if (!result) {
        console.log(`An error occurred while trying to deposit.`, transferInfo);
      }
      fetchWallets();
      pushAlert(`${amount} deposited successfully!`, "SUCCESS");
      close();
    } catch (err) {
      pushAlert("An error occurred while submitting.", "ERROR");
    }
  };

  return (
    <WalletTransferForm
      title="Wallet deposit"
      amount={amount}
      setAmount={setAmount}
      submit={submit}
      close={close}
    />
  );
};

export default DepositWalletTransferForm;
