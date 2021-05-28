import { makeStyles } from "@material-ui/core";

export const useGenericStyles = makeStyles((theme) => ({
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  colorSecondary: {
    color: theme.palette.secondary.main,
  },
  colorSuccess: {
    color: theme.palette.success.main,
  },
  colorDanger: {
    color: theme.palette.error.main,
  },
}));
