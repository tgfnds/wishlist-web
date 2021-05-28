import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "3rem",
  },
});

const ErrorComponent = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>Service is unavailable right now! 😟</div>
    </div>
  );
};

export default ErrorComponent;
