import { checkoutConstants } from "../actions/constants";

const initState = {
  useraddress: [],
  updatingUserAddress: false,
  error: null,
};
export default (state = initState, action) => {
  switch (action.type) {
    case checkoutConstants.ADD_ADDRESS_REQUEST:
      console.log("add address req");
      break;
    case checkoutConstants.ADD_ADDRESS_SUCCESS:
      console.log("add address in reducer success");
      state = { ...state, useraddress: action.payload };

      break;
    case checkoutConstants.ADD_ADDRESS_FAILURE:
      console.log("add address failure");
      break;

    case checkoutConstants.DELETE_ADDRESS_REQUEST:
      console.log("delete address request");
      break;
    case checkoutConstants.DELETE_ADDRESS_SUCCESS:
      state = { ...state, useraddress: action.payload };
      console.log("address delete success");
      break;
    case checkoutConstants.DELETE_ADDRESS_FAILURE:
      console.log("delete address failure");
      break;
    case checkoutConstants.EDIT_ADDRESS_SUCCESS:
      state = { ...state, useraddress: action.payload };
      break;
  }

  return state;
};
