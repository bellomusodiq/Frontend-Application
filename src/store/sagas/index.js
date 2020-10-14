import { all } from "redux-saga/effects";
import fetchUserWatcher from "./getUserSaga";
// inport sagas
import loginWatcher from "./loginSaga";
import signupWatcher from "./signupSaga";
import patchUserWatcher from "./updateUserSaga";

export default function* rootSaga() {
  yield all([
    loginWatcher(),
    signupWatcher(),
    fetchUserWatcher(),
    patchUserWatcher(),
  ]);
}
