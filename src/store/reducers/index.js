import { combineReducers } from "redux";
import auth from "./auth";
import ui from "./ui";
// import reducer

const rootReducers = combineReducers({
  // reducerName: reducerValue
  auth: auth,
  ui: ui,
});

export default rootReducers;
