import { commentConstaints } from "../actions/constants";

const initState = {
  comments: [],
  loading: false,
};
export default (state = initState, action) => {
  switch (action.type) {
    case commentConstaints.GET_COMMENT_SUCCESS:
      state = { ...state, comments: action.payload.comment.data };
      break;
  }

  return state;
};
