import {
  DELETE_CLIENT_MESSAGE_FAIL,
  DELETE_CLIENT_MESSAGE_REQUEST,
  DELETE_CLIENT_MESSAGE_SUCCESS,
  GET_ALL_CLIENT_MESSAGE_FAIL,
  GET_ALL_CLIENT_MESSAGE_REQUEST,
  GET_ALL_CLIENT_MESSAGE_SUCCESS,
  GET_SINGLE_CLIENT_MESSAGE_FAIL,
  GET_SINGLE_CLIENT_MESSAGE_REQUEST,
  GET_SINGLE_CLIENT_MESSAGE_SUCCESS,
  CONTRACT_MESSAGE_REFRESH_REQUEST,
} from "../constances/ContractConstance";

export const ContractListReducers = (
  state = { allcontractList: [], singleContractList: {} },
  action
) => {
  switch (action.type) {
    case GET_ALL_CLIENT_MESSAGE_REQUEST:
    case GET_SINGLE_CLIENT_MESSAGE_REQUEST:
    case DELETE_CLIENT_MESSAGE_REQUEST:
      return {
        ...state,
        lodding: true,
        isMessageDelete: false,
      };
    case GET_ALL_CLIENT_MESSAGE_SUCCESS:
      return {
        ...state,
        lodding: false,
        allcontractList: action.payload,
      };
    case GET_SINGLE_CLIENT_MESSAGE_SUCCESS:
      return {
        ...state,
        lodding: false,
        singleContractList: action.payload,
      };
    case DELETE_CLIENT_MESSAGE_SUCCESS:
      return {
        ...state,
        lodding: false,
        isMessageDelete: true,
        singleContractList:action.payload
      };
    case GET_ALL_CLIENT_MESSAGE_FAIL:
    case GET_SINGLE_CLIENT_MESSAGE_FAIL:
    case DELETE_CLIENT_MESSAGE_FAIL:
      return {
        ...state,
        lodding: false,
        error: action.payload,
        isMessageDelete:false
      };
    case CONTRACT_MESSAGE_REFRESH_REQUEST:
        return{
            ...state,
            error:null,
            isMessageDelete:false,
            lodding:false
        }
    default:
      return state;
  }
};
