import { storeConstants } from "../shared/storeConstants";

export const getAllRegisteredUsers = () => {
  return {
    type: storeConstants.GET_ALL_REGISTERED_USERS,
  };
};

export const getAllRegisteredUsersSuccess = (action) => {
  return {
    type: storeConstants.GET_ALL_REGISTERED_USERS_SUCCESS,
    payload: action,
  };
};

export const getAllRegisteredUsersFailure = (action, payload) => {
  return {
    type: storeConstants.GET_ALL_REGISTERED_USERS_FAILURE,
    payload,
  };
};

export const getIfUserRegistered = (payload) => {
  return {
    type: storeConstants.GET_IF_USER_REGISTERED,
    payload: payload,
  };
};

export const getIfUserRegisteredSuccess = () => {
  return {
    type: storeConstants.GET_IF_USER_REGISTERED_SUCCESS,
  };
};

export const getIfUserRegisteredFailure = () => {
  return {
    type: storeConstants.GET_IF_USER_REGISTERED_FAILURE,
  };
};

export const resetIsUserRegistered = () => {
  return {
    type: storeConstants.RESET_IS_USER_REGISTERED,
  };
};

export const postUserRegistration = (payload) => {
  return {
    type: storeConstants.POST_USER_REGISTRATION,
    payload: payload,
  };
};

export const postUserRegistrationSuccess = () => {
  return {
    type: storeConstants.POST_USER_REGISTRATION_SUCCESS,
  };
};

export const postUserRegistrationFailure = (payload) => {
  return {
    type: storeConstants.POST_USER_REGISTRATION_FAILURE,
    payload: payload,
  };
};

export const resetUserRegistration = () => {
  return {
    type: storeConstants.RESET_USER_REGISTRATION,
  };
};

export const storeLoggedInUser = (payload) => {
  return {
    type: storeConstants.STORE_LOGGED_IN_USER,
    payload: payload,
  };
};

export const getAllBooksDetails = () => {
  return {
    type: storeConstants.GET_ALL_BOOKS_DETAILS,
  };
};

export const getAllBooksDetailsSuccess = (payload) => {
  return {
    type: storeConstants.GET_ALL_BOOKS_DETAILS_SUCCESS,
    payload,
  };
};

export const getAllBooksDetailsFailure = () => {
  return {
    type: storeConstants.GET_ALL_BOOKS_DETAILS_FAILURE,
  };
};

export const uploadFile = (payload) => {
  return {
    type: storeConstants.UPLOAD_FILE,
    payload,
  };
};

export const uploadFileStatus = (payload) => {
  return {
    type: storeConstants.UPLOAD_FILE_STATUS,
    payload,
  };
};

export const uploadFileDetails = (payload) => {
  return {
    type: storeConstants.UPLOAD_FILE_DETAILS,
    payload,
  };
};

export const uploadFileDetailsResponse = (payload) => {
  return {
    type: storeConstants.UPLOAD_FILE_DETAILS_RESPONSE,
    payload,
  };
};

export const downloadFile = (payload) => {
  return {
    type: storeConstants.DOWNLOAD_FILE,
    payload,
  };
};

export const deleteFile = (payload) => {
  return {
    type: storeConstants.DELETE_FILE,
    payload,
  };
};

export const deleteFileResponse = (payload) => {
  return {
    type: storeConstants.DELETE_FILE_RESPONSE,
    payload,
  };
};

export const clearStore = () => {
  return {
    type: storeConstants.CLEAR_STORE,
  };
};

export const getUserPassword = (payload) => {
  return {
    type: storeConstants.GET_USER_PASSWORD,
    payload,
  };
};

export const getUserPasswordResponse = (payload) => {
  return {
    type: storeConstants.GET_USER_PASSWORD_RESPONSE,
    payload,
  };
};

export const postChangePassword = (payload) => {
  return {
    type: storeConstants.POST_CHANGE_PASSWORD,
    payload,
  };
};

export const postChangePasswordResponse = (payload) => {
  return {
    type: storeConstants.POST_CHANGE_PASSWORD_RESPONSE,
    payload,
  };
};

export const postSuggestionDetails = (payload) => {
  return {
    type: storeConstants.POST_SUGGESTION_DETAILS,
    payload,
  };
};

export const postSuggestionDetailsResponse = (payload) => {
  return {
    type: storeConstants.POST_SUGGESTION_DETAILS_RESPONSE,
    payload,
  };
};
