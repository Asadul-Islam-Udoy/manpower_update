import {
  GET_ALL_BANNERS_FAIL,
  GET_ALL_BANNERS_REQUEST,
  GET_ALL_BANNERS_SUCCESS,
  REFRESH_BANNER_REQUEST,
  GET_ACTIVE_BANNER_REQUEST,
  GET_ACTIVE_BANNER_SUCCESS,
  GET_ACTIVE_BANNER_FAIL,
  UPDATE_BANNER_ACTIVE_REQUEST,
  UPDATE_BANNER_ACTIVE_SUCCESS,
  UPDATE_BANNER_ACTIVE_FAIL,
  GET_SINGLE_BANNERS_REQUEST,
  GET_SINGLE_BANNERS_SUCCESS,
  GET_SINGLE_BANNERS_FAIL,
  UPDATE_BANNERS_REQUEST,
  UPDATE_BANNERS_SUCCESS,
  UPDATE_BANNERS_FAIL,
  DELETE_BANNER_ACTIVE_REQUEST,
  DELETE_BANNER_ACTIVE_SUCCESS,
  DELETE_BANNER_ACTIVE_FAIL,
  CREATE_BANNERS_REQUEST,
  CREATE_BANNERS_SUCCESS,
  CREATE_BANNERS_FAIL,

} from "../constances/BannerConstance";

export const allbannersReducers = (
  state = { allbanners: [], singleBanners: {} ,activeBanners:{}},
  action
) => {
  switch (action.type) {
    case GET_ALL_BANNERS_REQUEST:
    case UPDATE_BANNER_ACTIVE_REQUEST:
    case GET_SINGLE_BANNERS_REQUEST:
    case UPDATE_BANNERS_REQUEST:
    case DELETE_BANNER_ACTIVE_REQUEST:
    case  CREATE_BANNERS_REQUEST:
      case GET_ACTIVE_BANNER_REQUEST:
      return {
        ...state,
        lodding: true,
        isActive: false,
        isDeleteBanner: false,
        isUpdateBanner: false,
        isCreateBanner:false
      };

    case GET_ALL_BANNERS_SUCCESS:
      return {
        ...state,
        lodding: false,
        allbanners: action.payload,
      };
    case CREATE_BANNERS_SUCCESS:
      return {
        ...state,
        lodding: false,
        allbanners: action.payload,
        isCreateBanner:true
      };
    case UPDATE_BANNERS_SUCCESS:
      return {
        ...state,
        lodding: false,
        allbanners: action.payload,
        isUpdateBanner: true,
      };
    case GET_SINGLE_BANNERS_SUCCESS:
      return {
        ...state,
        lodding: false,
        singleBanners: action.payload,
      };
      case GET_ACTIVE_BANNER_SUCCESS:
        return {
          ...state,
          lodding: false,
          activeBanners: action.payload,
        };
    case UPDATE_BANNER_ACTIVE_SUCCESS:
      return {
        ...state,
        lodding: false,
        allbanners: action.payload,
        isActive: true,
      };
    case DELETE_BANNER_ACTIVE_SUCCESS:
      return {
        ...state,
        lodding: false,
        error: action.payload,
        isDeleteBanner: true,
      };
    case GET_ALL_BANNERS_FAIL:
    case UPDATE_BANNER_ACTIVE_FAIL:
    case GET_SINGLE_BANNERS_FAIL:
    case UPDATE_BANNERS_FAIL:
    case DELETE_BANNER_ACTIVE_FAIL:
    case  CREATE_BANNERS_FAIL:
      case GET_ACTIVE_BANNER_FAIL:
      return {
        ...state,
        lodding: false,
        isActive: false,
        error: action.payload,
        isDeleteBanner: false,
        isUpdateWorker: false,
        isCreateBanner:false
      };
    case REFRESH_BANNER_REQUEST:
      return {
        ...state,
        lodding: false,
        error: null,
        isActive: false,
        isDeleteBanner: false,
        isUpdateWorker: false,
        isCreateBanner:false
      };
    default:
      return state;
  }
};
