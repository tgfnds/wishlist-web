import { MouseEventHandler, ReactElement, useState } from "react";
import { withdraw } from "../../api/apiWallets";
import useAlertsState from "../../store/useAlertsState";
import useWalletStore from "../../store/useWalletStore";
import { WalletTransferRequest } from "../../types/requests";
import { Wallet } from "../../types/types";
import WalletTransferForm from "./WalletTransferForm";

type Props = {
  wallet: Wallet;
  close: () => void;
};

const WithdrawWalletTransferForm = ({ wallet, close }: Props): ReactElement => {
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
      const result = await withdraw(transferInfo);
      if (!result) {
        console.log(
          `An error occurred while trying to withdraw.`,
          transferInfo,
        );
      }
      fetchWallets();
      pushAlert(`${amount} withdrawn successfully!`, "SUCCESS");
      close();
    } catch (err) {
      pushAlert("An error occurred while submitting.", "ERROR");
    }
  };

  return (
    <WalletTransferForm
      title="Wallet withdraw"
      amount={amount}
      setAmount={setAmount}
      submit={submit}
      close={close}
    />
  );
};

export default WithdrawWalletTransferForm;
