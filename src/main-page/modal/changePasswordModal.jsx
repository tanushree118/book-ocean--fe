import React from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Box, Fade, TextField, Typography } from "@mui/material";
import {
  oldPasswordValidator,
  newPasswordValidator,
  confirmNewPasswordValidator,
} from "../../change-password-validator/passwordValidator";
import styles from "../main-page.module.scss";
import { getCipheredText } from "../../shared/utils";
import { postChangePassword } from "../../state/actions";
import useMediaQuery from '@mui/material/useMediaQuery';

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
const changePasswordFormFields = [
  {
    id: 1,
    label: "Old Password",
    value: "oldPassword",
  },
  {
    id: 2,
    label: "New Password",
    value: "newPassword",
  },
  {
    id: 3,
    label: "Confirm Password",
    value: "confirmNewPassword",
  },
];

const ChangePasswordModal = ({
  open,
  onClose,
  changePasswordForm,
  setChangePasswordForm,
  errors,
  setErrors,
  loggedInUser,
  currentUserPassword,
}) => {
  const matches = useMediaQuery('(max-width:600px)');
  if (matches) {
    muiStyle = {
      ...muiStyle,
      width: "74%"
    }
  } else {
    muiStyle = {
      ...muiStyle,
      width: "32%"
    }
  }
  const dispatch = useDispatch();
  const handleChangePasswordFormChange = (event, fieldValue) => {
    const value = event.target.value;
    let updatedPasswordDetails = {
      ...changePasswordForm,
      [fieldValue]: value,
    };
    setChangePasswordForm(updatedPasswordDetails);
  };

  const validatePasswordChange = () => {
    let updatePasswordDetailsErrors = {};
    for (let key in errors) {
      updatePasswordDetailsErrors[key] = errors[key];
    }
    updatePasswordDetailsErrors = {
      ...updatePasswordDetailsErrors,
      ["oldPasswordError"]: oldPasswordValidator(
        changePasswordForm,
        currentUserPassword
      ),
      ["newPasswordError"]: newPasswordValidator(changePasswordForm),
      ["confirmNewPasswordError"]:
        confirmNewPasswordValidator(changePasswordForm),
    };
    setErrors(updatePasswordDetailsErrors);
    if (
      Object.values(updatePasswordDetailsErrors).every(
        (x) => x === null || x === ""
      )
    ) {
      const params = {
        oldPassword: getCipheredText(changePasswordForm.oldPassword),
        newPassword: getCipheredText(changePasswordForm.newPassword),
        confirmNewPassword: getCipheredText(
          changePasswordForm.confirmNewPassword
        ),
        loggedInUser: loggedInUser,
      };
      dispatch(postChangePassword(params));
      onClose();
    }
  };

  const checkIfErroneous = (fieldName) => {
    let updatedErrorField = Object.entries(errors).filter((key) =>
      key[0].includes(fieldName)
    );
    return updatedErrorField[0][1] ? true : false;
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Fade in={open}>
        <Box sx={muiStyle}>
          <Box className={styles.spaceBetween}>
            <Typography>Change Password</Typography>
            <Button disableRipple onClick={onClose}>
              Close
            </Button>
          </Box>
          <Box sx={modalStyle}>
            {changePasswordFormFields?.map((eachField) => {
              return (
                <TextField
                  key={`${eachField.id}_${eachField.value}`}
                  id={eachField.value}
                  label={eachField.label}
                  onChange={(event) =>
                    handleChangePasswordFormChange(event, eachField.value)
                  }
                  style={{ marginTop: "4%" }}
                  error={checkIfErroneous(eachField.value)}
                  helperText={errors[`${eachField.value}Error`]}
                  required
                />
              );
            })}
            <Box sx={buttonStyle}>
              <Button
                variant="contained"
                component="span"
                size="large"
                color="primary"
                onClick={validatePasswordChange}
                disableRipple
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ChangePasswordModal;
