import { storeConstants } from "../shared/storeConstants";

const initialState = {
  registeredUsersList: [],
  isUserRegistered: null,
  isUserRegistrationSuccessful: null,
  loggedInUser: "",
  booksDetails: [],
  booksDetailsAPIFailure: null,
  uploadFileResponse: [],
  uploadFileDetailsResponse: [],
  deleteFileResponse: null,
  currentUserPassword: "",
  changePasswordResponse: null,
  storeSuggestionResponse: null,
};

export default function appReducer(state = initialState, action) {
  switch (action?.type) {
    case storeConstants.GET_ALL_REGISTERED_USERS_SUCCESS:
      return {
        ...state,
        registeredUsersList: action.payload,
      };
    case storeConstants.GET_IF_USER_REGISTERED_SUCCESS:
      return {
        ...state,
        isUserRegistered: true,
      };
    case storeConstants.GET_IF_USER_REGISTERED_FAILURE:
      return {
        ...state,
        isUserRegistered: false,
      };
    case storeConstants.RESET_IS_USER_REGISTERED:
      return {
        ...state,
        isUserRegistered: null,
      };
    case storeConstants.POST_USER_REGISTRATION_SUCCESS:
      return {
        ...state,
        isUserRegistrationSuccessful: true,
      };
    case storeConstants.POST_USER_REGISTRATION_FAILURE:
      return {
        ...state,
        isUserRegistrationSuccessful: false,
      };
    case storeConstants.RESET_USER_REGISTRATION:
      return {
        ...state,
        isUserRegistrationSuccessful: null,
      };
    case storeConstants.STORE_LOGGED_IN_USER:
      return {
        ...state,
        loggedInUser: action.payload,
      };
    case storeConstants.GET_ALL_BOOKS_DETAILS_SUCCESS:
      return {
        ...state,
        booksDetails: action.payload,
      };
    case storeConstants.GET_ALL_BOOKS_DETAILS_FAILURE:
      return {
        ...state,
        booksDetailsAPIFailure: false,
      };
    case storeConstants.UPLOAD_FILE_STATUS:
      return {
        ...state,
        uploadFileResponse: action.payload,
      };
    case storeConstants.UPLOAD_FILE_DETAILS_RESPONSE:
      return {
        ...state,
        uploadFileDetailsResponse: action.payload,
      };
    case storeConstants.DELETE_FILE_RESPONSE:
      return {
        ...state,
        deleteFileResponse: action.payload,
      };
    case storeConstants.CLEAR_STORE:
      return {
        ...state,
        isUserRegistered: null,
        isUserRegistrationSuccessful: null,
        loggedInUser: "",
        booksDetails: [],
        booksDetailsAPIFailure: null,
        uploadFileResponse: [],
        uploadFileDetailsResponse: [],
        deleteFileResponse: null,
      };
    case storeConstants.GET_USER_PASSWORD_RESPONSE:
      return {
        ...state,
        currentUserPassword: action.payload,
      };
    case storeConstants.POST_CHANGE_PASSWORD_RESPONSE:
      return {
        ...state,
        changePasswordResponse: action.payload,
      };
    case storeConstants.POST_SUGGESTION_DETAILS_RESPONSE:
      return {
        ...state,
        storeSuggestionResponse: action.payload,
      };
    default:
      return state;
  }
}
