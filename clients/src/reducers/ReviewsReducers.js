import {
  GET_ALL_REVIEWS_FAIL,
  GET_ALL_REVIEWS_REQUEST,
  GET_ALL_REVIEWS_SUCCESS,
  REFRESH_REVIEW_REQURST,
} from "../constances/ReviewConstance";

export const reviewsReducers = (state = { allreviews: [] }, action) => {
  switch (action.type) {
    case GET_ALL_REVIEWS_REQUEST:
      return {
        ...state,
        lodding: true,
      };
    case GET_ALL_REVIEWS_SUCCESS:
      return {
        ...state,
        lodding: false,
        allreviews: action.payload,
      };
    case GET_ALL_REVIEWS_FAIL:
      return {
        ...state,
        lodding: false,
        error: action.payload,
      };
    case REFRESH_REVIEW_REQURST:
      return {
        ...state,
        lodding: false,
        error: null,
      };
    default:
      return state;
  }
};
