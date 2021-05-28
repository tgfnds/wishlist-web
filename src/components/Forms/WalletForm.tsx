import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import useModalsStore from "../../store/useModalsStore";
import Button from "../shared/Buttons/Button";
import { addWallet } from "../../api/apiWallets";
import { Wallet } from "../../types/types";
import { ReactElement, useState } from "react";
import useWalletStore from "../../store/useWalletStore";
import useAlertsState from "../../store/useAlertsState";
import TextField from "../shared/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(2, 2, 0),
  },
  actions: {
    padding: theme.spacing(2),
  },
}));

const WalletForm = (): ReactElement => {
  const showForm = useModalsStore((state) => state.showForm);
  const toggleForm = useModalsStore((state) => state.toggleForm);
  const fetchWallets = useWalletStore((state) => state.fetchWallets);
  const pushAlert = useAlertsState((state) => state.pushAlert);
  const styles = useStyles();

  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const submit = async () => {
    try {
      const wallet: Wallet = { name, amount: Number(amount) };
      const result = await addWallet(wallet);
      if (!result) {
        console.log("An error occurred while trying to add a wallet", wallet);
      }
      fetchWallets();
      pushAlert(`${name} added successfully!`, "SUCCESS");
      toggleForm("NONE");
    } catch (err) {
      pushAlert("An error occurred while submitting.", "ERROR");
    }
  };

  if (showForm !== "ADD_WALLET") return null;
  return (
    <Dialog open={true}>
      <DialogTitle className={styles.title}>New wallet</DialogTitle>
      <DialogContent className={styles.root}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          id="amount"
          label="Starting amount"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button color="danger" onClick={() => toggleForm("NONE")}>
          Cancel
        </Button>
        <Button color="success" onClick={submit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WalletForm;
