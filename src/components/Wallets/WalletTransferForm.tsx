import { Box, useTheme } from "@material-ui/core";
import { MouseEventHandler, ReactElement, useState } from "react";
import { deposit, withdraw } from "../../api/apiWallets";
import useAlertsState from "../../store/useAlertsState";
import useWalletStore from "../../store/useWalletStore";
import { WalletTransferRequest } from "../../types/requests";
import { Wallet, WalletTransferFormType } from "../../types/types";
import IconButton from "../shared/Buttons/IconButton";
import TextField from "../shared/TextField";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

type Props = {
  type: WalletTransferFormType;
  wallet: Wallet;
  onClose: () => void;
};

const WalletTransferForm = ({ type, wallet, onClose }: Props): ReactElement => {
  const fetchWallets = useWalletStore((state) => state.fetchWallets);
  const pushAlert = useAlertsState((state) => state.pushAlert);
  const theme = useTheme();

  const [amount, setAmount] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleClose: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    onClose();
  };

  const submitDeposit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    setSubmitting(true);
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
    } finally {
      onClose();
    }
  };

  const submitWithdraw: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.stopPropagation();
    setSubmitting(true);
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
    } finally {
      onClose();
    }
  };

  return (
    <Box
      bgcolor={theme.palette.background.default}
      borderRadius={theme.shape.borderRadius}
      marginTop={1}
			padding={1}
      display="flex"
      alignItems="center"
      gridGap={theme.spacing(1)}
    >
      <TextField
        autoFocus
        onClick={(e) => e.stopPropagation()}
        id="amount"
        label="Amount"
        type="text"
        value={amount}
        disabled={submitting}
        onChange={(e) => setAmount(e.target.value)}
      />
      <IconButton
        color="danger"
        tooltip="Cancel"
        disabled={submitting}
        onClick={handleClose}
        icon={<CloseIcon />}
      />
      <IconButton
        color="success"
        tooltip="Confirm"
        disabled={submitting}
        onClick={type === "DEPOSIT" ? submitDeposit : submitWithdraw}
        icon={<AddIcon />}
      />
    </Box>
  );
};

export default WalletTransferForm;
