import axios from "axios";
import { Localhost } from "../host/HostConnection";
import {
  CREATE_SEND_OTP_CLIENT_FAIL,
  CREATE_SEND_OTP_CLIENT_REQUEST,
  CREATE_SEND_OTP_CLIENT_SUCCESS,
  CREATE_CONFRIM_CLIENT_REQUEST,
  CREATE_CONFRIM_CLIENT_SUCCESS,
  CREATE_CONFRIM_CLIENT_FAIL,
  REFRESH_CLIENT_REQUEST,
  GET_CLIENT_PROFILE_SUCCESS,
  GET_CLIENT_PROFILE_REQUEST,
  GET_CLIENT_PROFILE_FAIL,
  UPDATE_CLIENT_PROFILE_REQUEST,
  UPDATE_CLIENT_PROFILE_SUCCESS,
  UPDATE_CLIENT_PROFILE_FAIL,
  CLIENT_LOGOUT_REQUEST_SUCCESS,
  SEND_MESSAGE_CLIENT_TO_ADMIN_REQUEST,
  SEND_MESSAGE_CLIENT_TO_ADMIN_SUCCESS,
  SEND_MESSAGE_CLIENT_TO_ADMIN_FAIL,
  REFRESH_CONTRACT_MESSAGE_REQURST,
  FIND_SERVICE_TO_WORKERS_REQUEST,
  FIND_SERVICE_TO_WORKERS_SUCCESS,
  FIND_SERVICE_TO_WORKERS_FAIL,
  FIND_WORKERS_TO_SERVICES_REQUEST,
  FIND_WORKERS_TO_SERVICES_SUCCESS,
  FIND_WORKERS_TO_SERVICES_FAIL
} from "../../constances/UserConstance";

//create client send otp
export const createClientOtpAction = (phone_or_email) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SEND_OTP_CLIENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      Localhost + "/api/users/sign_in/sign_up",
      { phone_or_email },
      config
    );
    if (data) {
      dispatch({
        type: CREATE_SEND_OTP_CLIENT_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_SEND_OTP_CLIENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//worker create confrim
export const createClientConfrimAction = (otp) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CONFRIM_CLIENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      Localhost + "/api/users/signup/phone_email/verified",
      { otp },
      config
    );
    if (data) {
      dispatch({
        type: CREATE_CONFRIM_CLIENT_SUCCESS,
        payload: data,
      });
      localStorage.setItem("clientInfo", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: CREATE_CONFRIM_CLIENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//google login
export const googleLoginAction = (email) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_CONFRIM_CLIENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      Localhost + "/api/users/google_auth_react",
      { email },
      config
    );
    if (data) {
      dispatch({
        type: CREATE_CONFRIM_CLIENT_SUCCESS,
        payload: data,
      });
    }
    localStorage.setItem("clientInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CREATE_CONFRIM_CLIENT_FAIL,
      payload: error.response,
    });
  }
};

/// user logout
export const ClientlogoutAction = () => async (dispatch) => {
  dispatch({
    type: CLIENT_LOGOUT_REQUEST_SUCCESS,
  });
  localStorage.removeItem("clientInfo");
};

//worker create confrim
export const GetClientProfileAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_CLIENT_PROFILE_REQUEST });
    const {
      userLoginState: { clientInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: clientInfo?.token?.accesstoken,
      },
    };
    const { data } = await axios.get(
      Localhost + `/api/clients/get/unique/client/profile/${id}/`,
      config
    );
    console.log("data", data);
    if (data) {
      dispatch({
        type: GET_CLIENT_PROFILE_SUCCESS,
        payload: data.client,
      });
    }
  } catch (error) {
    console.log("er", error);
    dispatch({
      type: GET_CLIENT_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//update client profile
export const UpdateClientProfileAction =
  (id, fromdata) => async (dispatch, getState) => {
    try {
      dispatch({ type: UPDATE_CLIENT_PROFILE_REQUEST });
      const {
        userLoginState: { clientInfo },
      } = getState();
      const { data } = await axios.put(
        Localhost + `/api/clients/update/client/profile/${id}/`,
        fromdata,
        {
          headers: {
            Authorization: clientInfo?.token?.accesstoken,
          },
        }
      );
      if (data) {
        dispatch({
          type: UPDATE_CLIENT_PROFILE_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_CLIENT_PROFILE_FAIL,
        payload: error.response.data.message,
      });
    }
  };


//update client profile
export const SendMessageClientToAdminAction =
  (id, fromdata) => async (dispatch, getState) => {
    try {
      dispatch({ type: SEND_MESSAGE_CLIENT_TO_ADMIN_REQUEST });
      const {
        userLoginState: { clientInfo },
      } = getState();
      const config = {   
        headers: {
          'Content-Type':'application/json',
          Authorization: clientInfo?.token?.accesstoken,
       }
      }
      const { data } = await axios.post(
        Localhost + `/api/contracts/client/send/${id}`,fromdata,
        config
      );
      if (data) {
        dispatch({
          type: SEND_MESSAGE_CLIENT_TO_ADMIN_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      dispatch({
        type: SEND_MESSAGE_CLIENT_TO_ADMIN_FAIL,
        payload: error.response.data.message,
      });
    }
  };

//find service to workers
export const FindServiceToWorkersAction =
(serviceId) => async (dispatch) => {

  try {
    dispatch({ type: FIND_SERVICE_TO_WORKERS_REQUEST });
    const config = {   
      headers: {
        'Content-Type':'application/json',
     }
    }
    const { data } = await axios.get(
      Localhost + `/api/workers/find/services/workers/${serviceId}`,
      config
    );
    if (data) {
      dispatch({
        type: FIND_SERVICE_TO_WORKERS_SUCCESS,
        payload: data.workerLists,
      });
    }
  } catch (error) {
    dispatch({
      type: FIND_SERVICE_TO_WORKERS_FAIL,
      payload: error.response.data.message,
    });
  }
};


 ///find workers to services
  export const FindWorkersToServiceAction =
  (workerProfileId) => async (dispatch) => {
    try {
      dispatch({ type: FIND_WORKERS_TO_SERVICES_REQUEST });
      const config = {   
        headers: {
          'Content-Type':'application/json',
       }
      }
      const { data } = await axios.get(
        Localhost + `/api/workers/find/workers/services/${workerProfileId}`,
        config
      );
      if (data) {
        dispatch({
          type: FIND_WORKERS_TO_SERVICES_SUCCESS,
          payload: data.servicesLists,
        });
      }
    } catch (error) {
      dispatch({
        type: FIND_WORKERS_TO_SERVICES_FAIL,
        payload: error.response.data.message,
      });
    }
  };


///contract reducers action
export const ContractRefreshAction = () => async (dispatch) => {
  dispatch({ type: REFRESH_CONTRACT_MESSAGE_REQURST });
};

///refresh user reducers action
export const UserRefreshAction = () => async (dispatch) => {
  dispatch({ type: REFRESH_CLIENT_REQUEST });
};
