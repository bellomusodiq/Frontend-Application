import * as type from "../types";

export const changeSideNav = (show) => {
  return {
    type: type.SHOW_SIDE_NAV,
    show: show,
  };
};
