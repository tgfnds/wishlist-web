import { makeStyles } from "@material-ui/core";
import useAlertsState from "../../store/useAlertsState";
import { Alert, AlertType } from "../../types/types";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useEffect } from "react";

type Props = {
  alert: Alert;
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "500px",
    padding: "0.3rem 0.8rem",
    borderRadius: theme.shape.borderRadius,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "1.1rem",
    zIndex: 9999,
  },
  icon: {
    paddingLeft: "0.4rem",
    display: "flex",
    alignItems: "center",
  },
  colorPrimary: {
    backgroundColor: theme.palette.info.main,
  },
  colorSuccess: {
    backgroundColor: theme.palette.success.main,
  },
  colorWarning: {
    backgroundColor: theme.palette.warning.main,
  },
  colorError: {
    backgroundColor: theme.palette.error.main,
  },
}));

const AlertItem = ({ alert }: Props) => {
  const styles = useStyles();
  const deleteAlert = useAlertsState((state) => state.deleteAlert);

  const getColorClass = (type: AlertType): string => {
    switch (type) {
      case "INFO":
        return "colorInfo";

      case "SUCCESS":
        return "colorSuccess";

      case "WARNING":
        return "colorWarning";

      case "ERROR":
        return "colorError";

      default:
        return "colorInfo";
    }
  };

  useEffect(() => {
    setTimeout(() => deleteAlert(alert.id), 3000);
  }, []);

  return (
    <div className={`${styles.root} ${styles[getColorClass(alert.type)]}`}>
      <span>{alert.message}</span>
      <span className={styles.icon} onClick={() => deleteAlert(alert.id)}>
        <HighlightOffIcon />
      </span>
    </div>
  );
};

export default AlertItem;
