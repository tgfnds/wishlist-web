import { Button as MuiButton, makeStyles, Tooltip } from "@material-ui/core";
import { MouseEventHandler, ReactElement, ReactNode } from "react";
import { Color } from "../../../types/types";
import { useGenericStyles } from "../../../utils/styles";

type Props = {
  icon: ReactNode;
  color?: Color;
  tooltip?: string;
  placement?:
    | "bottom"
    | "left"
    | "right"
    | "top"
    | "bottom-end"
    | "bottom-start"
    | "left-end"
    | "left-start"
    | "right-end"
    | "right-start"
    | "top-end"
    | "top-start";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const useStyles = makeStyles({
  root: {
    borderRadius: "20px",
    minWidth: "40px",
    width: "40px",
    minHeight: "40px",
  },
});

const IconButton = ({
  icon,
  color,
  tooltip,
  placement,
  disabled,
  onClick,
}: Props): ReactElement => {
  const styles = useStyles();
  const genericStyles = useGenericStyles();

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

  if (tooltip) {
    return (
      <Tooltip title={tooltip} placement={placement || "bottom"}>
        <MuiButton
          className={`${styles.root} ${genericStyles[getColorClass(color)]}`}
          variant="text"
          onClick={onClick}
          disabled={disabled}
        >
          {icon}
        </MuiButton>
      </Tooltip>
    );
  } else {
    return (
      <MuiButton
        className={`${styles.root} ${genericStyles[getColorClass(color)]}`}
        variant="text"
        onClick={onClick}
        disabled={disabled}
      >
        {icon}
      </MuiButton>
    );
  }
};

export default IconButton;
