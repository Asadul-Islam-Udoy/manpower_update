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

} from "../constances/ServiceConstance";

export const serviceListReducers = (
  state = { servicesList: [], singleService: {} },
  action
) => {
  switch (action.type) {
    case GET_CATEGORY_BASIC_SERVICES_REQUEST:
    case GET_GET_SINGLE_SERVICES_REQUEST:
      return {
        ...state,
        lodding: true,
      };
    case GET_CATEGORY_BASIC_SERVICES_SUCCESS:
      return {
        ...state,
        lodding: false,
        servicesList: action.payload,
      };
    case GET_GET_SINGLE_SERVICES_SUCCESS:
      return {
        ...state,
        lodding: false,
        singleService: action.payload,
      };
    case GET_CATEGORY_BASIC_SERVICES_FAIL:
    case GET_GET_SINGLE_SERVICES_FAIL:
      return {
        ...state,
        lodding: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const CategoryBasicserviceListReducers = (
  state = { CategoryservicesList: [], ServiceCategoryservicesList: [] },
  action
) => {
  switch (action.type) {
    case GET_PARENT_CATEGORY_SERVICES_REQUEST:
    case GET_CATEGORY_SERVICES_REQUEST:
      return {
        ...state,
        lodding: true,
      };
    case GET_PARENT_CATEGORY_SERVICES_SUCCESS:
      return {
        ...state,
        lodding: false,
        CategoryservicesList: action.payload,
      };
    case GET_CATEGORY_SERVICES_SUCCESS:
      return {
        ...state,
        lodding: false,
        ServiceCategoryservicesList: action.payload,
      };
    case GET_PARENT_CATEGORY_SERVICES_FAIL:
    case GET_CATEGORY_SERVICES_FAIL:
      return {
        ...state,
        lodding: false,
        error: action.payload,
      };
    default:
      return state;
  }
};


