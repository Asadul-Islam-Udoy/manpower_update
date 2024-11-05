import {
  UPDATE_ADMIN_PROFILE_REQUEST,
  UPDATE_ADMIN_PROFILE_SUCCESS,
  UPDATE_ADMIN_PROFILE_FAIL,
  REFRESH_LODDER_AUTH,
  REGISTER_CREATE_FAIL,
  REGISTER_CREATE_REQUEST,
  REGISTER_CREATE_SUCCESS,
  LOGIN_CREATE_FAIL,
  LOGIN_CREATE_REQUEST,
  LOGIN_CREATE_SUCCESS,
  OTP_SEND_REQUEST,
  OTP_SEND_SUCCESS,
  OTP_SEND_FAIL,
  FORGET_PASSWORD_REQUEST,
  FORGET_PASSWORD_SUCCESS,
  FORGET_PASSWORD_FAIL,
  FORGET_PASSWORD_CONFIRM_REQUEST,
  FORGET_PASSWORD_CONFIRM_SUCCESS,
  FORGET_PASSWORD_CONFIRM_FAIL,
  LOGOUT_REQUEST_SUCCESS,
  USER_TOKEN_REFRESH_REQUEST,
  USER_TOKEN_REFRESH_SUCCESS,
  USER_TOKEN_REFRESH_FAIL,
} from "../constances/AdminConstance";

// signup reducers
export const registerReducers = (state = { userRegisterInfo: {} }, action) => {
  switch (action.type) {
    case REGISTER_CREATE_REQUEST:
    case OTP_SEND_REQUEST:
      return {
        ...state,
        lodding: true,
        isRegister: false,
        isUserOtp: false,
      };
    case REGISTER_CREATE_SUCCESS:
      return {
        ...state,
        lodding: false,
        isRegister: true,
        userRegisterInfo: action.payload,
      };
    case OTP_SEND_SUCCESS:
      return {
        ...state,
        lodding: false,
        isUserOtp: true,
        userRegisterInfo: null,
      };
    case REGISTER_CREATE_FAIL:
    case OTP_SEND_FAIL:
      return {
        ...state,
        lodding: false,
        isRegister: false,
        userRegister: null,
        isUserOtp: false,
        error: action.payload,
      };
    case REFRESH_LODDER_AUTH:
      return {
        ...state,
        lodding: false,
        isRegister: false,
        userRegister: null,
        isUserOtp: false,
        error: null,
      };
    default:
      return state;
  }
};

//signin reducers
export const loginReducers = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case LOGIN_CREATE_REQUEST:
    case FORGET_PASSWORD_REQUEST:
    case FORGET_PASSWORD_CONFIRM_REQUEST:
    case USER_TOKEN_REFRESH_REQUEST:
    case UPDATE_ADMIN_PROFILE_REQUEST:
      return {
        ...state,
        lodding: true,
        isLogin: false,
        isForgetPassword: false,
        isForgetPasswordConfirm: false,
        isProfileUpdate:false
      };
    case LOGIN_CREATE_SUCCESS:
      return {
        ...state,
        lodding: false,
        isLogin: true,
        userInfo: action.payload,
      };
    case UPDATE_ADMIN_PROFILE_SUCCESS:
        return{
            ...state,
            lodding: false,
            isProfileUpdate: true,
            userInfo: action.payload, 
        }
    case USER_TOKEN_REFRESH_SUCCESS:
      return {
        ...state,
        lodding: false,
        userInfo: action.payload,
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        lodding: false,
        isForgetPassword: true,
      };
    case FORGET_PASSWORD_CONFIRM_SUCCESS:
      return {
        ...state,
        lodding: false,
        isForgetPasswordConfirm: true,
      };
    case LOGOUT_REQUEST_SUCCESS:
      return {
        lodding: false,
        isLogin: false,
        isForgetPassword: false,
        isLogout: true,
        isForgetPasswordConfirm: false,
        error: null,
        userInfo: null,
      };
    case LOGIN_CREATE_FAIL:
    case FORGET_PASSWORD_FAIL:
    case FORGET_PASSWORD_CONFIRM_FAIL:
    case USER_TOKEN_REFRESH_FAIL:
    case UPDATE_ADMIN_PROFILE_FAIL:
      return {
        ...state,
        lodding: false,
        isLogin: false,
        error: action.payload,
        isForgetPassword: false,
        isForgetPasswordConfirm: false,
        isProfileUpdate:false
      };
    case REFRESH_LODDER_AUTH:
      return {
        ...state,
        lodding: false,
        isLogin: false,
        isForgetPassword: false,
        isForgetPasswordConfirm: false,
        isLogout: false,
        isProfileUpdate:false,
        error: null,
      };
    default:
      return state;
  }
};
