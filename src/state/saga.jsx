import { put, takeLatest, all } from "redux-saga/effects";
import { storeConstants } from "../shared/storeConstants";
import {
  getAllRegisteredUsersFailure,
  getAllRegisteredUsersSuccess,
  getIfUserRegisteredSuccess,
  getIfUserRegisteredFailure,
  postUserRegistrationSuccess,
  postUserRegistrationFailure,
  getAllBooksDetailsSuccess,
  uploadFileStatus,
  uploadFileDetailsResponse,
  getAllBooksDetails,
  deleteFileResponse,
  getUserPasswordResponse,
  postChangePasswordResponse,
  postSuggestionDetailsResponse,
} from "./actions";
import download from "downloadjs";
import { getDecryptedText } from "../shared/utils";

async function apiCall(data, url) {
  return fetch(url, data).then((response) => response.json());
}

const downloadApiCall = async (url, data) => {
  const res = fetch(url, data);
  return (await res).blob();
};

function* getAllRegisteredUsers() {
  let allRegisteredUsers = [];
  const requestOptions = {
    method: "GET",
  };
  try {
    const result = yield apiCall(
      requestOptions,
      "http://localhost:8080/getAllRegisteredUsers"
    );
    result.forEach((ele) => allRegisteredUsers.push(ele));
    yield put(getAllRegisteredUsersSuccess(allRegisteredUsers));
  } catch (err) {
    console.log(err);
    yield put(getAllRegisteredUsersFailure);
  }
}

function* checkIfRegisteredUser(data) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data.payload),
  };
  try {
    const result = yield apiCall(
      requestOptions,
      "http://localhost:8080/checkIfRegisteredUser"
    );
    if (result[0].status) {
      yield put(getIfUserRegisteredSuccess());
    } else {
      yield put(getIfUserRegisteredFailure());
    }
  } catch (err) {
    console.log(err);
    yield put(getIfUserRegisteredFailure());
  }
}

function* registerNewUser(data) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data.payload),
  };
  const url = "http://localhost:8080/newuser";
  try {
    const result = yield apiCall(requestOptions, url);
    if (result[0].status) {
      yield put(postUserRegistrationSuccess());
    } else {
      yield put(postUserRegistrationFailure(result[0]));
    }
  } catch (err) {
    console.log(err);
    yield put(postUserRegistrationFailure(err));
  }
}

function* getBookDetails() {
  const requestOptions = {
    method: "GET",
  };
  const url = "http://localhost:8080/getbookdetails";
  try {
    const result = yield apiCall(requestOptions, url);
    if (result) {
      yield put(getAllBooksDetailsSuccess(result));
    }
  } catch (err) {
    console.log(err);
  }
}

function* uploadBook(data) {
  const requestOptions = {
    method: "POST",
    body: data.payload,
  };
  const url = "http://localhost:8080/uploadFile";
  try {
    const result = yield apiCall(requestOptions, url);
    yield put(uploadFileStatus(result));
  } catch (err) {
    console.log(err);
  }
}

function* uploadBookDetails(data) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data.payload),
  };
  const url = "http://localhost:8080/uploadFileDetails";
  try {
    const result = yield apiCall(requestOptions, url);
    yield put(uploadFileDetailsResponse(result));
    if (result[0].status) {
      yield put(getAllBooksDetails());
    }
  } catch (err) {
    console.log(err);
  }
}

function* downloadBook(data) {
  const fileName = data.payload.fileName;
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data.payload),
  };
  const url = "http://localhost:8080/downloadFile";
  try {
    const blob = yield downloadApiCall(url, requestOptions);
    download(blob, `${fileName}`);
  } catch (err) {
    console.log(err);
  }
}

function* deleteBook(data) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data.payload),
  };
  const url = "http://localhost:8080/deleteFile";
  try {
    const result = yield apiCall(requestOptions, url);
    if (result[0].status) {
      yield put(deleteFileResponse(true));
      yield put(getAllBooksDetails());
    } else {
      yield put(deleteFileResponse(false));
    }
  } catch (err) {
    console.log(err);
    yield put(deleteFileResponse(false));
  }
}

function* getPasswordOfLoggedInUser(data) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data.payload),
  };
  const url = "http://localhost:8080/getPassword";
  try {
    const result = yield apiCall(requestOptions, url);
    if (result[0].status) {
      yield put(getUserPasswordResponse(getDecryptedText(result[0].message)));
    } else {
      yield put(getUserPasswordResponse(""));
    }
  } catch (err) {
    console.log(err);
    yield put(getUserPasswordResponse(""));
  }
}

function* changePasswordOfLoggedInUser(data) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data.payload),
  };
  const url = "http://localhost:8080/changePassword";
  try {
    const result = yield apiCall(requestOptions, url);
    if (result[0].status) {
      yield put(postChangePasswordResponse(result[0].status));
    } else {
      yield put(postChangePasswordResponse(false));
    }
  } catch (err) {
    console.log(err);
    yield put(postChangePasswordResponse(false));
  }
}

function* storeSuggestionDetails(data) {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data.payload),
  };
  const url = "http://localhost:8080/suggestedBooks";
  try {
    const result = yield apiCall(requestOptions, url);
    if (result[0].status) {
      yield put(postSuggestionDetailsResponse(result[0].status));
    } else {
      yield put(postSuggestionDetailsResponse(false));
    }
  } catch (err) {
    console.log(err);
    yield put(postSuggestionDetailsResponse(false));
  }
}

function* actionWatcher() {
  yield takeLatest(
    storeConstants.GET_ALL_REGISTERED_USERS,
    getAllRegisteredUsers
  );
  yield takeLatest(
    storeConstants.GET_IF_USER_REGISTERED,
    checkIfRegisteredUser
  );
  yield takeLatest(storeConstants.POST_USER_REGISTRATION, registerNewUser);
  yield takeLatest(storeConstants.GET_ALL_BOOKS_DETAILS, getBookDetails);
  yield takeLatest(storeConstants.UPLOAD_FILE, uploadBook);
  yield takeLatest(storeConstants.UPLOAD_FILE_DETAILS, uploadBookDetails);
  yield takeLatest(storeConstants.DOWNLOAD_FILE, downloadBook);
  yield takeLatest(storeConstants.DELETE_FILE, deleteBook);
  yield takeLatest(storeConstants.GET_USER_PASSWORD, getPasswordOfLoggedInUser);
  yield takeLatest(
    storeConstants.POST_CHANGE_PASSWORD,
    changePasswordOfLoggedInUser
  );
  yield takeLatest(
    storeConstants.POST_SUGGESTION_DETAILS,
    storeSuggestionDetails
  );
}
export default function* rootSaga() {
  yield all([actionWatcher()]);
}
