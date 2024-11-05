import axios from 'axios';
import { Localhost } from '../host/HostConnection';
import { 
       REGISTER_CREATE_FAIL,
       REGISTER_CREATE_REQUEST, 
       REGISTER_CREATE_SUCCESS ,
       LOGIN_CREATE_FAIL,
       LOGIN_CREATE_REQUEST, 
       LOGIN_CREATE_SUCCESS,
       REFRESH_LODDER_AUTH,
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
       UPDATE_ADMIN_PROFILE_REQUEST,
       UPDATE_ADMIN_PROFILE_SUCCESS,
       UPDATE_ADMIN_PROFILE_FAIL
     } from '../../constances/AdminConstance';





///sign up action
export const registerAction = (fromData) =>async(dispatch)=>{
  try{
   dispatch({type:REGISTER_CREATE_REQUEST})
   const config = {headers:{'Content-Type':'application/json'}};
   const{data} = await axios.post(Localhost+'/api/admins/signup',fromData,config);
  if(data){
    dispatch({
        type:REGISTER_CREATE_SUCCESS,
        payload:data
    })
  }
  }
  catch(error){
    dispatch({type:REGISTER_CREATE_FAIL,
        payload:error.response.data.message
    })
  }
}




///otp action
export const registerOtpAction = (otp) =>async(dispatch)=>{
    try{
     dispatch({type:OTP_SEND_REQUEST})
     const config = {headers:{'Content-Type':'application/json'}};
     const{data} = await axios.get(Localhost+`/api/admins/is_verified/phone/otp/${otp}/`,config);
    if(data){
      dispatch({
          type:OTP_SEND_SUCCESS,
          payload:data
      })
      localStorage.removeItem('userRegisterInfo')
    }
    }
    catch(error){
      dispatch({type:OTP_SEND_FAIL,
          payload:error.response.data.message
      })
    }
  }



//signin action
export const loginAction = (fromData) =>async(dispatch)=>{
    try{
     dispatch({type:LOGIN_CREATE_REQUEST})
     const config = {headers:{'Content-Type':'application/json'}};
     const{data} = await axios.post(Localhost+'/api/admins/signin',fromData,config);
     dispatch({
      type:LOGIN_CREATE_SUCCESS,
      payload:data
     })
     localStorage.setItem('userInfo',JSON.stringify(data));
    }
    catch(error){
      dispatch({type:LOGIN_CREATE_FAIL,
          payload:error.response.data.message
      })
    }
  }


  
//forget password action send otp phone
export const forgetPasswordAction = (phone) =>async(dispatch)=>{
    try{
     dispatch({type:FORGET_PASSWORD_REQUEST});
     const config = {headers:{'Content-Type':'application/json'}};
     const{data} = await axios.put(Localhost+'/api/admins/admin/password/reset/',{phone},config);
     dispatch({
      type:FORGET_PASSWORD_SUCCESS,
      payload:data
     })
    }
    catch(error){
      dispatch({type:FORGET_PASSWORD_FAIL,
          payload:error.response.data.message
      })
    }
  }


  //forget password confirm action
export const forgetPasswordConfirmAction = (fromData) =>async(dispatch)=>{
  try{
   dispatch({type:FORGET_PASSWORD_CONFIRM_REQUEST});
   const config = {headers:{'Content-Type':'application/json'}};
   const{data} = await axios.put(Localhost+'/api/admins/admin/password/reset/verified/',fromData,config);
   dispatch({
    type:FORGET_PASSWORD_CONFIRM_SUCCESS,
    payload:data
   })
  }
  catch(error){
    dispatch({type:FORGET_PASSWORD_CONFIRM_FAIL,
        payload:error.response.data.message
    })
  }
}

  //user token refresh action
  export const userTokenRefreshAction = () =>async(dispatch,getState)=>{
    try{
     const{loginState:{userInfo}}  = getState();
     dispatch({type:USER_TOKEN_REFRESH_REQUEST});
     const config = {headers:{'Content-Type':'application/json',
      Authorization:userInfo?.token?.refreshtoken
     }};
     
     const{data} = await axios.post(Localhost+'/api/admins/refresh/token/',{},config);
     dispatch({
      type:USER_TOKEN_REFRESH_SUCCESS,
      payload:data
     });
     localStorage.setItem('userInfo',JSON.stringify(data));
    }
    catch(error){
      dispatch({type:USER_TOKEN_REFRESH_FAIL,
          payload:error.response.data.message
      })
    }
  }

/// admin logout 
export const logoutAction = () =>async(dispatch)=>{
   dispatch({
    type:LOGOUT_REQUEST_SUCCESS,
   });
   localStorage.removeItem('userInfo');
}


///refresh user reducers action
export const refreshAuthAction = () =>async(dispatch)=>{
    dispatch({type:REFRESH_LODDER_AUTH});
}

//update admi profile
export const updateAdminProfileAction = (id,fromdata) => async (dispatch, getState) => {
  try {
    const {
      loginState: { userInfo },
    } = getState();
    dispatch({ type: UPDATE_ADMIN_PROFILE_REQUEST });
    const { data } = await axios.put(
      Localhost + `/api/admins/update/admin/${id}/`,fromdata,{
      headers: {
        Authorization: userInfo?.token?.accesstoken,
      }},
    );
    if (data) {
      dispatch({
        type: UPDATE_ADMIN_PROFILE_SUCCESS,
        payload: data,
      });
      localStorage.setItem('userInfo',JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: UPDATE_ADMIN_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};