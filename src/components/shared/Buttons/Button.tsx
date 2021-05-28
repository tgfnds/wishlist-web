import {
  Button as MuiButton,
  ButtonProps,
  makeStyles,
} from "@material-ui/core";
import { MouseEventHandler, ReactElement, ReactNode } from "react";
import { Color } from "../../../types/types";

type Props = {
  children: ReactNode;
  fullWidth?: boolean;
  color?: Color;
  onClick?: MouseEventHandler<HTMLButtonElement>;
} & Omit<ButtonProps, "color">;

const useStyles = makeStyles((theme) => ({
  button: {
    color: theme.palette.text.primary,
  },
  colorPrimary: {
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  fullWidth: {
    width: "100%",
  },
  colorSecondary: {
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  colorSuccess: {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
    },
  },
  colorDanger: {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));

const Button = ({
  children,
  fullWidth,
  color,
  onClick,
}: Props): ReactElement => {
  const styles = useStyles();

  const getColorClass = (color: Color): string => {
    switch (color) {
      case "primary":
        return "colorPrimary";

      case "secondary":
        return "colorSecondary";

      case "success":
        return "colorSuccess";

      case "danger":
        return "colorDanger";

      default:
        return "colorPrimary";
    }
  };

  return (
    <MuiButton
      className={`${styles.button}  ${styles[getColorClass(color)]} ${
        fullWidth && styles.fullWidth
      }`}
      onClick={onClick}
      size="small"
    >
      {children}
    </MuiButton>
  );
};

export default Button;
