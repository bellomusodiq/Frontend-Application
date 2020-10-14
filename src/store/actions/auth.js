import * as type from "../types";

export const updateFormField = (field, value) => {
  // field => {[field]: [value]}
  return {
    type: type.UPDATE_FORM,
    field: field,
    value: value,
  };
};

export const createUser = (data) => {
  return {
    type: type.SIGNUP_REQUESTED,
    data: data,
  };
};

export const closeSnackBar = () => {
  return {
    type: type.CLOSE_SNACK_BAR,
  };
};

export const loginAction = (data) => {
  return {
    type: type.LOGIN_REQUESTED,
    data: data,
  };
};

export const getUser = () => {
  return {
    type: type.GET_USER_REQUESTED,
  };
};

export const updateUser = (data) => {
  return {
    type: type.UPDATE_USER_REQUESTED,
    data: data,
  };
};
