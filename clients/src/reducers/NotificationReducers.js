import {
  SEND_GROUP_NOTIFICATION_FAIL,
  SEND_GROUP_NOTIFICATION_REQUEST,
  SEND_GROUP_NOTIFICATION_SUCCESS,
  REFRESH_NOTIFICATION_REQUEST,
  SEND_SINGLE_NOTIFICATION_REQUEST,
  SEND_SINGLE_NOTIFICATION_SUCCESS,
  SEND_SINGLE_NOTIFICATION_FAIL,
  GET_ALL_NOTIFICATION_REQUEST,
  GET_ALL_NOTIFICATION_SUCCESS,
  GET_ALL_NOTIFICATION_FAIL,
  GET_SINGLE_USER_NOTIFICATION_SUCCESS,
  GET_SINGLE_USER_NOTIFICATION_REQUEST,
  GET_SINGLE_USER_NOTIFICATION_FAIL,
} from "../constances/NotificationConstance";

export const NotificationReducers = (
  state = { allnotification: [], singlenotification: {} },
  action
) => {
  switch (action.type) {
    case SEND_GROUP_NOTIFICATION_REQUEST:
    case SEND_SINGLE_NOTIFICATION_REQUEST:
    case GET_ALL_NOTIFICATION_REQUEST:
    case GET_SINGLE_USER_NOTIFICATION_REQUEST:
      return {
        ...state,
        lodding: true,
        isSingleNoti: false,
        isGroupNoti: false,
      };
    case GET_ALL_NOTIFICATION_SUCCESS:
      return {
        ...state,
        lodding: false,
        allnotification: action.payload,
      };
    case SEND_GROUP_NOTIFICATION_SUCCESS:
      return {
        ...state,
        lodding: false,
        allnotification: action.payload,
        isGroupNoti: true,
      };
    case SEND_SINGLE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        lodding: false,
        allnotification: action.payload,
        isSingleNoti: true,
      };
    case GET_SINGLE_USER_NOTIFICATION_SUCCESS:
      return {
        ...state,
        lodding: false,
        singlenotification: action.payload,
      };
    case SEND_GROUP_NOTIFICATION_FAIL:
    case SEND_SINGLE_NOTIFICATION_FAIL:
    case GET_ALL_NOTIFICATION_FAIL:
    case GET_SINGLE_USER_NOTIFICATION_FAIL:
      return {
        ...state,
        lodding: false,
        error: action.payload,
        isGroupNoti: false,
        isSingleNoti: false,
      };
    case REFRESH_NOTIFICATION_REQUEST:
      return {
        ...state,
        lodding: false,
        isGroupNoti: false,
        isSingleNoti: false,
        error: null,
      };
    default:
      return state;
  }
};
