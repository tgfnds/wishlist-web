import { makeStyles } from "@material-ui/core";
import useAlertsState from "../../store/useAlertsState";
import AlertItem from "./AlertItem";

const useStyles = makeStyles({
  root: {
    position: "fixed",
    right: 20,
    bottom: 20,
    display: "flex",
    flexDirection: "column-reverse",
    gap: "1rem",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});

const Alerts = () => {
  const styles = useStyles();
  const alerts = useAlertsState((state) => state.alerts);

  return (
    <div className={styles.root}>
      {alerts &&
        alerts.map((alert) => <AlertItem key={alert.id} alert={alert} />)}
    </div>
  );
};

export default Alerts;
