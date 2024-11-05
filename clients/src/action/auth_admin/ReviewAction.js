import {
    GET_ALL_REVIEWS_FAIL,
     GET_ALL_REVIEWS_REQUEST, 
     GET_ALL_REVIEWS_SUCCESS,
     REFRESH_REVIEW_REQURST
    } from "../../constances/ReviewConstance";
import axios from 'axios';
import { Localhost } from "../host/HostConnection";
    //get all reviews
export const getAllReviewAction=()=>async(dispatch,getState)=>{
    try {
        const {
          loginState: { userInfo },
        } = getState();
        dispatch({ type: GET_ALL_REVIEWS_REQUEST });
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: userInfo?.token?.accesstoken,
          },
        };
        const { data } = await axios.get(
          Localhost + '/api/reviews/get/all',
          config
        );
        if (data) {
          dispatch({
            type: GET_ALL_REVIEWS_SUCCESS,
            payload: data.reviews,
          });
        }
      } catch (error) {
        dispatch({
          type: GET_ALL_REVIEWS_FAIL,
          payload: error.response.data.message,
        });
      }
}

//refresh reviews
export const refreshReviwAction=()=>(dispatch)=>{
    dispatch({type:REFRESH_REVIEW_REQURST})
}