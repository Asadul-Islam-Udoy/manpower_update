import {
  CREATE_SEND_OTP_WORKERS_REQUEST,
  CREATE_SEND_OTP_WORKERS_SUCCESS,
  CREATE_SEND_OTP_WORKERS_FAIL,
  CREATE_CONFRIM_WORKERS_FAIL,
  CREATE_CONFRIM_WORKERS_SUCCESS,
  CREATE_CONFRIM_WORKERS_REQUEST,
  GET_ALL_WORKERS_FAIL,
  GET_ALL_WORKERS_REQUEST,
  GET_ALL_WORKERS_SUCCESS,
  REFRESH_WORKER_REQUEST,
  GET_SINGLE_WORKER_SUCCESS,
  GET_SINGLE_WORKER_REQUEST,
  GET_SINGLE_WORKER_FAIL,
  DELETE_WORKER_REQUEST,
  DELETE_WORKER_SUCCESS,
  DELETE_WORKER_FAIL,
  GET_ALL_SERVICES_REQUEST,
  GET_ALL_SERVICES_SUCCESS,
  GET_ALL_SERVICES_FAIL,
  UPDATE_WORKER_PROFILE_REQUEST,
  UPDATE_WORKER_PROFILE_SUCCESS,
  UPDATE_WORKER_PROFILE_FAIL,
  UPDATE_WORKER_AVATAR_PROFILE_REQUEST,
  UPDATE_WORKER_AVATAR_PROFILE_SUCCESS,
  UPDATE_WORKER_AVATAR_PROFILE_FAIL,
  UPDATE_WORKER_IS_FREE_REQUEST,
  UPDATE_WORKER_IS_FREE_SUCCESS,
  UPDATE_WORKER_IS_FREE_FAIL,
  GET_ALL_CATEGORY_SERVICES_SUCCESS,
  GET_ALL_CATEGORY_SERVICES_FAIL,
  GET_ALL_CATEGORY_SERVICES_REQUEST,
  CREATE_CATEGORY_SERVICES_SUCCESS,
  CREATE_CATEGORY_SERVICES_FAIL,
  CREATE_CATEGORY_SERVICES_REQUEST,
  UPDATE_CATEGORY_SERVICES_SUCCESS,
  UPDATE_CATEGORY_SERVICES_FAIL,
  UPDATE_CATEGORY_SERVICES_REQUEST,
  DELETE_CATEGORY_SERVICES_SUCCESS,
  DELETE_CATEGORY_SERVICES_FAIL,
  DELETE_CATEGORY_SERVICES_REQUEST,
  REFRESH_SERVICE_CATEGORY_REQUEST,
  GET_ALL_CLIENTS_REQUEST,
  GET_ALL_CLIENTS_SUCCESS,
  GET_ALL_CLIENTS_FAIL,
  CLIENTS_REFRESH_REQUEST,
  UPDATE_SERVICES_REQUEST,
  UPDATE_SERVICES_SUCCESS,
  UPDATE_SERVICES_FAIL,
  DELETE_SERVICES_REQUEST,
  DELETE_SERVICES_SUCCESS,
  DELETE_SERVICES_FAIL,
  CREATE_SERVICES_REQUEST,
  CREATE_SERVICES_SUCCESS,
  CREATE_SERVICES_FAIL,
  SERVICE_DISCOUNT_REQUEST,
  SERVICE_DISCOUNT_SUCCESS,
  SERVICE_DISCOUNT_FAIL,
  REFRESH_SERVICES,
  GET_ALL_PAYMENT_REQUEST,
  GET_ALL_PAYMENT_SUCCESS,
  GET_ALL_PAYMENT_FAIL,
  CREATE_HOME_APPS_REQUEST,
  CREATE_HOME_APPS_SUCCESS,
  CREATE_HOME_APPS_FAIL,
  GET_HOME_APPS_REQUEST,
  GET_HOME_APPS_SUCCESS,
  GET_HOME_APPS_FAIL,
  CREATE_HOME_PAGE_VIDEO_REQUEST,
  CREATE_HOME_PAGE_VIDEO_SUCCESS,
  CREATE_HOME_PAGE_VIDEO_FAIL,
  GET_HOME_PAGE_VIDEO_REQUEST,
  GET_HOME_PAGE_VIDEO_SUCCESS,
  GET_HOME_PAGE_VIDEO_FAIL,
  RESET_HOME_PAGES_METHOD,
  GET_ALL_DIVISION_REQUEST,
  GET_ALL_DIVISION_SUCCESS,
  GET_ALL_DIVISION_FAIL,
  GET_ALL_DISTRICT_REQUEST,
  GET_ALL_DISTRICT_SUCCESS,
  GET_ALL_DISTRICT_FAIL,
  GET_ALL_UPAZILA_FAIL,
  GET_ALL_UPAZILA_REQUEST,
  GET_ALL_UPAZILA_SUCCESS,
} from "../constances/AdminMaintainConstance";

//admin profile
export const allworkersReducers = (state = { allworkers: [] }, action) => {
  switch (action.type) {
    case GET_ALL_WORKERS_REQUEST:
    case DELETE_WORKER_REQUEST:
    case UPDATE_WORKER_PROFILE_REQUEST:
    case UPDATE_WORKER_AVATAR_PROFILE_REQUEST:
    case CREATE_SEND_OTP_WORKERS_REQUEST:
    case CREATE_CONFRIM_WORKERS_REQUEST:
    case UPDATE_WORKER_IS_FREE_REQUEST:
      return {
        ...state,
        lodding: true,
        isDeleteDelete: false,
        isUpdateWorker: false,
        isAvatarUpdate: false,
        isOtpWorker: false,
        isConfirmWorker: false,
      };
    case CREATE_SEND_OTP_WORKERS_SUCCESS:
      return {
        ...state,
        lodding: false,
        isOtpWorker: true,
      };
    case CREATE_CONFRIM_WORKERS_SUCCESS:
      return {
        ...state,
        lodding: false,
        isConfirmWorker: true,
      };
    case GET_ALL_WORKERS_SUCCESS:
      return {
        ...state,
        lodding: false,
        allworkers: action.payload,
      };
    case UPDATE_WORKER_IS_FREE_SUCCESS:
      return {
        ...state,
        lodding: false,
        isUpdateWorker: true,
      };
    case DELETE_WORKER_SUCCESS:
      return {
        ...state,
        lodding: false,
        allworkers: action.payload,
        isDeleteDelete: true,
      };
    case UPDATE_WORKER_PROFILE_SUCCESS:
      return {
        ...state,
        lodding: false,
        allworkers: action.payload,
        isUpdateWorker: true,
      };

    case UPDATE_WORKER_AVATAR_PROFILE_SUCCESS:
      return {
        ...state,
        lodding: false,
        allworkers: action.payload,
        isAvatarUpdate: true,
      };
    case GET_ALL_WORKERS_FAIL:
    case DELETE_WORKER_FAIL:
    case UPDATE_WORKER_PROFILE_FAIL:
    case UPDATE_WORKER_AVATAR_PROFILE_FAIL:
    case CREATE_SEND_OTP_WORKERS_FAIL:
    case CREATE_CONFRIM_WORKERS_FAIL:
    case UPDATE_WORKER_IS_FREE_FAIL:
      return {
        ...state,
        lodding: false,
        isDeleteDelete: false,
        isUpdateWorker: false,
        isAvatarUpdate: false,
        isOtpWorker: false,
        isConfirmWorker: false,
        error: action.payload,
      };
    case REFRESH_WORKER_REQUEST:
      return {
        ...state,
        lodding: false,
        error: null,
        isDeleteDelete: false,
        isUpdateWorker: false,
        isConfirmWorker: false,
        isOtpWorker: false,
        isAvatarUpdate: false,
      };
    default:
      return state;
  }
};

export const singleworkerReducers = (state = { singleworker: {} }, action) => {
  switch (action.type) {
    case GET_SINGLE_WORKER_REQUEST:
      return {
        ...state,
        lodding: true,
      };
    case GET_SINGLE_WORKER_SUCCESS:
      return {
        ...state,
        lodding: false,
        singleworker: action.payload,
      };
    case GET_SINGLE_WORKER_FAIL:
      return {
        ...state,
        lodding: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

///client reducers
export const allclientsReducers = (state = { allclients: [] }, action) => {
  switch (action.type) {
    case GET_ALL_CLIENTS_REQUEST:
      return {
        ...state,
        lodding: true,
      };
    case GET_ALL_CLIENTS_SUCCESS:
      return {
        ...state,
        lodding: false,
        allclients: action.payload,
      };
    case GET_ALL_CLIENTS_FAIL:
      return {
        ...state,
        lodding: false,
        isDeleteClient: false,
        error: action.payload,
      };
    case CLIENTS_REFRESH_REQUEST:
      return {
        ...state,
        lodding: false,
        error: null,
      };
    default:
      return state;
  }
};

/////services
export const servicesReducers = (state = { allservices: [] }, action) => {
  switch (action.type) {
    case GET_ALL_SERVICES_REQUEST:
    case UPDATE_SERVICES_REQUEST:
    case DELETE_SERVICES_REQUEST:
    case CREATE_SERVICES_REQUEST:
    case SERVICE_DISCOUNT_REQUEST:
      return {
        ...state,
        lodding: true,
        isServiceUpdate: false,
        isServiceDelete: false,
        isServiceCreate: false,
        isServiceDiscount: false,
      };
    case GET_ALL_SERVICES_SUCCESS:
      return {
        ...state,
        lodding: false,
        allservices: action.payload,
      };
    case CREATE_SERVICES_SUCCESS:
      return {
        ...state,
        lodding: false,
        isServiceCreate: true,
        allservices: action.payload,
      };
    case UPDATE_SERVICES_SUCCESS:
      return {
        ...state,
        lodding: false,
        isServiceUpdate: true,
        allservices: action.payload,
      };
    case DELETE_SERVICES_SUCCESS:
      return {
        ...state,
        lodding: false,
        isServiceDelete: true,
        allservices: action.payload,
      };
    case SERVICE_DISCOUNT_SUCCESS:
      return {
        ...state,
        lodding: false,
        allservices: action.payload,
        isServiceDiscount: true,
      };
    case GET_ALL_SERVICES_FAIL:
    case UPDATE_SERVICES_FAIL:
    case DELETE_SERVICES_FAIL:
    case CREATE_SERVICES_FAIL:
    case SERVICE_DISCOUNT_FAIL:
      return {
        ...state,
        lodding: false,
        error: action.payload,
        isServiceUpdate: false,
        isServiceDelete: false,
        isServiceCreate: false,
        isServiceDiscount: false,
      };

    case REFRESH_SERVICES:
      return {
        lodding: false,
        error: null,
        isServiceUpdate: false,
        isServiceDelete: false,
        isServiceCreate: false,
        isServiceDiscount: false,
      };
    default:
      return state;
  }
};

/////categories services
export const categoriesServicesReducers = (
  state = { allCategoriesServices: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_CATEGORY_SERVICES_REQUEST:
    case CREATE_CATEGORY_SERVICES_REQUEST:
    case UPDATE_CATEGORY_SERVICES_REQUEST:
    case DELETE_CATEGORY_SERVICES_REQUEST:
      return {
        ...state,
        lodding: true,
        isCategoryCreate: false,
        isCategoryDelete: false,
        isCategoryUpdate: false,
      };
    case GET_ALL_CATEGORY_SERVICES_SUCCESS:
      return {
        ...state,
        lodding: false,
        allCategoriesServices: action.payload,
      };
    case CREATE_CATEGORY_SERVICES_SUCCESS:
      return {
        ...state,
        lodding: false,
        allCategoriesServices: action.payload,
        isCategoryCreate: true,
      };
    case UPDATE_CATEGORY_SERVICES_SUCCESS:
      return {
        ...state,
        lodding: false,
        allCategoriesServices: action.payload,
        isCategoryUpdate: true,
      };
    case DELETE_CATEGORY_SERVICES_SUCCESS:
      return {
        ...state,
        lodding: false,
        allCategoriesServices: action.payload,
        isCategoryDelete: true,
      };
    case GET_ALL_CATEGORY_SERVICES_FAIL:
    case CREATE_CATEGORY_SERVICES_FAIL:
    case UPDATE_CATEGORY_SERVICES_FAIL:
    case DELETE_CATEGORY_SERVICES_FAIL:
      return {
        ...state,
        lodding: false,
        error: action.payload,
        isCategoryCreate: false,
        isCategoryDelete: false,
        isCategoryUpdate: false,
      };
    case REFRESH_SERVICE_CATEGORY_REQUEST:
      return {
        ...state,
        lodding: false,
        error: null,
        isCategoryCreate: false,
        isCategoryDelete: false,
        isCategoryUpdate: false,
      };
    default:
      return state;
  }
};

export const PaymentReducers = (state = { allpayments: [] }, action) => {
  switch (action.type) {
    case GET_ALL_PAYMENT_REQUEST:
      return {
        ...state,
        lodding: true,
      };
    case GET_ALL_PAYMENT_SUCCESS:
      return {
        ...state,
        lodding: false,
        allpayments: action.payload,
      };
    case GET_ALL_PAYMENT_FAIL:
      return {
        ...state,
        lodding: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

///home pages reducers
export const homePagesReducers = (state = { apps: [], videos: [] }, action) => {
  switch (action.type) {
    case GET_HOME_APPS_REQUEST:
    case CREATE_HOME_APPS_REQUEST:
    case CREATE_HOME_PAGE_VIDEO_REQUEST:
    case GET_HOME_PAGE_VIDEO_REQUEST:
      return {
        ...state,
        lodding: true,
        isappsCreate: false,
        isvideoCreate: false,
      };
    case CREATE_HOME_APPS_SUCCESS:
      return {
        ...state,
        lodding: false,
        isappsCreate: true,
      };
    case GET_HOME_APPS_SUCCESS:
      return {
        ...state,
        lodding: false,
        apps: action.payload,
      };

    case CREATE_HOME_PAGE_VIDEO_SUCCESS:
      return {
        ...state,
        lodding: false,
        isvideoCreate: true,
      };
    case GET_HOME_PAGE_VIDEO_SUCCESS:
      return {
        ...state,
        lodding: false,
        videos: action.payload,
      };
    case CREATE_HOME_APPS_FAIL:
    case GET_HOME_APPS_FAIL:
    case CREATE_HOME_PAGE_VIDEO_FAIL:
    case GET_HOME_PAGE_VIDEO_FAIL:
      return {
        ...state,
        lodding: false,
        isvideoCreate: false,
        isappsCreate: false,
        error: action.payload,
      };

    case RESET_HOME_PAGES_METHOD:
      return {
        ...state,
        lodding: false,
        isvideoCreate: false,
        isappsCreate: false,
        error: null,
      };
    default:
      return state;
  }
};

///stateBdCountryReducers
export const BdStateContriesReducers = (
  state = { alldivisions: [], alldistricts: [], allupazilas: [] },
  action
) => {
  switch (action.type) {
    case GET_ALL_DIVISION_REQUEST:
    case GET_ALL_DISTRICT_REQUEST:
    case GET_ALL_UPAZILA_REQUEST:
      return {
        ...state,
        lodding: true,
      };
    case GET_ALL_DIVISION_SUCCESS:
      return {
        ...state,
        lodding: false,
        alldivisions: action.payload,
      };
    case GET_ALL_DISTRICT_SUCCESS:
      return {
        ...state,
        lodding: false,
        alldistricts: action.payload,
      };
    case GET_ALL_UPAZILA_SUCCESS:
      return {
        ...state,
        lodding: false,
        allupazilas: action.payload,
      };
    case GET_ALL_DIVISION_FAIL:
    case GET_ALL_DISTRICT_FAIL:
    case GET_ALL_UPAZILA_FAIL:
      return {
        ...state,
        lodding: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
