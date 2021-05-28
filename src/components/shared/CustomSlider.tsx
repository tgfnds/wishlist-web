import { Slider, withStyles } from "@material-ui/core";

export const PrettoSlider = withStyles((theme) => ({
  root: {
    padding: 0,
    color: "#eb9026",
    height: 12,
    "&:hover $track": {
      color: theme.palette.success.light,
    },
  },
  thumb: {
    display: "none",
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 12,
    borderRadius: "5px",
    color: theme.palette.success.main,
  },
  rail: {
    height: 12,
    borderRadius: 5,
    color: "#ebebeb",
    opacity: 1,
  },
}))(Slider);
