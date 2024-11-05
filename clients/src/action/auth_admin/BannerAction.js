import {
  CREATE_BANNERS_FAIL,
  CREATE_BANNERS_REQUEST,
  CREATE_BANNERS_SUCCESS,
  DELETE_BANNER_ACTIVE_FAIL,
  DELETE_BANNER_ACTIVE_REQUEST,
  DELETE_BANNER_ACTIVE_SUCCESS,
  GET_ALL_BANNERS_FAIL,
  GET_ALL_BANNERS_REQUEST,
  GET_ALL_BANNERS_SUCCESS,
  GET_ACTIVE_BANNER_REQUEST,
  GET_ACTIVE_BANNER_SUCCESS,
  GET_ACTIVE_BANNER_FAIL,
  GET_SINGLE_BANNERS_FAIL,
  GET_SINGLE_BANNERS_REQUEST,
  GET_SINGLE_BANNERS_SUCCESS,
  REFRESH_BANNER_REQUEST,
  UPDATE_BANNER_ACTIVE_FAIL,
  UPDATE_BANNER_ACTIVE_REQUEST,
  UPDATE_BANNER_ACTIVE_SUCCESS,
  UPDATE_BANNERS_FAIL,
  UPDATE_BANNERS_REQUEST,
  UPDATE_BANNERS_SUCCESS,
} from "../../constances/BannerConstance";
import axios from "axios";
import { Localhost } from "../host/HostConnection";
//get all gallery
export const GetAllBannersAction = () => async (dispatch, getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: GET_ALL_BANNERS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.get(
      Localhost + "/api/banners/get/all",
      config
    );
    if (data) {
      dispatch({
        type: GET_ALL_BANNERS_SUCCESS,
        payload: data.banners,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ALL_BANNERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//get active banners
export const getActiveBannersAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ACTIVE_BANNER_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      Localhost + '/api/banners/get/active/',
      config
    );
    if (data) {
      dispatch({
        type: GET_ACTIVE_BANNER_SUCCESS,
        payload: data.banner,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_ACTIVE_BANNER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//create banners
export const getSingleBannersAction = (id) => async (dispatch, getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: GET_SINGLE_BANNERS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.get(
      Localhost + `/api/banners/get/single/banner/${id}`,
      config
    );
    if (data) {
      dispatch({
        type: GET_SINGLE_BANNERS_SUCCESS,
        payload: data.banner,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_SINGLE_BANNERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//create banners
export const createBannersAction = (fromdata) => async (dispatch, getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: CREATE_BANNERS_REQUEST });
    const config = {
      headers: {
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.post(
      Localhost + "/api/banners/create",
      fromdata,
      config
    );
    if (data) {
      dispatch({
        type: CREATE_BANNERS_SUCCESS,
        payload: data.banners,
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_BANNERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update banner
export const updateBannersAction =
  (id, fromdata) => async (dispatch, getState) => {
    try {
      const {
        loginState: { userInfo },
      } = getState();
      dispatch({ type: UPDATE_BANNERS_REQUEST });
      const config = {
        headers: {
          Authorization: userInfo?.token?.accesstoken,
        },
      };
      const { data } = await axios.put(
        Localhost + `/api/banners/update/${id}`,
        fromdata,
        config
      );
      if (data) {
        dispatch({
          type: UPDATE_BANNERS_SUCCESS,
          payload: data.banners,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_BANNERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//update  banner activity
export const updateActiveBannersAction = (id) => async (dispatch, getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: UPDATE_BANNER_ACTIVE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.put(
      Localhost + `/api/banners/update/isactive/${id}/`,
      {},
      config
    );
    if (data) {
      dispatch({
        type: UPDATE_BANNER_ACTIVE_SUCCESS,
        payload: data.banners,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_BANNER_ACTIVE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//delete  banner
export const deleteActiveBannersAction = (id) => async (dispatch, getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: DELETE_BANNER_ACTIVE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: userInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.delete(
      Localhost + `/api/banners/delete/${id}`,
      config
    );
    if (data) {
      dispatch({
        type: DELETE_BANNER_ACTIVE_SUCCESS,
        payload: data.banners,
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_BANNER_ACTIVE_FAIL,
      payload: error.response.data.message,
    });
  }
};

///refresh banner
export const refreshBannersAction = () => async (dispatch) => {
  dispatch({ type: REFRESH_BANNER_REQUEST });
};
