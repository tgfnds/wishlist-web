import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { MouseEventHandler, ReactElement } from "react";
import Button from "../shared/Buttons/Button";

type Props = {
  title: string;
  message: string;
  onClose: MouseEventHandler<HTMLButtonElement>;
  onSubmit: MouseEventHandler<HTMLButtonElement>;
};

const ConfirmationModal = ({
  title,
  message,
  onClose,
  onSubmit,
}: Props): ReactElement => {
  return (
    <Dialog open={true}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{message}</DialogContent>
      <DialogActions>
        <Button color="danger" onClick={onClose}>
          No
        </Button>
        <Button color="success" onClick={onSubmit}>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
