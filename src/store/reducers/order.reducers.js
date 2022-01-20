import { orderConstants } from "../actions/constants";

const initState = {};
export default (state = initState, action) => {
  switch (action.type) {
    case orderConstants.ADD_OREDER_SUCCESS:
      console.log("order reducer");
      console.log(action);
  }

  return state;
};
