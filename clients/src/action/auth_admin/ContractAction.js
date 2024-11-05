import axios from "axios";
import { Localhost } from "../host/HostConnection";
import { 
    GET_ALL_CLIENT_MESSAGE_FAIL,
    GET_ALL_CLIENT_MESSAGE_REQUEST,
    GET_ALL_CLIENT_MESSAGE_SUCCESS, 
    GET_SINGLE_CLIENT_MESSAGE_FAIL, 
    GET_SINGLE_CLIENT_MESSAGE_REQUEST,
    GET_SINGLE_CLIENT_MESSAGE_SUCCESS,
    DELETE_CLIENT_MESSAGE_REQUEST,
    DELETE_CLIENT_MESSAGE_FAIL,
    DELETE_CLIENT_MESSAGE_SUCCESS,
    CONTRACT_MESSAGE_REFRESH_REQUEST

} from "../../constances/ContractConstance";
///get all client messages
export const allClientMessagesAction = () => async (dispatch,getState) => {
    try {
      dispatch({ type: GET_ALL_CLIENT_MESSAGE_REQUEST });
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      }; 
      const { data } = await axios.get(
        Localhost + '/api/contracts/get/all',
        config
      );
      if (data) {
        dispatch({
          type: GET_ALL_CLIENT_MESSAGE_SUCCESS,
          payload: data.messages,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_ALL_CLIENT_MESSAGE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

///get sinle client messages
export const singleClientMessagesAction = (id) => async (dispatch,getState) => {
    try {
      dispatch({ type: GET_SINGLE_CLIENT_MESSAGE_REQUEST });
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      }; 
      const { data } = await axios.get(
        Localhost + `/api/contracts/get/single/${id}`,
        config
      );
      if (data) {
        dispatch({
          type: GET_SINGLE_CLIENT_MESSAGE_SUCCESS,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: GET_SINGLE_CLIENT_MESSAGE_FAIL,
        payload: error.response.data.message,
      });
    }
  };



///delete client message
export const deleteClientMessagesAction = (userid,messsageid) => async (dispatch,getState) => {
    try {
      dispatch({ type: DELETE_CLIENT_MESSAGE_REQUEST });
      const {
        loginState: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userInfo?.token?.accesstoken,
        },
      }; 
      const { data } = await axios.delete(
        Localhost + `/api/contracts/delete/${userid}/${messsageid}/`,
        config
      );
      if (data) {
        dispatch({
          type: DELETE_CLIENT_MESSAGE_SUCCESS,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: DELETE_CLIENT_MESSAGE_FAIL,
        payload: error.response.data.message,
      });
    }
  };



  //refresh contract 
  export const RefreshAdminContractAction=()=>(dispatch)=>{
    dispatch({type:CONTRACT_MESSAGE_REFRESH_REQUEST});
  }