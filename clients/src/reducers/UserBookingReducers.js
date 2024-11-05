import {
  GET_USER_PERSONAL_BOOKING_FAIL,
  GET_USER_PERSONAL_BOOKING_REQUEST,
  GET_USER_PERSONAL_BOOKING_SUCCESS,
  USER_GIVEN_THE_REVIEWS_SUCCESS,
  USER_GIVEN_THE_REVIEWS_REQUEST,
  USER_GIVEN_THE_REVIEWS_FAIL,
  USER_BOOKING_CALCEL_REQUEST,
  USER_BOOKING_CALCEL_SUCCESS,
  USER_BOOKING_CALCEL_FAIL,
  USER_BOOKING_AGAIN_REQUEST,
  USER_BOOKING_AGAIN_SUCCESS,
  USER_BOOKING_AGAIN_FAIL,
  USER_GIVEN_THE_REVIEWS_REFRESH,
  GET_SINGLE_BOOKING_BY_ID_SUCCESS,
  GET_SINGLE_BOOKING_BY_ID_REQUEST,
  GET_SINGLE_BOOKING_BY_ID_FAIL
} from "../constances/UserBookingConstance";

export const UserPersonalBookingReducers = (
  state = { personalBooking: [] ,personalSingleBooking:{}},
  action
) => {
  switch (action.type) {
    case GET_USER_PERSONAL_BOOKING_REQUEST:
    case USER_GIVEN_THE_REVIEWS_REQUEST:
    case USER_BOOKING_CALCEL_REQUEST:
    case USER_BOOKING_AGAIN_REQUEST:
      case GET_SINGLE_BOOKING_BY_ID_REQUEST:
      return {
        ...state,
        lodding: true,
        isReviewCreate: false,
        isBookingCancel: false,
        isBookingAgain: false,
      };
    case GET_USER_PERSONAL_BOOKING_SUCCESS:
      return {
        ...state,
        lodding: false,
        personalBooking: action.payload,
      };
    case USER_GIVEN_THE_REVIEWS_SUCCESS:
      return {
        ...state,
        lodding: false,
        personalBooking: action.payload,
        isReviewCreate: true,
      };
    case USER_BOOKING_CALCEL_SUCCESS:
      return {
        ...state,
        lodding: false,
        isBookingCancel: true,
      };
    case USER_BOOKING_AGAIN_SUCCESS:
      return {
        ...state,
        lodding: false,
        isBookingAgain: true,
      };
    case GET_SINGLE_BOOKING_BY_ID_SUCCESS:
      return {
        ...state,
        lodding: false,
        personalSingleBooking: action.payload
      };
    case GET_USER_PERSONAL_BOOKING_FAIL:
    case USER_GIVEN_THE_REVIEWS_FAIL:
    case USER_BOOKING_CALCEL_FAIL:
    case USER_BOOKING_AGAIN_FAIL:
      case GET_SINGLE_BOOKING_BY_ID_FAIL:
      return {
        ...state,
        lodding: false,
        isReviewCreate: false,
        isBookingCancel: false,
        isBookingAgain: false,
        error: action.payload,
      };
    case USER_GIVEN_THE_REVIEWS_REFRESH:
      return {
        ...state,
        lodding: false,
        error: null,
        isReviewCreate: false,
        isBookingCancel: false,
        isBookingAgain: false,
      };
    default:
      return state;
  }
};
