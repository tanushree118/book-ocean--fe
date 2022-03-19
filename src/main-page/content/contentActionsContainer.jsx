import React from "react";
import styles from "../main-page.module.scss";
import { Button, Box, TextField, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/Upload";
import SuggestionBox from "@mui/icons-material/AddShoppingCart";

const ContentActionsContainer = ({
  searchText,
  onSearchTextChange,
  onClearClick,
  handleUploadButtonClick,
  handleSuggestionClick,
}) => {
  return (
    <Box className={styles.headerContainer}>
      <TextField
        value={searchText}
        className={styles.searchField}
        placeholder={"Search by book name, author"}
        onChange={onSearchTextChange}
        InputProps={{
          endAdornment: (
            <CloseIcon
              className={`${
                (!searchText?.length && styles.crossIcon) ||
                styles.visibleCrossIcon
              }`}
              onClick={onClearClick}
            />
          ),
        }}
      />
      <Box className={styles.uploadAndSuggestionContainer}>
        <Button
          onClick={handleUploadButtonClick}
          variant="contained"
          className={styles.uploadButton}
          disableRipple
        >
          <span>Upload Book</span>
          <UploadIcon />
        </Button>
        <Button
          onClick={handleSuggestionClick}
          variant="contained"
          className={styles.suggestionButton}
          disableRipple
        >
          <span>Suggestion Box</span>
          <SuggestionBox />
        </Button>
      </Box>
    </Box>
  );
};

export default ContentActionsContainer;
