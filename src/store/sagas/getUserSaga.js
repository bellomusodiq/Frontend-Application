import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import * as type from "../types";
import { BASE_URL } from "../../helpers/config";

// data = {username, password}
function apiCall() {
  const userId = localStorage.getItem("userId");
  const url = BASE_URL + `/api/user/${userId}/`;
  return axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

function* fetchUser() {
  try {
    const result = yield call(apiCall);
    yield put({ type: type.GET_USER_SUCCESS, result: result });
  } catch (error) {
    yield put({
      type: type.GET_USER_FAILED,
      error: error.response.data.errors,
    });
  }
}

function* userWatcher() {
  yield takeEvery(type.GET_USER_REQUESTED, fetchUser);
}

export default userWatcher;
