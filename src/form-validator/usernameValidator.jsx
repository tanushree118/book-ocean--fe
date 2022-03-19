const usernameValidator = (registrationFormData, alreadyRegisteredUsers) => {
  return getErrorForEmptyUsername(registrationFormData) || getErrorForDuplicateUsername(registrationFormData, alreadyRegisteredUsers) || "";
};
const getErrorForEmptyUsername = (registrationFormData) => {
  return !registrationFormData.username && "Enter username";
};
const getErrorForDuplicateUsername = (registrationFormData, alreadyRegisteredUsers) => {
  return (
    registrationFormData.username &&
    alreadyRegisteredUsers.includes(registrationFormData.username) &&
    "Username already exists"
  );
};

export default usernameValidator;
