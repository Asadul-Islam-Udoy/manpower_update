import axios from "axios";
import {
  STORE_BOOKING_CART_REQUEST,
  STORE_BOOKING_CART_SUCCESS,
  REMOVE_BOOKING_CART_REQUEST,
  REMOVE_BOOKING_CART_SUCCESS,
  PAYMENT_ADDRESS_BOOKING_CART_REQUEST,
  PAYMENT_ADDRESS_BOOKING_CART_SUCCESS,
  FINAL_STORE_BOOKING_CART_REQUEST,
  FINAL_STORE_BOOKING_CART_SUCCESS,
  STORE_BOOKING_WORKERS_REQUEST,
  STORE_BOOKING_WORKERS_SUCCESS,
  REMOVE_BEFORE_SELECT_WORKER
} from "../../constances/ServiceBookingCartConstance";
import { Localhost } from "../host/HostConnection";

//store booking cart
export const StoreBookingCardAction =
  (datafrom) => async (dispatch, getState) => {
    dispatch({ type: STORE_BOOKING_CART_REQUEST });
    dispatch({
      type: STORE_BOOKING_CART_SUCCESS,
      payload: datafrom,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartState.cartItems)
    );
  };

  //store booking cart
export const StoreBookingWorkerAction =
(datafrom) => async (dispatch, getState) => {
  dispatch({ type: STORE_BOOKING_WORKERS_REQUEST });
  dispatch({
    type: STORE_BOOKING_WORKERS_SUCCESS,
    payload: datafrom,
  });
  localStorage.setItem(
    "workersItems",
    JSON.stringify(getState().cartState.workersItems)
  );
};

//remove booking cart
export const RemoveBookingCardAction = (id,wrokerServices) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_BOOKING_CART_REQUEST });
  dispatch({
    type: REMOVE_BOOKING_CART_SUCCESS,
    payload: {
      id:id,
      wrokerServices:wrokerServices
    },
  });
  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartState.cartItems)
  );
  localStorage.setItem(
    "workersItems",
    JSON.stringify(getState().cartState.workersItems)
  );
};

//remove booking cart
export const RemoveCardBeforeWorkerAction = () => async (dispatch) => {
  dispatch({type:REMOVE_BEFORE_SELECT_WORKER})
  localStorage.removeItem("workersItems");
};


//store user payment address
export const AddressInfoBookingCardAction =
  (fromdata) => async (dispatch, getState) => {
    dispatch({ type: PAYMENT_ADDRESS_BOOKING_CART_REQUEST });
    dispatch({
      type: PAYMENT_ADDRESS_BOOKING_CART_SUCCESS,
      payload: fromdata,
    });
    localStorage.setItem(
      "addressInfo",
      JSON.stringify(getState().cartState.addressInfo)
    );
  };

//store booking cart
export const finalStoreBookingCardAction =
  (id, price, startWork, timekey) => async (dispatch, getState) => {
    try {
      dispatch({ type: FINAL_STORE_BOOKING_CART_REQUEST });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(
        Localhost + `/api/services/get/single/${id}`,
        config
      );
      if (data) {
        const obj = {
          _id: data.service._id,
          name: data.service.name,
          image: data.service.image,
          service_discount: data.service.service_discount,
          service_price: data.service.service_price,
          service_discount :data.service.service_discount,
          totalPrice: price,
          startWork,
          timeSchedule: timekey,
        };
        dispatch({
          type: FINAL_STORE_BOOKING_CART_SUCCESS,
          payload: obj,
        });
      }

      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cartState.cartItems)
      );
    } catch (error) {
      console.log("error", error);
    }
  };


  

