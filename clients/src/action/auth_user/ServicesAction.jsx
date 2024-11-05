import axios from "axios";
import {
  GET_CATEGORY_BASIC_SERVICES_FAIL,
  GET_CATEGORY_BASIC_SERVICES_REQUEST,
  GET_CATEGORY_BASIC_SERVICES_SUCCESS,
  GET_GET_SINGLE_SERVICES_SUCCESS,
  GET_GET_SINGLE_SERVICES_FAIL,
  GET_GET_SINGLE_SERVICES_REQUEST,
  GET_PARENT_CATEGORY_SERVICES_REQUEST,
  GET_PARENT_CATEGORY_SERVICES_SUCCESS,
  GET_PARENT_CATEGORY_SERVICES_FAIL,
  GET_CATEGORY_SERVICES_SUCCESS,
  GET_CATEGORY_SERVICES_FAIL,
  GET_CATEGORY_SERVICES_REQUEST,

} from "../../constances/ServiceConstance";
import { Localhost } from "../host/HostConnection";

///get category basic service
export const getCategoryBasicServiceAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_BASIC_SERVICES_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      Localhost + "/api/services/categories/basic/services",
      config
    );
    if (data) {
      dispatch({
        type: GET_CATEGORY_BASIC_SERVICES_SUCCESS,
        payload: data.categoryServiceList,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_BASIC_SERVICES_FAIL,
      payload: error.response.data.message,
    });
  }
};

///get category basic service
export const getCategoryServiceAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_CATEGORY_SERVICES_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      Localhost + `/api/services/categories/services/${id}`,
      config
    );
    if (data) {
      dispatch({
        type: GET_CATEGORY_SERVICES_SUCCESS,
        payload: data.servicesLists,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_SERVICES_FAIL,
      payload: error.response.data.message,
    });
  }
};

///get single service
export const getSingleServiceAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_GET_SINGLE_SERVICES_REQUEST });
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
      dispatch({
        type: GET_GET_SINGLE_SERVICES_SUCCESS,
        payload: data.service,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_GET_SINGLE_SERVICES_FAIL,
      payload: error.response.data.message,
    });
  }
};

///get single service
export const getParentServiceCategoryAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PARENT_CATEGORY_SERVICES_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get(
      Localhost + "/api/services/categories/get/all/parent",
      config
    );
    if (data) {
      dispatch({
        type: GET_PARENT_CATEGORY_SERVICES_SUCCESS,
        payload: data.categories,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_PARENT_CATEGORY_SERVICES_FAIL,
      payload: error.response.data.message,
    });
  }
};



