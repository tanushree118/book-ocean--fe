import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./login";
import RegistrationPage from "./registration";
import styles from "./App.module.scss";
import { CONSTANTS } from "./shared/constants";
import { Snackbar, Alert } from "@mui/material";
import {
  getAllRegisteredUsers,
  getIfUserRegistered,
  resetIsUserRegistered,
  postUserRegistration,
  resetUserRegistration,
  storeLoggedInUser,
} from "./state/actions";
import CryptoJS from "crypto-js";
import MainPage from "./main-page";
import nameValidator from "./form-validator/nameValidator";
import emailValidator from "./form-validator/emailValidator";
import usernameValidator from "./form-validator/usernameValidator";
import passwordsValidator from "./form-validator/passwordsValidator";

const defaultUserCredentials = {
  username: "",
  password: "",
};
const defaultLoginCredentialsErrors = {
  usernameError: "",
  passwordError: "",
};
const defaultRegistrationFormData = {
  firstname: "",
  lastname: "",
  emailAddress: "",
  username: "",
  password: "",
  confirmPassword: "",
};

const defaultRegistrationFormDataErrors = {
  nameError: "",
  emailAddressError: "",
  usernameError: "",
  passwordError: "",
};
const App = () => {
  const dispatch = useDispatch();
  const { EMPTY_FIELD_ERROR_TEXT } = CONSTANTS;
  const [userCredentials, setUserCredentials] = useState(
    defaultUserCredentials
  );
  const [isUserRegisterationTriggered, setIsUserRegisterationTriggered] =
    useState(false);
  const [loginCredentialsErrors, setLoginCredentialsErrors] = useState(
    defaultLoginCredentialsErrors
  );
  const [registrationFormData, setRegistrationFormData] = useState(
    defaultRegistrationFormData
  );
  const [registrationFormDataErrors, setRegistrationFormDataErrors] = useState(
    defaultRegistrationFormDataErrors
  );
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [alertDetails, setAlertDetails] = useState({
    open: false,
    message: "",
    severtiy: "success",
  });
  const alreadyRegisteredUsers = useSelector(
    (state) => state?.registeredUsersList
  );
  const isUserRegistered = useSelector((state) => state?.isUserRegistered);

  const isUserRegistrationSuccessful = useSelector(
    (state) => state?.isUserRegistrationSuccessful
  );

  useEffect(() => {
    dispatch(getAllRegisteredUsers());
  }, []);

  useEffect(() => {
    if (isUserRegistered) {
      setInvalidCredentials(false);
      dispatch(storeLoggedInUser(userCredentials.username));
    } else if (isUserRegistered !== null && !isUserRegistered) {
      setInvalidCredentials(true);
      dispatch(resetIsUserRegistered());
    }
  }, [isUserRegistered]);

  useEffect(() => {
    if (isUserRegistrationSuccessful) {
      setRegistrationFormData(defaultRegistrationFormData);
      setAlertDetails({
        open: true,
        message: "User registration successful",
        severtiy: "success",
      });
      dispatch(resetUserRegistration());
    } else if (
      isUserRegistrationSuccessful !== null &&
      !isUserRegistrationSuccessful
    ) {
      setAlertDetails({
        open: true,
        message: "User registration unsuccessful",
        severity: "error",
      });
      dispatch(resetUserRegistration());
    }
  }, [isUserRegistrationSuccessful]);

  const newUserApiCall = () => {
    let cipherPassword = CryptoJS.AES.encrypt(
      registrationFormData.password,
      "my-secret-key@123"
    ).toString();
    let encryptedCredentials = {
      ...registrationFormData,
      password: cipherPassword,
      confirmPassword: cipherPassword,
    };
    dispatch(postUserRegistration(encryptedCredentials));
  };
  const handleUserRegistration = () => {
    setIsUserRegisterationTriggered(true);
  };
  const validateUserCredentials = () => {
    let updateLoginCredentialsErrors = {};
    for (let key in loginCredentialsErrors) {
      updateLoginCredentialsErrors[key] = loginCredentialsErrors[key];
    }
    if (!userCredentials.username) {
      updateLoginCredentialsErrors = {
        ...updateLoginCredentialsErrors,
        ["usernameError"]: EMPTY_FIELD_ERROR_TEXT,
      };
    }
    if (!userCredentials.password) {
      updateLoginCredentialsErrors = {
        ...updateLoginCredentialsErrors,
        ["passwordError"]: EMPTY_FIELD_ERROR_TEXT,
      };
    }
    setLoginCredentialsErrors(updateLoginCredentialsErrors);
  };
  const handleUserLogIn = async (event) => {
    event.preventDefault();
    if (!userCredentials.username || !userCredentials.password) {
      validateUserCredentials();
    } else {
      setLoginCredentialsErrors(defaultLoginCredentialsErrors);
      let ciphertext = CryptoJS.AES.encrypt(
        userCredentials.password,
        "my-secret-key@123"
      ).toString();
      let updatedCredentials = {
        ...userCredentials,
        password: ciphertext,
      };
      dispatch(getIfUserRegistered(updatedCredentials));
    }
  };
  const backToLogin = () => {
    setIsUserRegisterationTriggered(false);
    setUserCredentials(defaultUserCredentials);
    setLoginCredentialsErrors(defaultLoginCredentialsErrors);
    setRegistrationFormDataErrors(defaultRegistrationFormDataErrors);
  };

  const validateRegistrationFormData = () => {
    let updateRegistrationFormDataErrors = {};
    for (let key in registrationFormDataErrors) {
      updateRegistrationFormDataErrors[key] = registrationFormDataErrors[key];
    }
    updateRegistrationFormDataErrors = {
      ...updateRegistrationFormDataErrors,
      ["nameError"]: nameValidator(registrationFormData),
      ["emailAddressError"]: emailValidator(registrationFormData),
      ["usernameError"]: usernameValidator(
        registrationFormData,
        alreadyRegisteredUsers
      ),
      ["passwordError"]: passwordsValidator(registrationFormData),
    };
    setRegistrationFormDataErrors(updateRegistrationFormDataErrors);
    if (
      Object.values(updateRegistrationFormDataErrors).every(
        (x) => x === null || x === ""
      )
    ) {
      newUserApiCall();
    }
  };
  const handleRegistrationFormSubmission = async () => {
    validateRegistrationFormData();
  };
  const onCloseAlert = () => {
    setAlertDetails({ open: false, message: "", severity: "success" });
  };
  return (
    <div className={styles.loginContainer}>
      {!isUserRegistered ? (
        (!isUserRegisterationTriggered && (
          <LoginPage
            userCredentials={userCredentials}
            setUserCredentials={setUserCredentials}
            handleUserRegistration={handleUserRegistration}
            handleUserLogIn={handleUserLogIn}
            loginCredentialsErrors={loginCredentialsErrors}
            validateUserCredentials={validateUserCredentials}
            invalidCredentials={invalidCredentials}
          />
        )) || (
          <RegistrationPage
            registrationFormData={registrationFormData}
            setRegistrationFormData={setRegistrationFormData}
            backToLogin={backToLogin}
            handleRegistrationFormSubmission={handleRegistrationFormSubmission}
            registrationFormDataErrors={registrationFormDataErrors}
          />
        )
      ) : (
        <MainPage />
      )}
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
    </div>
  );
};

export default App;
