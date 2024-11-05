import {
  CREATE_CONFRIM_CLIENT_FAIL,
  CREATE_CONFRIM_CLIENT_REQUEST,
  CREATE_CONFRIM_CLIENT_SUCCESS,
  CREATE_SEND_OTP_CLIENT_FAIL,
  CREATE_SEND_OTP_CLIENT_REQUEST,
  CREATE_SEND_OTP_CLIENT_SUCCESS,
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
} from "../constances/UserConstance";

export const ClientUserReducers = (
  state = { clientInfo: {}, clientProfile: {} },
  action
) => {
  switch (action.type) {
    case CREATE_SEND_OTP_CLIENT_REQUEST:
    case CREATE_CONFRIM_CLIENT_REQUEST:
    case GET_CLIENT_PROFILE_REQUEST:
    case UPDATE_CLIENT_PROFILE_REQUEST:
      return {
        ...state,
        lodding: true,
        isUpdateClient: false,
        isOtpClient: false,
        isConfirmClient: false,
        isLogout: false,
      };
    case CREATE_SEND_OTP_CLIENT_SUCCESS:
      return {
        ...state,
        lodding: false,
        isOtpClient: true,
        clientInfo: action.payload,
      };
    case CREATE_CONFRIM_CLIENT_SUCCESS:
      return {
        ...state,
        lodding: false,
        isConfirmClient: true,
        clientInfo: action.payload,
      };
    case GET_CLIENT_PROFILE_SUCCESS:
      return {
        ...state,
        lodding: false,
        isConfirmClient: true,
        clientProfile: action.payload,
      };
    case UPDATE_CLIENT_PROFILE_SUCCESS:
      return {
        ...state,
        lodding: false,
        isUpdateClient: true,
      };

    case CREATE_SEND_OTP_CLIENT_FAIL:
    case CREATE_CONFRIM_CLIENT_FAIL:
    case GET_CLIENT_PROFILE_FAIL:
    case UPDATE_CLIENT_PROFILE_FAIL:
      return {
        ...state,
        lodding: false,
        isUpdateClient: false,
        isConfirmClient: false,
        isOtpClient: false,
        error: action.payload,
      };
    case CLIENT_LOGOUT_REQUEST_SUCCESS:
      return {
        lodding: false,
        isUpdateClient: false,
        isConfirmClient: false,
        isOtpClient: false,
        error: null,
        clientInfo: null,
        isLogout: true,
      };
    case REFRESH_CLIENT_REQUEST:
      return {
        ...state,
        lodding: false,
        error: null,
        isUpdateClient: false,
        isConfirmClient: false,
        isOtpClient: false,
        isLogout: false,
      };
    default:
      return state;
  }
};

export const contractReducers = (state = {}, action) => {
  switch (action.type) {
    case SEND_MESSAGE_CLIENT_TO_ADMIN_REQUEST:
      return {
        ...state,
        lodding: true,
        iClientSend: false,
      };
    case SEND_MESSAGE_CLIENT_TO_ADMIN_SUCCESS:
      return {
        ...state,
        lodding: false,
        iClientSend: true,
      };
    case SEND_MESSAGE_CLIENT_TO_ADMIN_FAIL:
      return {
        ...state,
        lodding: false,
        iClientSend: false,
        error:action.payload
      };
    case REFRESH_CONTRACT_MESSAGE_REQURST:
      return {
        ...state,
        lodding: false,
        iClientSend: false,
        error:null
      };
    default:
      return state;
  }
};



export const ServicesWrokersReducers = (state = {ServiceWorkers:[],WorkerServices:[]}, action) => {
  switch (action.type) {
    case FIND_SERVICE_TO_WORKERS_REQUEST:
      case FIND_WORKERS_TO_SERVICES_REQUEST:
      return {
        ...state,
        lodding: true,
      };
    case FIND_SERVICE_TO_WORKERS_SUCCESS:
      return {
        ...state,
        lodding: false,
        ServiceWorkers: action.payload
      };
      case FIND_WORKERS_TO_SERVICES_SUCCESS:
        return {
          ...state,
          lodding: false,
          WorkerServices: action.payload
        };
    case FIND_SERVICE_TO_WORKERS_FAIL:
      case FIND_WORKERS_TO_SERVICES_FAIL:
      return {
        ...state,
        lodding: false,
        error:action.payload
      };
    default:
      return state;
  }
};