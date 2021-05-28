import { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import WishItem from "./WishItem";
import useWishStore from "../../store/useWishState";
import useAlertsState from "../../store/useAlertsState";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "800px",
    height: "100%",
    padding: "2rem 5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    background: theme.palette.background.default,
    // background: `linear-gradient(
    //   180deg,
    //   ${theme.palette.background.default} 0%,
    //   rgba(16, 16, 16, 0.401042) 68.23%,
    //   rgba(43, 43, 43, 0) 100%,
    //   rgba(0, 0, 0, 0) 100%
    // );`,
    borderRadius: theme.shape.borderRadius,
  },
}));

//#2b2b2b

const WishList = () => {
  const styles = useStyles();
  const wishes = useWishStore((state) => state.wishes);
  const fetchWishes = useWishStore((state) => state.fetchWishes);
  const pushAlert = useAlertsState((state) => state.pushAlert);

  useEffect(() => {
    try {
      fetchWishes();
    } catch (err) {
      pushAlert("Couldn't load wishes", "ERROR");
    }
  }, []);

  return (
    <div className={styles.root}>
      {wishes && wishes.map((wish) => <WishItem key={wish.id} wish={wish} />)}
    </div>
  );
};

export default WishList;
