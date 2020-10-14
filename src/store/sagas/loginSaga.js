import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import * as type from "../types";
import { BASE_URL } from '../../helpers/config';


// data = {username, password}
function loginRequest(data) {
  const url = BASE_URL + "/api/login/";
  return axios
    .post(url, data)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

function* login(payload) {
  try {
    const result = yield call(loginRequest, payload.data);
    yield put({ type: type.LOGIN_SUCCESS, result: result });
  } catch (error) {
    yield put({ type: type.LOGIN_FAILED, error: error.response.data });
  }
}

function* loginWatcher() {
  yield takeEvery(type.LOGIN_REQUESTED, login);
}

export default loginWatcher;