import {
  GET_ALL_BOOKING_FAIL,
  GET_ALL_BOOKING_REQUEST,
  GET_ALL_BOOKING_SUCCESS,
  GET_SINGLE_BOOKING_REQUEST,
  GET_SINGLE_BOOKING_SUCCESS,
  GET_SINGLE_BOOKING_FAIL,
  REFRESH_BOOKING_REQUEST,
  UPDATE_BOOKING_WORKER_REQUEST,
  UPDATE_BOOKING_WORKER_SUCCESS,
  UPDATE_BOOKING_WORKER_FAIL,
  UPDATE_PAYMENT_STATUS_REQUEST,
  UPDATE_PAYMENT_STATUS_SUCCESS,
  UPDATE_PAYMENT_STATUS_FAIL,
  BOOKING_DELETE_REQUEST,
  BOOKING_DELETE_FAIL,
  BOOKING_DELETE_SUCCESS,
  GET_ALL_NEW_BOOKING_REQUEST,
  GET_ALL_NEW_BOOKING_SUCCESS,
  GET_ALL_NEW_BOOKING_FAIL,
  GET_PAYMENT_TO_SINGLE_BOOKING_SUCCESS,
  GET_PAYMENT_TO_SINGLE_BOOKING_REQUEST,
  GET_PAYMENT_TO_SINGLE_BOOKING_FAIL,
  DELETE_BOOKING_BY_PAYMENTID_BOOKING_REQUEST,
  DELETE_BOOKING_BY_PAYMENTID_BOOKING_SUCCESS,
  RESET_PAYMENT_BOOKING_REQUEST,
  DELETE_BOOKING_BY_PAYMENTID_BOOKING_FAIL,
  GET_ALL_BOOKING_BY_STATUS_REQUEST,
  GET_ALL_BOOKING_BY_STATUS_SUCCESS,
  GET_ALL_BOOKING_BY_STATUS_FAIL
} from "../constances/BookingConstance";

export const bookingReducers = (
  state = { allbooking: [], allnewbooking: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_BOOKING_REQUEST:
    case UPDATE_BOOKING_WORKER_REQUEST:
    case UPDATE_PAYMENT_STATUS_REQUEST:
    case BOOKING_DELETE_REQUEST:
    case GET_ALL_NEW_BOOKING_REQUEST:
    case GET_ALL_BOOKING_BY_STATUS_REQUEST:
      return {
        ...state,
        lodding: true,
        isAddWorker: false,
        isPaymentStatus: false,
        isBookingDelete: false,
      };
    case GET_ALL_BOOKING_SUCCESS:
      return {
        ...state,
        lodding: false,
        allbooking: action.payload,
      };
    case GET_ALL_BOOKING_BY_STATUS_SUCCESS:
      return {
        ...state,
        lodding: false,
        allbooking: action.payload,
      };
    case GET_ALL_NEW_BOOKING_SUCCESS:
      return {
        ...state,
        lodding: false,
        allnewbooking: action.payload,
      };
    case UPDATE_BOOKING_WORKER_SUCCESS:
      return {
        ...state,
        lodding: false,
        allbooking: action.payload,
        isAddWorker: true,
      };
    case UPDATE_PAYMENT_STATUS_SUCCESS:
      return {
        ...state,
        lodding: false,
        allbooking: action.payload,
        isPaymentStatus: true,
      };
    case BOOKING_DELETE_SUCCESS:
      return {
        ...state,
        lodding: false,
        allbooking: action.payload,
        isBookingDelete: true,
      };
    case GET_ALL_BOOKING_FAIL:
    case UPDATE_BOOKING_WORKER_FAIL:
    case UPDATE_PAYMENT_STATUS_FAIL:
    case BOOKING_DELETE_FAIL:
    case GET_ALL_NEW_BOOKING_FAIL:
    case GET_ALL_BOOKING_BY_STATUS_FAIL:
      return {
        ...state,
        lodding: false,
        error: action.payload,
        isAddWorker: false,
        isPaymentStatus: false,
        isBookingDelete: false,
      };
    case REFRESH_BOOKING_REQUEST:
      return {
        ...state,
        lodding: false,
        error: null,
        isPaymentStatus: false,
        isAddWorker: false,
        isBookingDelete: false,
      };
    default:
      return state;
  }
};

export const SingleBookingReducers = (
  state = { singlebooking: {} },
  action
) => {
  switch (action.type) {
    case GET_SINGLE_BOOKING_REQUEST:
    case GET_PAYMENT_TO_SINGLE_BOOKING_REQUEST:
    case DELETE_BOOKING_BY_PAYMENTID_BOOKING_REQUEST:
      return {
        ...state,
        lodding: true,
        isPaymentModel: false
      };
    case GET_SINGLE_BOOKING_SUCCESS:
      return {
        ...state,
        lodding: false,
        singlebooking: action.payload,
      };
    case GET_PAYMENT_TO_SINGLE_BOOKING_SUCCESS:
      return {
        ...state,
        lodding: false,
        singlebooking: action.payload,
      };
    case DELETE_BOOKING_BY_PAYMENTID_BOOKING_SUCCESS:
      return {
        ...state,
        lodding: false,
        isPaymentModel: true
      };
    case GET_SINGLE_BOOKING_FAIL:
    case GET_PAYMENT_TO_SINGLE_BOOKING_FAIL:
    case DELETE_BOOKING_BY_PAYMENTID_BOOKING_FAIL:
      return {
        ...state,
        lodding: false,
        error: action.payload,
        isPaymentModel: false
      };
    case RESET_PAYMENT_BOOKING_REQUEST:
      return {
        ...state,
        lodding: false,
        error: null,
        isPaymentModel: false
      }
    default:
      return state;
  }
};
