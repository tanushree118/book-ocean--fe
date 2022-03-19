const passwordsValidator = (registrationFormData) => {
  return (
    getErrorForEmptyPassword(registrationFormData) ||
    getErrorForIncorrectPassword(registrationFormData) ||
    getErrorForEmptyConfirmPassword(registrationFormData) ||
    getErrorForMismatchedPasswords(registrationFormData) ||
    ""
  );
};
const getErrorForEmptyPassword = (registrationFormData) => {
  return !registrationFormData.password && "Enter password";
};
const getErrorForIncorrectPassword = (registrationFormData) => {
  return (
    registrationFormData?.password?.length < 8 &&
    "Use 8 characters or more for your password"
  );
};
const getErrorForEmptyConfirmPassword = (registrationFormData) => {
  return !registrationFormData.confirmPassword && "Confirm your password";
};
const getErrorForMismatchedPasswords = (registrationFormData) => {
  return (
    registrationFormData.password.localeCompare(
      registrationFormData.confirmPassword
    ) !== 0 && "Those passwords didn’t match. Try again."
  );
};

export default passwordsValidator;
