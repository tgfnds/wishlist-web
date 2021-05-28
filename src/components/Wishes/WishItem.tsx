import { Box, makeStyles, Typography } from "@material-ui/core";
import { Wish } from "../../types/types";
import { PrettoSlider } from "../shared/CustomSlider";
import { ChangeEvent, ReactElement, useState } from "react";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import useWalletStore from "../../store/useWalletStore";
import { withCurrency } from "../../utils/currency";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import useWishStore from "../../store/useWishState";
import useAlertsState from "../../store/useAlertsState";
import IconButton from "../shared/Buttons/IconButton";
import { updateWish, deleteWish } from "../../api/apiWishes";
import { updateWallet } from "../../api/apiWallets";

type Props = {
  wish: Wish;
};

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      "& $actions": {
        visibility: "visible",
        opacity: 1,
      },
    },
  },
  inactive: {
    opacity: 0.3,
  },
  actions: {
    height: "100%",
    visibility: "hidden",
    opacity: 0.2,
    position: "absolute",
    top: 0,
    right: "-50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    transition: "all 0.3s ease",
  },
  button: {
    color: theme.palette.primary.main,
  },
  green: {
    color: theme.palette.success.main,
  },
  red: {
    color: theme.palette.error.main,
  },
  neutral: {
    color: theme.palette.text.primary,
  },
}));

const WishItem = ({ wish }: Props): ReactElement => {
  const styles = useStyles();
  const activeWallet = useWalletStore((state) => state.active);
  const activeWish = useWishStore((state) => state.active);
  const wishes = useWishStore((state) => state.wishes);
  const setActiveWallet = useWalletStore((state) => state.setActive);
  const setActiveWish = useWishStore((state) => state.setActive);
  const setWishes = useWishStore((state) => state.setWishes);
  const clearActiveWish = useWishStore((state) => state.clearActive);
  const pushAlert = useAlertsState((state) => state.pushAlert);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [change, setChange] = useState<number>(0);

  const onSliderStart = () => {
    if (activeWallet === null)
      return pushAlert("Select a wallet first.", "WARNING");
    if (activeWish !== null && activeWish.id !== wish.id)
      return pushAlert("Already investing in another wish.", "WARNING");
    setActiveWish(wish);
  };

  const onSliderChange = (
    event: ChangeEvent<unknown>,
    value: number | number[],
  ) => {
    if (activeWish === null || activeWish.id !== wish.id) return;
    setChange(Number(value) - wish.invested);
  };

  const commitChange = () => {
    try {
      if (activeWish === null) return;
      if (activeWallet.amount - change < 0)
        return pushAlert("Not enough balance.", "ERROR");
      activeWish.invested = wish.invested + change;
      activeWallet.amount = activeWallet.amount - change;
      setChange(0);
      updateWish(activeWish);
      updateWallet(activeWallet);
      clearActiveWish();
      setActiveWallet(activeWallet);
      pushAlert(`${activeWish.name} updated.`, "SUCCESS");
    } catch (err) {
      pushAlert("An error occurred while commiting.", "ERROR");
    }
  };

  const cancelChange = () => {
    setChange(0);
    clearActiveWish();
  };

  const handleDelete = () => {
    if (wish.invested > 0)
      return pushAlert("Cannot delete invested wishes.", "WARNING");

    try {
      const deleted = deleteWish(wish.id);
      if (deleted) {
        setWishes(wishes.filter((w) => w.id !== wish.id));
        pushAlert(`${wish.name} deleted.`, "SUCCESS");
      } else {
        pushAlert(`Couldn't delete ${wish.name}.`, "WARNING");
      }
    } catch (err) {
      pushAlert("An error occurred while deleting wish.", "ERROR");
    }
  };

  const saveWish = () => {
    setIsEditing(false);
  };

  const getChangeStyle = () => {
    if (change > 0) {
      return styles.green;
    } else if (change < 0) {
      return styles.red;
    } else {
      return styles.neutral;
    }
  };

  const shouldBlur = activeWish !== null && activeWish.id !== wish.id;

  return (
    <div className={`${styles.root} ${shouldBlur && styles.inactive}`}>
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
      >
        <Typography>{wish.name}</Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Typography variant="body1">{withCurrency(wish.cost)}</Typography>
          <Box display="flex" flexDirection="row">
            {activeWish === wish && change !== 0 && (
              <Box mr={1.5}>
                <Typography className={`${getChangeStyle()}`}>
                  {change > 0 ? `+${change}` : change}
                </Typography>
              </Box>
            )}
            <Typography color="primary">
              {withCurrency(wish.invested + change)}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box mt={1}>
        <PrettoSlider
          value={wish.invested + change}
          defaultValue={wish.invested}
          onMouseDown={onSliderStart}
          onChange={onSliderChange}
          disabled={isEditing}
          min={0}
          max={wish.cost}
        />
      </Box>
      {(activeWish === null || activeWish.id === wish.id) && (
        <Box>
          {activeWish === null ? (
            <div className={styles.actions}>
              <IconButton
                tooltip="Delete"
                onClick={handleDelete}
                icon={<DeleteOutlineOutlinedIcon />}
              />
              {isEditing ? (
                <IconButton
                  tooltip="Save"
                  icon={<SaveOutlinedIcon />}
                  onClick={saveWish}
                />
              ) : (
                <IconButton
                  tooltip="Edit"
                  icon={<EditOutlinedIcon />}
                  disabled={activeWish !== null}
                  onClick={() => setIsEditing(true)}
                />
              )}
              {wish.invested === wish.cost && (
                <IconButton
                  tooltip="Buy"
                  icon={<ShoppingCartOutlinedIcon />}
                  onClick={() => setIsEditing(true)}
                />
              )}
            </div>
          ) : (
            <div className={styles.actions}>
              <IconButton
                tooltip="Clear"
                color="danger"
                icon={<ClearIcon />}
                onClick={cancelChange}
              />
              <IconButton
                tooltip="Commit"
                color="success"
                icon={<DoneIcon />}
                onClick={commitChange}
              />
            </div>
          )}
        </Box>
      )}
    </div>
  );
};

export default WishItem;
