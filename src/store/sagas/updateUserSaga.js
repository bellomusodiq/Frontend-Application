import { put, takeEvery, call } from "redux-saga/effects";
import { BASE_URL } from "../../helpers/config";
import axios from "axios";
import * as type from "../types";

function apiCall(data) {
  const url = BASE_URL + `/api/user/${localStorage.getItem("userId")}/`;
  return axios
    .patch(url, data)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

function* patchUser(payload) {
  try {
    const result = yield call(apiCall, payload.data);
    yield put({ type: type.UPDATE_USER_SUCCESS, result: result });
  } catch (error) {
    yield put({ type: type.UPDATE_USER_FAILED, error: error.response.data });
  }
}

function* patchUserWatcher() {
  yield takeEvery(type.UPDATE_USER_REQUESTED, patchUser);
}

export default patchUserWatcher;
