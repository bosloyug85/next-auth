import {
    Dialog,
    DialogTitle
} from "@mui/material";

export interface IModalProps {
    open: boolean;
    children: any;
    onClose: (value: string) => void;
  }

const Modal = (props: IModalProps) => {
    const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

    return <Dialog onClose={handleClose} open={open}>
    {props.children}
  </Dialog>
}

export default Modal;