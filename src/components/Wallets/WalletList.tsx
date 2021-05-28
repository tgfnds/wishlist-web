import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import useAlertsState from "../../store/useAlertsState";
import useWalletStore from "../../store/useWalletStore";
import WalletItem from "./WalletItem";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    position: "relative",
  },
  title: {
    position: "absolute",
    top: -25,
    left: 20,
    fontSize: "2rem",
    fontWeight: "bold",
    color: theme.palette.primary.light,
  },
}));

const WalletList = () => {
  const { wallets, fetchWallets } = useWalletStore();
  const styles = useStyles();

  const pushAlert = useAlertsState((state) => state.pushAlert);

  useEffect(() => {
    try {
      fetchWallets();
    } catch (err) {
      pushAlert("Couldn't load wallets.", "ERROR");
    }
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.title}>Wallets</div>
      {wallets &&
        wallets.map((wallet) => <WalletItem key={wallet.id} wallet={wallet} />)}
    </div>
  );
};

export default WalletList;
