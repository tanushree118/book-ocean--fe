import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBooksDetails,
  uploadFile,
  uploadFileStatus,
  uploadFileDetails,
  downloadFile,
  deleteFile,
  deleteFileResponse,
  postSuggestionDetailsResponse,
} from "../../state/actions";
import {
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { uploadFormFields } from "../../shared/constants";
import styles from "../main-page.module.scss";
import BookCard from "./bookCard";
import UploadModal from "../modal/uploadModal";
import DeleteModal from "../modal/deleteModal";
import NoResultFoundModal from "../no-result-found";
import SuggestionModal from "../modal/suggestionModal";
import CloseIcon from "@mui/icons-material/Close";
import ContentActionsContainer from "./contentActionsContainer";

const defaultBookDetails = {
  bookName: "",
  author: "",
  genre: "",
  aboutBook: "",
};

const defaultErrors = {
  bookNameError: "",
  authorError: "",
  genreError: "",
  aboutBookError: "",
};

const defaultSuggestionDetails = {
  bookName: "",
  author: "",
};

const defaultSuggestionErrors = {
  bookNameError: "",
  authorError: "",
};

const Content = (props) => {
  const dispatch = useDispatch();
  const { loggedInUser } = props;
  const [alertDetails, setAlertDetails] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [open, setOpen] = useState(false);
  const [uploadBookDetails, setUploadBookDetails] =
    useState(defaultBookDetails);
  const [errors, setErrors] = useState(defaultErrors);
  const [genres, setGenres] = useState([]);
  const [selectedFile, setSelectedFile] = useState({});
  const [selectedBook, setSelectedBook] = useState({});
  const [searchText, setSearchText] = useState("");
  const [filteredBookDetails, setFilteredBookDetails] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSuggestionModal, setOpenSuggestionModal] = useState(false);
  const [suggestionDetails, setSuggestionDetails] = useState(
    defaultSuggestionDetails
  );
  const [suggestionErrors, setSuggestionErrors] = useState(
    defaultSuggestionErrors
  );
  const booksDetails = useSelector((state) => state?.booksDetails);
  const uploadFileResponse = useSelector((state) => state?.uploadFileResponse);
  const deleteFileResult = useSelector((state) => state?.deleteFileResponse);
  const uploadFileDetailsResponse = useSelector(
    (state) => state?.uploadFileDetailsResponse
  );
  const storeSuggestionResult = useSelector(
    (state) => state?.storeSuggestionResponse
  );

  const handleViewMoreClick = (event, bookInfo) => {
    setSelectedBook(bookInfo);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  useEffect(() => {
    dispatch(getAllBooksDetails());
  }, []);
  useEffect(() => {
    let temp = booksDetails?.map((book) => book.genre);
    setGenres(Array.from(new Set(temp)));
    setFilteredBookDetails(booksDetails);
  }, [booksDetails]);
  useEffect(() => {
    if (uploadFileResponse?.length) {
      if (uploadFileResponse[0]?.status) {
        const uploadBookDetailsPayload = {
          ...uploadBookDetails,
          contributor: loggedInUser,
          fileName: selectedFile.fileName,
          fileSize: selectedFile.fileSize,
        };
        dispatch(uploadFileDetails(uploadBookDetailsPayload));
        dispatch(uploadFileStatus([]));
        setAlertDetails({
          open: true,
          message: "File uploaded successfully",
          severity: "success",
        });
      } else {
        dispatch(uploadFileStatus([]));
        alert(uploadFileResponse[0]?.message);
      }
      setOpen(false);
    }
  }, [uploadFileResponse]);

  useEffect(() => {
    if (uploadFileDetailsResponse?.length > 0) {
      if (!uploadFileDetailsResponse[0]?.status) {
        setAlertDetails({
          open: true,
          message: "Book Details couldn't be inserted",
          severity: "error",
        });
      }
    } else {
      let temp1 = booksDetails?.map((book) => book.genre);
      setGenres(Array.from(new Set(temp1)));
    }
  }, [uploadFileDetailsResponse]);

  useEffect(() => {
    if (deleteFileResult) {
      setAlertDetails({
        open: true,
        message: "File deleted successfully",
        severity: "success",
      });
      dispatch(deleteFileResponse(null));
    } else if (deleteFileResult !== null && !deleteFileResult) {
      setAlertDetails({
        open: true,
        message: "File deletion unsuccessful",
        severity: "error",
      });
      dispatch(deleteFileResponse(null));
    }
  }, [deleteFileResult]);

  useEffect(() => {
    let updatedBookDetails = booksDetails?.filter((eachBook) => {
      if (
        eachBook.name
          ?.toLowerCase()
          ?.trim()
          .includes(searchText?.toLowerCase()?.trim()) ||
        eachBook.author
          ?.toLowerCase()
          ?.trim()
          .includes(searchText?.toLowerCase()?.trimEnd())
      ) {
        return { ...eachBook };
      }
    });
    let updatedGenres = updatedBookDetails?.map((book) => book.genre);
    setGenres(Array.from(new Set(updatedGenres)));
    setFilteredBookDetails([...updatedBookDetails]);
  }, [searchText]);

  useEffect(() => {
    if (storeSuggestionResult) {
      setAlertDetails({
        open: true,
        message: "Suggestion stored successfully",
        severity: "success",
      });
      dispatch(postSuggestionDetailsResponse(null));
    } else if (storeSuggestionResult !== null && !storeSuggestionResult) {
      setAlertDetails({
        open: true,
        message: "Suggestion couldn't be saved",
        severity: "error",
      });
      dispatch(postSuggestionDetailsResponse(null));
    }
  });
  const handleUploadButtonClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setUploadBookDetails(defaultBookDetails);
    setErrors(defaultErrors);
  };

  const handleBookDetailsChange = (event, fieldName) => {
    setUploadBookDetails({
      ...uploadBookDetails,
      [fieldName]: event.target.value,
    });
  };
  const checkIfErroneous = (fieldName) => {
    let updatedErrorField = Object.entries(errors).filter((key) =>
      key[0].includes(fieldName)
    );
    return updatedErrorField[0][1] ? true : false;
  };
  const validateBookDetails = async (event) => {
    let updatedErrors = {};
    for (let key in errors) {
      updatedErrors[key] = errors[key];
    }
    let fieldName;
    Object.entries(uploadBookDetails).forEach((field) => {
      if (!field[1]) {
        Object.entries(errors).forEach((key) => {
          if (key[0].includes(field[0])) {
            fieldName = uploadFormFields.filter(
              (item) => item.value === field[0]
            );
            updatedErrors = {
              ...updatedErrors,
              [key[0]]: `Enter ${fieldName[0].label}`,
            };
          }
        });
      } else {
        Object.entries(errors).forEach((key) => {
          if (key[0].includes(field[0])) {
            fieldName = uploadFormFields.filter(
              (item) => item.value === field[0]
            );
            updatedErrors = {
              ...updatedErrors,
              [key[0]]: "",
            };
          }
        });
      }
    });
    setErrors(updatedErrors);
    if (Object.values(updatedErrors).every((x) => x === null || x === "")) {
      let tempSelectedFile = event.target.files[0];
      setSelectedFile({
        fileName: tempSelectedFile.name,
        fileSize: tempSelectedFile.size,
      });
      const formData = new FormData();
      formData.append("myFile", tempSelectedFile, tempSelectedFile.name);
      dispatch(uploadFile(formData));
    }
  };

  const downloadBook = async (fileName, fileSize) => {
    const data = {
      fileName: fileName,
      fileSize: fileSize,
    };
    dispatch(downloadFile(data));
  };

  const onCloseHandler = () => {
    setAnchorEl(null);
  };

  const onSearchTextChange = (event) => {
    let { value } = event.target;
    setSearchText(value);
  };

  const onCloseAlert = () => {
    setAlertDetails({ open: false, message: "", severity: "success" });
  };

  const onBookDelete = async (bookDetails) => {
    setOpenDeleteModal(true);
    setSelectedBook(bookDetails);
  };

  const onConfirmBookDelete = () => {
    dispatch(
      deleteFile({
        fileName: selectedBook.file_name,
        contributor: selectedBook.contributor,
        fileSize: selectedBook.file_size,
        bookName: selectedBook.name,
      })
    );
    setSelectedBook({});
    setOpenDeleteModal(false);
  };

  const viewMoreModal = () => (
    <div className={styles.viewMoreContainer}>
      <Box>
        <Typography className={styles.bookTitle}>
          {selectedBook.name}
        </Typography>
        <Typography className={styles.bookAuthor}>
          {selectedBook.author}
        </Typography>
        <Typography className={styles.about_file}>
          {selectedBook.about_file}
        </Typography>
      </Box>
      <Button
        onClick={onCloseHandler}
        style={{ fontWeight: "bold" }}
        disableRipple
      >
        <CloseIcon />
      </Button>
    </div>
  );

  const handleSuggestionClick = () => {
    setOpenSuggestionModal(true);
  };
  const handleSuggestionClose = () => {
    setOpenSuggestionModal(false);
    setSuggestionDetails(defaultSuggestionDetails);
    setSuggestionErrors(defaultSuggestionErrors);
  };
  const onClearClick = () => {
    setSearchText("");
  };
  return (
    <div className={styles.contentContainer}>
      <Box className={styles.fullContainer}>
        <ContentActionsContainer
          searchText={searchText}
          onSearchTextChange={onSearchTextChange}
          onClearClick={onClearClick}
          handleUploadButtonClick={handleUploadButtonClick}
          handleSuggestionClick={handleSuggestionClick}
        />
        {(genres?.length > 0 &&
          genres?.map((eachGenre, id) => {
            return (
              <Box key={id}>
                <h1>{eachGenre}</h1>
                <Box className={styles.scrollContainer}>
                  <Box className={styles.genreContainer}>
                    {filteredBookDetails?.map((eachBook, index) => {
                      return (
                        eachBook.genre === eachGenre && (
                          <BookCard
                            index={index}
                            eachBook={eachBook}
                            handleViewMoreClick={handleViewMoreClick}
                            openPopover={openPopover}
                            anchorEl={anchorEl}
                            handlePopoverClose={handlePopoverClose}
                            viewMoreModal={viewMoreModal}
                            downloadBook={downloadBook}
                            loggedInUser={loggedInUser}
                            onBookDelete={onBookDelete}
                          />
                        )
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            );
          })) || <NoResultFoundModal />}
      </Box>
      <UploadModal
        open={open}
        onClose={handleClose}
        handleBookDetailsChange={handleBookDetailsChange}
        checkIfErroneous={checkIfErroneous}
        uploadFormFields={uploadFormFields}
        validateBookDetails={validateBookDetails}
        errors={errors}
      />
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
      <DeleteModal
        open={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        onConfirmClick={onConfirmBookDelete}
        modalTitle={"Are you sure you want to delete the file?"}
        button1Text={"Cancel"}
        button2Text={"Yes"}
      />
      <SuggestionModal
        open={openSuggestionModal}
        onClose={handleSuggestionClose}
        suggestionDetails={suggestionDetails}
        setSuggestionDetails={setSuggestionDetails}
        suggestionErrors={suggestionErrors}
        setSuggestionErrors={setSuggestionErrors}
        loggedInUser={loggedInUser}
      />
    </div>
  );
};

export default Content;
