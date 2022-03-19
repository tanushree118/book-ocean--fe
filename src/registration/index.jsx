import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import styles from "./registration-page.module.scss";
import { CONSTANTS } from "../shared/constants";

const RegistrationPage = ({
  registrationFormData,
  setRegistrationFormData,
  backToLogin,
  handleRegistrationFormSubmission,
  registrationFormDataErrors,
}) => {
  const {
    CREATE_ACCOUNT_TEXT,
    FIRSTNAME,
    LASTNAME,
    EMAIL_ADDRESS,
    USERNAME,
    PASSWORD,
    CONFIRM,
    SHOW_PASSWORD_TEXT,
    LOG_IN_INSTEAD,
    SUBMIT,
  } = CONSTANTS;

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleRegistrationFormDataChange = (event, fieldName) => {
    setRegistrationFormData({
      ...registrationFormData,
      [fieldName]: event.target.value,
    });
  };
  return (
    <Box className={styles.registrationBox}>
      <p>{CREATE_ACCOUNT_TEXT}</p>
      <Box className={styles.nameBox}>
        <TextField
          id="firstname"
          label={FIRSTNAME}
          className={styles.firstTextField}
          onChange={(event) =>
            handleRegistrationFormDataChange(event, "firstname")
          }
          value={registrationFormData.firstname}
          error={registrationFormDataErrors.nameError ? true : false}
          helperText={registrationFormDataErrors.nameError}
        />
        <TextField
          id="lastname"
          label={LASTNAME}
          onChange={(event) =>
            handleRegistrationFormDataChange(event, "lastname")
          }
          value={registrationFormData.lastname}
          error={registrationFormDataErrors.nameError ? true : false}
        />
      </Box>
      <Box>
        <TextField
          id="emailAddress"
          label={EMAIL_ADDRESS}
          className={styles.emailAddressField}
          onChange={(event) =>
            handleRegistrationFormDataChange(event, "emailAddress")
          }
          value={registrationFormData.emailAddress}
          error={registrationFormDataErrors.emailAddressError ? true : false}
          helperText={registrationFormDataErrors.emailAddressError}
        />
      </Box>
      <Box>
        <TextField
          id="username"
          label={USERNAME}
          className={styles.emailAddressField}
          onChange={(event) =>
            handleRegistrationFormDataChange(event, "username")
          }
          value={registrationFormData.username}
          error={registrationFormDataErrors.usernameError ? true : false}
          helperText={registrationFormDataErrors.usernameError}
        />
      </Box>
      <Box className={styles.passwordBox}>
        <TextField
          id="password"
          label={PASSWORD}
          type={showPassword ? "text" : "password"}
          className={styles.firstTextField}
          onChange={(event) =>
            handleRegistrationFormDataChange(event, "password")
          }
          value={registrationFormData.password}
          error={registrationFormDataErrors.passwordError ? true : false}
          helperText={registrationFormDataErrors.passwordError}
        />
        <TextField
          id="confirm"
          label={CONFIRM}
          type={showPassword ? "text" : "password"}
          onChange={(event) =>
            handleRegistrationFormDataChange(event, "confirmPassword")
          }
          value={registrationFormData.confirmPassword}
          error={registrationFormDataErrors.passwordError ? true : false}
        />
      </Box>
      <Box className={styles.fieldWidth}>
        <FormControlLabel
          control={
            <Checkbox checked={showPassword} onChange={handleShowPassword} />
          }
          label={SHOW_PASSWORD_TEXT}
        />
      </Box>
      <Box className={styles.registrationButtons}>
        <Button variant="contained" disableRipple onClick={backToLogin}>
          {LOG_IN_INSTEAD}
        </Button>
        <Button
          onClick={handleRegistrationFormSubmission}
          variant="contained"
          disableRipple
        >
          {SUBMIT}
        </Button>
      </Box>
    </Box>
  );
};

export default RegistrationPage;
