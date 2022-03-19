import React from "react";
import { Button, Modal, Box, Fade, Typography, TextField } from "@mui/material";
import styles from "../main-page.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
let muiStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "32%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const modalStyle = {
  display: "flex",
  flexDirection: "column",
};

const buttonStyle = {
  marginTop: "4%",
  display: "flex",
  justifyContent: "flex-end",
};
const UploadModal = ({
  open,
  onClose,
  handleBookDetailsChange,
  checkIfErroneous,
  uploadFormFields,
  validateBookDetails,
  errors,
}) => {
  const matches = useMediaQuery("(max-width:600px)");
  if (matches) {
    muiStyle = {
      ...muiStyle,
      width: "74%",
    };
  } else {
    muiStyle = {
      ...muiStyle,
      width: "32%",
    };
  }
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Fade in={open}>
        <Box sx={muiStyle}>
          <Box className={styles.spaceBetween}>
            <Typography className={styles.centerAligned}>
              Fill in the details
            </Typography>
            <Button onClick={onClose} disableRipple>
              Close
            </Button>
          </Box>
          <Box sx={modalStyle}>
            {uploadFormFields?.map((eachField) => {
              return (
                <TextField
                  key={`${eachField.id}_${eachField.value}`}
                  id={eachField.value}
                  label={eachField.label}
                  onChange={(event) =>
                    handleBookDetailsChange(event, eachField.value)
                  }
                  style={{ marginTop: "4%" }}
                  error={checkIfErroneous(eachField.value)}
                  helperText={errors[`${eachField.value}Error`]}
                  required
                  multiline={eachField.value === "aboutBook"}
                  rows={(eachField.value === "aboutBook" && 4) || 0}
                />
              );
            })}
            <Box sx={buttonStyle}>
              <input
                color="primary"
                type="file"
                onChange={validateBookDetails}
                id="icon-button-file"
                style={{ display: "none" }}
              />
              <label htmlFor="icon-button-file">
                <Button
                  variant="contained"
                  component="span"
                  size="large"
                  color="primary"
                  disableRipple
                >
                  Upload
                </Button>
              </label>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UploadModal;
