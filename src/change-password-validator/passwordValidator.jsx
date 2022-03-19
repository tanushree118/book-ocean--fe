export const oldPasswordValidator = (
  changePasswordForm,
  currentUserPassword
) => {
  return (
    getErrorForInvalidPassword(changePasswordForm, currentUserPassword) ||
    getErrorForEmptyOldPassword(changePasswordForm) ||
    ""
  );
};

const getErrorForEmptyOldPassword = (changePasswordForm) => {
  return !changePasswordForm.oldPassword && "Enter old password";
};

const getErrorForInvalidPassword = (
  changePasswordForm,
  currentUserPassword
) => {
  return (
    changePasswordForm.oldPassword !== currentUserPassword &&
    "Enter correct password"
  );
};

export const newPasswordValidator = (changePasswordForm) => {
  return (
    getErrorForEmptyNewPassword(changePasswordForm) ||
    getErrorForIncorrectPassword(changePasswordForm) ||
    getErrorForSameOldAndNewPassword(changePasswordForm) ||
    ""
  );
};

const getErrorForEmptyNewPassword = (changePasswordForm) => {
  return !changePasswordForm.newPassword && "Enter new password";
};

const getErrorForIncorrectPassword = (changePasswordForm) => {
  return (
    changePasswordForm?.newPassword?.length < 8 &&
    "Use 8 characters or more for your password"
  );
};

const getErrorForSameOldAndNewPassword = (changePasswordForm) => {
  return (
    changePasswordForm?.oldPassword === changePasswordForm?.newPassword &&
    "Old and New Passwords should not match"
  );
};

export const confirmNewPasswordValidator = (changePasswordForm) => {
  return (
    getErrorForEmptyConfirmPassword(changePasswordForm) ||
    getErrorForMismatchedNewPasswords(changePasswordForm) ||
    ""
  );
};

const getErrorForEmptyConfirmPassword = (changePasswordForm) => {
  return !changePasswordForm.confirmNewPassword && "Confirm the password";
};

const getErrorForMismatchedNewPasswords = (changePasswordForm) => {
  return (
    changePasswordForm.confirmNewPassword &&
    changePasswordForm.newPassword !== changePasswordForm.confirmNewPassword &&
    "Passwords don't match"
  );
};
