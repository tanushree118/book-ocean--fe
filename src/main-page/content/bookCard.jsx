import React from "react";
import {
  Button,
  Box,
  Typography,
  Tooltip,
  IconButton,
  Popover,
} from "@mui/material";
import { DeleteOutlined, FileDownloadOutlined } from "@mui/icons-material";
import styles from "../main-page.module.scss";

const BookCard = ({
  index,
  eachBook,
  handleViewMoreClick,
  openPopover,
  anchorEl,
  handlePopoverClose,
  viewMoreModal,
  downloadBook,
  loggedInUser,
  onBookDelete,
}) => {
  const popoverId = openPopover ? "simple-popover" : undefined;
  return (
    <Box className={styles.bookContainer} key={index}>
      <Box>
        <Typography className={styles.bookTitle}>{eachBook.name}</Typography>
        <Typography className={styles.bookAuthor}>{eachBook.author}</Typography>
        <Box className={styles.centerAligned}>
          <Button
            disableRipple
            onClick={(event) => handleViewMoreClick(event, eachBook)}
          >
            View more
          </Button>
          <Popover
            id={popoverId}
            open={openPopover}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box
              sx={{
                border: 1,
                p: 1,
              }}
            >
              {viewMoreModal()}
            </Box>
          </Popover>
          <Tooltip title={"Download"}>
            <IconButton
              onClick={() =>
                downloadBook(eachBook.file_name, eachBook.file_size)
              }
            >
              <FileDownloadOutlined
                color="primary"
                style={{ cursor: "pointer" }}
              />
            </IconButton>
          </Tooltip>
          {loggedInUser?.toLowerCase() ===
            eachBook.contributor?.toLowerCase() && (
            <Tooltip title={"Delete"}>
              <IconButton onClick={() => onBookDelete(eachBook)}>
                <DeleteOutlined color="primary" style={{ cursor: "pointer" }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BookCard;
