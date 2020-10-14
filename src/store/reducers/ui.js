import * as type from "../types";

const initialState = {
  showSideNav: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case type.SHOW_SIDE_NAV:
      return {
        ...state,
        showSideNav: action.show,
      };
    default:
      return state;
  }
};
