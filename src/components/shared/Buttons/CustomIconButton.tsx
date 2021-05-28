import {
  IconButton,
  IconButtonProps,
  makeStyles,
  Tooltip,
} from "@material-ui/core";
import { ReactElement } from "react";
import { Color } from "../../../types/types";

type Props = {
  children?: ReactElement;
  color?: Color;
  tooltip?: string;
  tooltipPlacement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
} & Omit<IconButtonProps, "color">;

const useStyles = makeStyles((theme) => ({
  colorDefault: {
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.text.secondary,
    },
  },
  colorPrimary: {
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  colorSecondary: {
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
  },
  colorSuccess: {
    color: theme.palette.success.main,
    "&:hover": {
      color: theme.palette.success.dark,
    },
  },
  colorDanger: {
    color: theme.palette.error.main,
    "&:hover": {
      color: theme.palette.error.dark,
    },
  },
}));

const CustomIconButton = ({
  children,
  color,
  tooltip,
  tooltipPlacement,
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
        return "colorDefault";
    }
  };

  if (tooltip) {
    return (
      <Tooltip title={tooltip} placement={tooltipPlacement || "bottom"}>
        <IconButton
          className={styles[getColorClass(color)]}
          size="small"
          onClick={onClick}
        >
          {children}
        </IconButton>
      </Tooltip>
    );
  } else {
    return (
      <IconButton
        className={styles[getColorClass(color)]}
        size="small"
        onClick={onClick}
      >
        {children}
      </IconButton>
    );
  }
};

export default CustomIconButton;
