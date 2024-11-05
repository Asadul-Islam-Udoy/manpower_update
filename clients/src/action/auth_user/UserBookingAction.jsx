import axios from "axios";
import { Localhost } from "../host/HostConnection";
import {
  GET_USER_PERSONAL_BOOKING_REQUEST,
  GET_USER_PERSONAL_BOOKING_SUCCESS,
  GET_USER_PERSONAL_BOOKING_FAIL,
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
} from "../../constances/UserBookingConstance";

//get user booking action
export const getUserBookingAction = (id) => async (dispatch, getState) => {
  try {
    const {
      userLoginState: { clientInfo },
    } = getState();
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: GET_USER_PERSONAL_BOOKING_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: clientInfo?.token?.accesstoken || userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.get(
      Localhost + `/api/bookings/get/unique/user/booking/${id}`,
      config
    );
    if (data) {
      dispatch({
        type: GET_USER_PERSONAL_BOOKING_SUCCESS,
        payload: data.bookings,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_USER_PERSONAL_BOOKING_FAIL,
      payload: error.response.data.message,
    });
  }
};


// user booking reviews action
export const GivenUserBookingReviewsAction = (id,serviceId,workerId,comment,rating) => async (dispatch, getState) => {
  try {
    const {
      userLoginState: { clientInfo },
    } = getState();
    dispatch({ type: USER_GIVEN_THE_REVIEWS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: clientInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.put(
      Localhost + `/api/reviews/create/review/${id}/`,{serviceId,workerId,comment,rating},
      config
    );
    if (data) {
      dispatch({
        type: USER_GIVEN_THE_REVIEWS_SUCCESS,
        payload: data.bookings,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_GIVEN_THE_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// user booking cancel action
export const bookingCancleAction = (id,paymentStatus) => async (dispatch, getState) => {
  try {
    const {
      userLoginState: { clientInfo },
    } = getState();
    dispatch({ type: USER_BOOKING_CALCEL_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: clientInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.put(
      Localhost + `/api/bookings/update/payment_status/${id}/`,{paymentStatus},
      config
    );
    if (data) {
      dispatch({
        type: USER_BOOKING_CALCEL_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_BOOKING_CALCEL_FAIL,
      payload: error.response.data.message,
    });
  }
};


// user again booking
export const bookingAgainAction = (id,paymentStatus) => async (dispatch, getState) => {
  try {
    const {
      userLoginState: { clientInfo },
    } = getState();
    dispatch({ type: USER_BOOKING_AGAIN_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: clientInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.put(
      Localhost + `/api/bookings/update/payment_status/${id}/`,{paymentStatus},
      config
    );
    if (data) {
      dispatch({
        type: USER_BOOKING_AGAIN_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: USER_BOOKING_AGAIN_FAIL,
      payload: error.response.data.message,
    });
  }
};


///get single booking by id
export const getSingleBookingByIdAction = (id) => async (dispatch, getState) => {
  try {
    const {
      userLoginState: { clientInfo },
    } = getState();
    dispatch({ type: GET_SINGLE_BOOKING_BY_ID_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: clientInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.get(
      Localhost + `/api/bookings/get/unique/booking/${id}/`,
      config
    );
    if (data) {
      dispatch({
        type: GET_SINGLE_BOOKING_BY_ID_SUCCESS,
        payload: data.booking,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_SINGLE_BOOKING_BY_ID_FAIL,
      payload: error.response.data.message,
    });
  }
};


////review refresh
export const userReviewRefreshController=()=>(dispatch)=>{
  dispatch({type:USER_GIVEN_THE_REVIEWS_REFRESH});
}