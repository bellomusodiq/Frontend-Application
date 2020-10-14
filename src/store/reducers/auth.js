import * as type from "../types";

const initialState = {
  userId: null,
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  passwordStrength: 0,
  passwordValidationError: false,
  firstName: "",
  lastName: "",
  houseNumber: "",
  street: "",
  postalCode: "",
  loading: false,
  loginSuccess: false,
  loginError: null,
  signupError: null,
  signupSuccess: false,
  showSnackBar: false,
  countries: ["Germany", "Australia", "Switzerland"],
  country: "",
  getUserError: false,
  updateUserSuccess: false
};

const passwordMatch = (password, confirmPassword) => {
  let password1 = password.trim();
  let password2 = confirmPassword.trim();
  return password1 === password2;
};

const isUpper = (n) => {
  return /[A-Z]$/.test(n);
};

const isLower = (n) => {
  return /[a-z]$/.test(n);
};

const isNumber = (n) => {
  return /[0-9]$/.test(n);
};

const isSpecial = (n) => {
  return /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(n);
};

const passwordValidation = (inputtxt) => {
  // validates password and returns indicator
  let indicator = 0;
  let uppercheck = false;
  let lowerCheck = false;
  let numberCheck = false;
  let specialCharCheck = false;
  for (let char of inputtxt) {
    if (!uppercheck && isUpper(char)) {
      indicator++;
      uppercheck = true;
    }
    if (!lowerCheck && isLower(char)) {
      indicator++;
      lowerCheck = true;
    }
    if (!numberCheck && isNumber(char)) {
      indicator++;
      numberCheck = true;
    }
    if (!specialCharCheck && isSpecial(char)) {
      indicator++;
      specialCharCheck = true;
    }
  }
  let result = uppercheck && lowerCheck && numberCheck && specialCharCheck;
  return [result, indicator];
};

export default (state = initialState, action) => {
  switch (action.type) {
    case type.UPDATE_FORM:
      const newState = {
        ...state,
        [action.field]: action.value,
      };
      if (action.field === "confirmPassword") {
        let passwordValidation = passwordMatch(state.password, action.value);
        if (passwordValidation) {
          newState["passwordValidationError"] = !passwordValidation;
        } else {
          newState["passwordValidationError"] = true;
        }
        return newState;
      } else if (action.field === "password") {
        newState["passwordStrength"] = passwordValidation(action.value)[1];
      }
      return newState;

    case type.SIGNUP_REQUESTED:
      return {
        ...state,
        loading: true,
        signupError: null,
      };

    case type.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        showSnackBar: true,
        signupSuccess: true,
      };

    case type.SIGNUP_FAILED:
      return {
        ...state,
        signupError: action.error,
        loading: false,
        showSnackBar: true,
      };

    case type.LOGIN_REQUESTED:
      return {
        ...state,
        loading: true,
        loginError: null,
      };

    case type.LOGIN_SUCCESS:
      // save userId and JWT to localStorage
      localStorage.setItem("userId", action.result.userid);
      localStorage.setItem("token", action.result.token);
      return {
        ...state,
        loading: false,
        showSnackBar: true,
        loginSuccess: true,
        userId: action.result.userId,
      };

    case type.LOGIN_FAILED:
      return {
        ...state,
        loginError: action.error.non_field_errors,
        loading: false,
        showSnackBar: true,
      };

    case type.CLOSE_SNACK_BAR:
      return {
        ...state,
        showSnackBar: false,
      };

    case type.GET_USER_REQUESTED:
      return {
        ...state,
        loading: true,
      };

    case type.GET_USER_SUCCESS:
      return {
        ...state,
        userId: action.result.user_id,
        email: action.result.email,
        firstName: action.result.first_name,
        lastName: action.result.last_name,
        houseNumber: action.result.house_number,
        street: action.result.street,
        postalCode: action.result.postal_code,
        loading: false,
      };

    case type.GET_USER_FAILED:
      return {
        ...state,
        loading: false,
        getUserError: true
      }

    case type.UPDATE_USER_REQUESTED:
      return {
        ...state,
        loading: true,
      }

    case type.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        showSnackBar: true,
        updateUserSuccess: true,
      }

    case type.UPDATE_USER_FAILED:
      return {
        ...state,
        loading: false,
        showSnackBar: true
      }

    default:
      return state;
  }
};
