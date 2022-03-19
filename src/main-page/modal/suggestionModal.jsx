import React from "react";
import { useDispatch } from "react-redux";
import { Button, Modal, Box, Fade, TextField, Typography } from "@mui/material";
import {
  bookNameValidator,
  authorValidator,
} from "../../suggestion-form-validator/bookNameAuthorValidator";
import styles from "../main-page.module.scss";
import { postSuggestionDetails } from "../../state/actions";
import useMediaQuery from '@mui/material/useMediaQuery';

let muiStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
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
const suggestionFormFields = [
  {
    id: 1,
    label: "Book name",
    value: "bookName",
  },
  {
    id: 2,
    label: "Author",
    value: "author",
  },
];

const SuggestionModal = ({
  open,
  onClose,
  suggestionDetails,
  setSuggestionDetails,
  suggestionErrors,
  setSuggestionErrors,
  loggedInUser,
}) => {
  const matches = useMediaQuery('(max-width:600px)');
  if (matches) {
    muiStyle = {
      ...muiStyle,
      width: 300
    }
  } else {
    muiStyle = {
      ...muiStyle,
      width: 400
    }
  }
  const dispatch = useDispatch();
  const handleSuggestionDetailsChange = (event, fieldValue) => {
    const value = event.target.value;
    let updatedSuggestionDetails = {
      ...suggestionDetails,
      [fieldValue]: value,
    };
    setSuggestionDetails(updatedSuggestionDetails);
  };

  const validateSuggestionFormFields = (event) => {
    event.preventDefault();
    let updatedSuggestionDetailsErrors = {};
    for (let key in suggestionErrors) {
      updatedSuggestionDetailsErrors[key] = suggestionErrors[key];
    }
    updatedSuggestionDetailsErrors = {
      ...updatedSuggestionDetailsErrors,
      ["bookNameError"]: bookNameValidator(suggestionDetails),
      ["authorError"]: authorValidator(suggestionDetails),
    };
    setSuggestionErrors(updatedSuggestionDetailsErrors);
    if (
      Object.values(updatedSuggestionDetailsErrors).every(
        (x) => x === null || x === ""
      )
    ) {
      const params = {
        bookName: suggestionDetails.bookName,
        author: suggestionDetails.author,
        requested_by: loggedInUser,
      };
      dispatch(postSuggestionDetails(params));
      onClose();
    }
  };

  const checkIfErroneous = (fieldName) => {
    let updatedErrorField = Object.entries(suggestionErrors).filter((key) =>
      key[0].includes(fieldName)
    );
    return updatedErrorField[0][1] ? true : false;
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Fade in={open}>
        <Box sx={muiStyle}>
          <Box className={styles.spaceBetween}>
            <Typography>Submit a suggestion</Typography>
            <Button disableRipple onClick={onClose}>
              Close
            </Button>
          </Box>
          <form onSubmit={validateSuggestionFormFields}>
            <Box sx={modalStyle}>
              {suggestionFormFields?.map((eachField) => {
                return (
                  <TextField
                    key={`${eachField.id}_${eachField.value}`}
                    id={eachField.value}
                    label={eachField.label}
                    onChange={(event) =>
                      handleSuggestionDetailsChange(event, eachField.value)
                    }
                    style={{ marginTop: "4%" }}
                    error={checkIfErroneous(eachField.value)}
                    helperText={suggestionErrors[`${eachField.value}Error`]}
                    required
                  />
                );
              })}
              <Box sx={buttonStyle}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => validateSuggestionFormFields(event)}
                  type="submit"
                  disableRipple
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SuggestionModal;
