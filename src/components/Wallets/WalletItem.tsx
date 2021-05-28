import { Wallet } from "../../types/types";
import useWalletStore from "../../store/useWalletStore";
import { Box, makeStyles, Typography } from "@material-ui/core";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import RemoveCircleOutlinedIcon from "@material-ui/icons/RemoveCircleOutlined";
import { deleteWallet } from "../../api/apiWallets";
import useAlertsState from "../../store/useAlertsState";
import useWishStore from "../../store/useWishState";
import { MouseEvent, MouseEventHandler, ReactElement, useState } from "react";
import IconButton from "../shared/Buttons/IconButton";
import DepositWalletTransferForm from "../Forms/DepositWalletTransferForm";
import WithdrawWalletTransferForm from "../Forms/WithdrawWalletTransferForm";

type Props = {
  wallet: Wallet;
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "150px",
    maxWidth: "150px",
    height: "70px",
    padding: theme.spacing(1),
    backgroundColor: "#222",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.2rem",
    textAlign: "center",
    fontSize: "1rem",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      cursor: "pointer",
      "& $actions": {
        visibility: "visible",
        opacity: 1,
      },
    },
  },
  green: {
    color: theme.palette.success.main,
  },
  red: {
    color: theme.palette.error.main,
  },
  currency: {
    paddingLeft: "0.1rem",
  },
  active: {
    outline: `2px solid ${theme.palette.primary.main}`,
    boxShadow: theme.shadows[6],
  },
  actions: {
    position: "absolute",
    visibility: "hidden",
    opacity: 0.2,
    bottom: -42,
    right: 0,
    transition: "all 0.3s ease",
    "& > *": {
      height: "20px",
    },
  },
}));

const WalletItem = ({ wallet }: Props): ReactElement => {
  const activeWallet = useWalletStore((state) => state.active);
  const activeWish = useWishStore((state) => state.active);
  const wallets = useWalletStore((state) => state.wallets);
  const setWallets = useWalletStore((state) => state.setWallets);
  const setActive = useWalletStore((state) => state.setActive);
  const pushAlert = useAlertsState((state) => state.pushAlert);
  const { name, amount } = wallet;
  const styles = useStyles();

  const [showDepositForm, setShowDepositForm] = useState<boolean>(false);
  const [showWithdrawForm, setShowWithdrawForm] = useState<boolean>(false);

  const onActivate = () => {
    if (activeWish !== null)
      return pushAlert(
        "Cannot change wallet when investing in a wish.",
        "ERROR",
      );
    setActive(wallet);
  };

  const handleDeposit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setShowDepositForm(true);
  };

  const handleWithdraw: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setShowWithdrawForm(true);
  };

  const handleEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    console.log("edit now");
  };

  const handleDelete = async (
    e: MouseEvent<SVGSVGElement, globalThis.MouseEvent>,
  ) => {
    e.stopPropagation();
    try {
      const deleted = await deleteWallet(wallet.id);
      if (!deleted) {
        pushAlert(`Couldn't delete ${wallet.name}.`, "WARNING");
      }
      setWallets(wallets.filter((w) => w.id !== wallet.id));
      pushAlert(`${wallet.name} deleted.`, "SUCCESS");
    } catch (err) {
      pushAlert("Can't delete this wallet", "ERROR");
    }
  };

  return (
    <div
      className={`${styles.root} ${
        wallet.id === activeWallet?.id && styles.active
      }`}
      onClick={onActivate}
    >
      <div>
        <Typography noWrap>{name}</Typography>
      </div>
      <Box className={styles.green} display="flex" alignItems="flex-end">
        <Typography variant="h5">{amount}</Typography>
        <Typography className={styles.currency} variant="h6">
          €
        </Typography>
      </Box>
      {activeWish === null && (
        <div className={styles.actions}>
          <IconButton
            tooltip="Withdraw"
            color="danger"
            icon={<RemoveCircleOutlinedIcon />}
            onClick={handleWithdraw}
          />
          <IconButton
            tooltip="Deposit"
            color="success"
            icon={<AddCircleOutlinedIcon />}
            onClick={handleDeposit}
          />
          <IconButton
            tooltip="Edit"
            color="primary"
            icon={<EditOutlinedIcon />}
            onClick={handleEdit}
          />
          {wallet.amount === 0 && (
            <HighlightOffOutlinedIcon
              color="primary"
              onClick={(e) => handleDelete(e)}
            />
          )}
        </div>
      )}
      {showDepositForm && (
        <DepositWalletTransferForm
          wallet={wallet}
          close={() => setShowDepositForm(false)}
        />
      )}
      {showWithdrawForm && (
        <WithdrawWalletTransferForm
          wallet={wallet}
          close={() => setShowWithdrawForm(false)}
        />
      )}
    </div>
  );
};

export default WalletItem;
