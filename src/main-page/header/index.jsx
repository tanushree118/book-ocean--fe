import React, { useState, useEffect } from "react";
import {
  Avatar,
  Divider,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import styles from "../main-page.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  clearStore,
  getUserPassword,
  postChangePasswordResponse,
} from "../../state/actions";
import ChangePasswordModal from "../modal/changePasswordModal";

const defaultPasswordFormFields = {
  oldPassword: "",
  newPassword: "",
  confirmNewPassword: "",
};
const defaultPasswordFormErrors = {
  oldPasswordError: "",
  newPasswordError: "",
  confirmNewPasswordError: "",
};
const Header = (props) => {
  const dispatch = useDispatch();
  const { loggedInUser } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [openChangePasswordModal, setOpenChangePassordModal] = useState(false);
  const [changePasswordForm, setChangePasswordForm] = useState(
    defaultPasswordFormFields
  );
  const [errors, setErrors] = useState(defaultPasswordFormErrors);
  const currentUserPassword = useSelector(
    (state) => state?.currentUserPassword
  );
  const changePasswordResponse = useSelector(
    (state) => state?.changePasswordResponse
  );
  const [alertDetails, setAlertDetails] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const open = Boolean(anchorEl);
  useEffect(() => {
    if (changePasswordResponse) {
      setAlertDetails({
        open: true,
        message: "Password changed successfully",
        severity: "success",
      });
      dispatch(postChangePasswordResponse(null));
    } else if (changePasswordResponse !== null && !changePasswordResponse) {
      setAlertDetails({
        open: false,
        message: "Password couldn't be changed",
        severity: "failure",
      });
      dispatch(postChangePasswordResponse(null));
    }
  }, [changePasswordResponse]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    dispatch(clearStore());
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChangePassword = async () => {
    setOpenChangePassordModal(true);
    setAnchorEl(null);
    dispatch(getUserPassword(loggedInUser));
  };
  const closeChangePasswordModal = () => {
    setOpenChangePassordModal(false);
    setChangePasswordForm(defaultPasswordFormFields);
    setErrors(defaultPasswordFormErrors);
  };
  const onCloseAlert = () => {
    setAlertDetails({ open: false, message: "", severity: "success" });
  };
  return (
    <>
      <div className={styles.navBarContainer}>
        <Avatar className={styles.avatar} onClick={handleClick}>
          {loggedInUser?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
          <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
        </Menu>
      </div>
      <Divider className={styles.divider} />
      <ChangePasswordModal
        open={openChangePasswordModal}
        onClose={closeChangePasswordModal}
        changePasswordForm={changePasswordForm}
        setChangePasswordForm={setChangePasswordForm}
        errors={errors}
        setErrors={setErrors}
        loggedInUser={loggedInUser}
        currentUserPassword={currentUserPassword}
      />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={alertDetails.open}
        autoHideDuration={6000}
        onClose={onCloseAlert}
      >
        <Alert
          onClose={onCloseAlert}
          severity={alertDetails.severity}
          sx={{ width: "100%" }}
        >
          {alertDetails.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;
