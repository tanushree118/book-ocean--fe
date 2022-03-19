import { useState } from "react";
import { CONSTANTS } from "../shared/constants";
import {
  TextField,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import styles from "./login-page.module.scss";

const LoginPage = ({
  userCredentials,
  setUserCredentials,
  handleUserRegistration,
  handleUserLogIn,
  loginCredentialsErrors,
  invalidCredentials,
}) => {
  const { USERNAME, PASSWORD, REGISTER, LOG_IN, SHOW_PASSWORD_TEXT } =
    CONSTANTS;
  const [showPassword, setShowPassword] = useState(false);
  const handleUserCredentialsChange = (event, fieldName) => {
    setUserCredentials({
      ...userCredentials,
      [fieldName]: event.target.value,
    });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <Box className={styles.loginBox}>
        <form onSubmit={handleUserLogIn}>
          <Box className={styles.loginFieldBox}>
            {invalidCredentials ? (
              <p className={styles.invalidCredentialsMsg}>
                {"Invalid username or password"}
              </p>
            ) : (
              ""
            )}
            <TextField
              required
              id="username-required"
              label={USERNAME}
              error={loginCredentialsErrors.usernameError ? true : false}
              className={styles.textField}
              helperText={loginCredentialsErrors.usernameError}
              onChange={(event) =>
                handleUserCredentialsChange(event, "username")
              }
            />
            <TextField
              required
              id="password-required"
              type={showPassword ? "text" : "password"}
              label={PASSWORD}
              error={loginCredentialsErrors.passwordError ? true : false}
              helperText={loginCredentialsErrors.passwordError}
              onChange={(event) =>
                handleUserCredentialsChange(event, "password")
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={showPassword}
                  onChange={handleShowPassword}
                />
              }
              label={SHOW_PASSWORD_TEXT}
            />
          </Box>
          <Box className={styles.loginButtons}>
            <Button
              variant="contained"
              className={styles.registerButton}
              onClick={handleUserRegistration}
            >
              {REGISTER}
            </Button>
            <Button type="submit" variant="contained" onClick={handleUserLogIn}>
              {LOG_IN}
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default LoginPage;
