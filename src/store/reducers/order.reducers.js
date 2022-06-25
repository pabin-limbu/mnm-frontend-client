import { orderConstants } from "../actions/constants";

const initState = {
  order: {},
  isCompleted: false,
  loading: false,
  error: null,
};
export default (state = initState, action) => {
  switch (action.type) {
    case orderConstants.ADD_OREDER_SUCCESS:
      state = { ...state, order: action.payload, isCompleted: true };
      break;
    case orderConstants.GET_ORDER_REQUEST:
      state = { ...state, loading: true };
      break;
    case orderConstants.GET_ORDER_SUCCESS:
      state = { ...state, order: action.payload.data, loading: false };
      break;

    case orderConstants.GET_ORDER_FAILURE:
      state = { ...state, error: action.payload.message, loading: false };
      break;
  }

  return state;
};
