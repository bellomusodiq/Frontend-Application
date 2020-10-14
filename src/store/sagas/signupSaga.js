import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import * as type from "../types";
import { BASE_URL } from "../../helpers/config";

// data = {username, password}
function signupPost(data) {
  console.log(data);
  const url = BASE_URL + "/api/signup/";
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

function* signup(payload) {
  try {
    const result = yield call(signupPost, payload.data);
    yield put({ type: type.SIGNUP_SUCCESS, result: result });
  } catch (error) {
    yield put({ type: type.SIGNUP_FAILED, error: error.response.data.errors });
  }
}

function* signupWatcher() {
  yield takeEvery(type.SIGNUP_REQUESTED, signup);
}

export default signupWatcher;
