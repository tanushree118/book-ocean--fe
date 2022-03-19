import { emailRegex } from "../shared/utils.jsx";

const emailValidator = (registrationFormData) => {
  return (
    getErrorForEmptyEmail(registrationFormData) ||
    getErrorForIncorrectEmail(registrationFormData) ||
    ""
  );
};

const getErrorForEmptyEmail = (registrationFormData) => {
  return !registrationFormData.emailAddress && "Enter email address";
};

const getErrorForIncorrectEmail = (registrationFormData) => {
  return (
    registrationFormData.emailAddress &&
    !registrationFormData.emailAddress.toLowerCase().match(emailRegex) &&
    "Invalid email address"
  );
};

export default emailValidator;
