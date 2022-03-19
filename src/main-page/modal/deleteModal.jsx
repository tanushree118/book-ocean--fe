import * as React from "react";
import { Box, Button, Typography, Modal } from "@mui/material";
import styles from "../main-page.module.scss";
import useMediaQuery from '@mui/material/useMediaQuery';

let style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  p: 4,
};

const DeleteModal = ({
  open,
  handleClose,
  onConfirmClick,
  modalTitle,
  button1Text,
  button2Text,
}) => {
  const matches = useMediaQuery('(max-width:600px)');
  if (matches) {
    style = {
      ...style,
      width: 300
    }
  } else {
    style = {
      ...style,
      width: 400
    }
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {modalTitle}
          </Typography>
          <Box className={styles.deleteButtonsContainer}>
            <Button 
              disableRipple 
              onClick={handleClose} 
              variant="contained"
              className={styles.endSpace}
            >
              {button1Text}
            </Button>
            <Button
              disableRipple
              onClick={(event) => onConfirmClick(event)}
              variant="contained"
            >
              {button2Text}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
