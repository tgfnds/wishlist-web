import { LinearProgress, Theme, withStyles } from "@material-ui/core";
import { createStyles } from "@material-ui/styles";

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 12,
      borderRadius: 4,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
      borderRadius: "5px 0px 0px 5px",
      backgroundColor: "#eb9026",
    },
  }),
)(LinearProgress);

export default BorderLinearProgress;
