import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import {
  Dispatch,
  MouseEventHandler,
  ReactElement,
  SetStateAction,
} from "react";
import Button from "../shared/Buttons/Button";
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

type Props = {
  title: string;
  amount: string;
  setAmount: Dispatch<SetStateAction<string>>;
  submit: MouseEventHandler<HTMLButtonElement>;
  close: () => void;
};

const WalletTransferForm = ({
  title,
  amount,
  setAmount,
  submit,
  close,
}: Props): ReactElement => {
  const styles = useStyles();

  return (
    <Dialog open={true}>
      <DialogTitle className={styles.title}>{title}</DialogTitle>
      <DialogContent className={styles.root}>
        <TextField
          autoFocus
          margin="dense"
          id="amount"
          label="Amount"
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button color="danger" onClick={() => close()}>
          Cancel
        </Button>
        <Button color="success" onClick={submit}>
          Transfer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WalletTransferForm;
