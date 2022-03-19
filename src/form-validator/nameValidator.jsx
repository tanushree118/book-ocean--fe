const nameValidator = (registrationFormData) => {
  return (
    getErrorForEmptyFirstAndLastNames(registrationFormData) ||
    getErrorForEmptyFirstName(registrationFormData) ||
    getErrorForEmptyLastName(registrationFormData) ||
    ""
  );
};

const getErrorForEmptyFirstAndLastNames = (registrationFormData) => {
  return (
    !registrationFormData.firstname &&
    !registrationFormData.lastname &&
    "Enter first and last names"
  );
};
const getErrorForEmptyFirstName = (registrationFormData) => {
  return !registrationFormData.firstname && "Enter first name";
};
const getErrorForEmptyLastName = (registrationFormData) => {
  return !registrationFormData.lastname && "Enter last name";
};

export default nameValidator;