import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from "@material-ui/core";
import { useState } from "react";
import { addWish } from "../../api/apiWishes";
import useAlertsState from "../../store/useAlertsState";
import useModalsStore from "../../store/useModalsStore";
import useWishStore from "../../store/useWishState";
import { Wish } from "../../types/types";
import Button from "../shared/Buttons/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(2, 2, 0),
  },
  field: {
    color: theme.palette.text.primary,
  },
  actions: {
    padding: theme.spacing(2),
  },
}));

const WishForm = () => {
  const styles = useStyles();
  const showForm = useModalsStore((state) => state.showForm);
  const toggleForm = useModalsStore((state) => state.toggleForm);
  const fetchWishes = useWishStore((state) => state.fetchWishes);
  const pushAlert = useAlertsState((state) => state.pushAlert);
  const [name, setName] = useState<string>("");
  const [cost, setCost] = useState<string>("");

  const clearForm = () => {
    setName("");
    setCost("");
  };

  const submit = async () => {
    try {
      const wish: Wish = { name, cost: Number(cost) };
      const result = await addWish(wish);
      if (!result) {
        console.log("An error occurred while trying to add a wallet", wish);
      }
      fetchWishes();
      pushAlert(`${name} added successfully!`, "SUCCESS");
      clearForm();
      toggleForm("NONE");
    } catch (err) {
      pushAlert("An error occurred while submitting.", "ERROR");
    }
  };

  if (showForm !== "ADD_WISH") return null;
  return (
    <Dialog open={true}>
      <DialogTitle className={styles.title}>New wish</DialogTitle>
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
          id="cost"
          label="Cost"
          type="text"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
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

export default WishForm;
