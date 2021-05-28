import {
  Box,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@material-ui/core";
import { MouseEvent, MouseEventHandler, ReactElement, useState } from "react";
import { Wallet, WalletTransferFormType } from "../../types/types";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { withCurrency } from "../../utils/currency";
import CustomIconButton from "../shared/Buttons/CustomIconButton";
import { deleteWallet } from "../../api/apiWallets";
import useWalletStore from "../../store/useWalletStore";
import useWishStore from "../../store/useWishState";
import useAlertsState from "../../store/useAlertsState";
import ConfirmationModal from "../Forms/ConfirmationModal";
import WalletTransferForm from "./WalletTransferForm";

type Props = {
  wallet: Wallet;
};

const useStyles = makeStyles((theme) => ({
  root: {
    cursor: "pointer",
  },
  active: {
    outline: `2px solid ${theme.palette.primary.main}`,
  },
}));

const NewWalletItem = ({ wallet }: Props): ReactElement => {
  const theme = useTheme();
  const styles = useStyles();
  const activeWallet = useWalletStore((state) => state.active);
  const activeWish = useWishStore((state) => state.active);
  const wallets = useWalletStore((state) => state.wallets);
  const setWallets = useWalletStore((state) => state.setWallets);
  const setActive = useWalletStore((state) => state.setActive);
  const pushAlert = useAlertsState((state) => state.pushAlert);

  const [showForm, setShowForm] = useState<WalletTransferFormType>("NONE");
  const [showMenu, setShowMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  const selectActive = () => {
    if (activeWish !== null)
      return pushAlert(
        "Cannot change wallet when investing in a wish.",
        "ERROR",
      );
    setActive(wallet);
  };

  // const handleEdit: MouseEventHandler<HTMLButtonElement> = (e) => {
  //   e.stopPropagation();
  //   console.log("edit now");
  // };

  const handleWithdraw: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setShowForm("WITHDRAW");
  };

  const handleDeposit: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setShowForm("DEPOSIT");
  };

  const closeForm = () => {
    setShowForm("NONE");
  };

  const handleOpenMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    setShowMenu(true);
  };

  const handleCloseMenu: MouseEventHandler<HTMLLIElement> = (e: MouseEvent) => {
    e.stopPropagation();
    setShowMenu(false);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowMenu(false);
    setShowConfirmationModal(true);
  };

  const deleteThisWallet = async () => {
    try {
      const deleted = await deleteWallet(wallet.id);
      if (!deleted) {
        pushAlert(`Couldn't delete ${wallet.name}.`, "WARNING");
      }
      setWallets(wallets.filter((w) => w.id !== wallet.id));
      pushAlert(`${wallet.name} deleted.`, "SUCCESS");
      setShowConfirmationModal(false);
    } catch (err) {
      pushAlert("Can't delete this wallet", "ERROR");
      setShowConfirmationModal(false);
    }
  };

  const handleConfirmationModalClose: MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    e.stopPropagation();
    setShowConfirmationModal(false);
  };

  const handleConfirmationModalSubmit: MouseEventHandler<HTMLButtonElement> = (
    e,
  ) => {
    e.stopPropagation();
    deleteThisWallet();
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="300px"
      justifyContent="space-between"
      padding={2}
      bgcolor={theme.palette.background.paper}
      borderRadius={theme.shape.borderRadius}
      className={`${styles.root} ${activeWallet === wallet && styles.active}`}
      onClick={selectActive}
    >
      <Box display="flex" justifyContent="space-between">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Typography variant="h6">{wallet.name}</Typography>
          <Typography variant="h6">{withCurrency(wallet.amount)}</Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          gridGap={theme.spacing(1)}
        >
          <CustomIconButton
            tooltip="More"
            tooltipPlacement="right"
            size="small"
            onClick={handleOpenMenu}
          >
            <MoreVertIcon />
          </CustomIconButton>
          <CustomIconButton
            tooltip="Withdraw"
            tooltipPlacement="right"
            size="small"
            color="danger"
            onClick={handleWithdraw}
          >
            <ArrowUpwardIcon />
          </CustomIconButton>
          <CustomIconButton
            tooltip="Deposit"
            tooltipPlacement="right"
            size="small"
            color="success"
            onClick={handleDeposit}
          >
            <ArrowDownwardIcon />
          </CustomIconButton>
        </Box>
      </Box>
      {showMenu && (
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
        >
          <MenuItem onClick={handleCloseMenu}>Edit</MenuItem>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </Menu>
      )}
      {showForm !== "NONE" && (
        <Box display="flex" gridGap={theme.spacing(1)}>
          <WalletTransferForm
            type={showForm}
            wallet={wallet}
            onClose={closeForm}
          />
        </Box>
      )}
      {showConfirmationModal && (
        <ConfirmationModal
          title="Delete wallet"
          message="Do you really want to delete this wallet?"
          onClose={handleConfirmationModalClose}
          onSubmit={handleConfirmationModalSubmit}
        />
      )}
    </Box>
  );
};

export default NewWalletItem;
