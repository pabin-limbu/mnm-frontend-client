import { bannerConstaints } from "../actions/constants";

const initState = {
  banners: [],
  loading: false,
};
export default (state = initState, action) => {
  switch (action.type) {
    case bannerConstaints.GET_BANNER_SUCCESS:
      state = { ...state, banners: action.payload.banner.data };
      break;
  }

  return state;
};
