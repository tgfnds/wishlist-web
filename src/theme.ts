import { createMuiTheme } from "@material-ui/core";
import { orange, red } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  typography: {
    // fontSize: 18,
  },
  palette: {
    type: "dark",
    primary: {
      main: orange[700],
    },
    error: {
      main: red[400],
    },
  },
});
