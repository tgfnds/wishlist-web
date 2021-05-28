import { withStyles } from "@material-ui/core";
import MuiTextField from "@material-ui/core/TextField";

const TextField = withStyles({
  root: {
    color: "#ffffff",
  },
})(MuiTextField);

export default TextField;
