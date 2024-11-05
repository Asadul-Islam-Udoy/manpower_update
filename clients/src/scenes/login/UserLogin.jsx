import React, { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";

import UserLoginComponent from "../../components/authUser/UserLogin";
import { UserRefreshAction } from "../../action/auth_user/UserAction";
import UserOtp from "./UserOtp";
function LoginUser() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [showOtp,setShowOtp] = useState(false);
  const { clientInfo, error, isOtpClient } = useSelector(
    (state) => state.userLoginState
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(UserRefreshAction())
    }
    if (isOtpClient) {
      if (clientInfo) {
        toast.success(clientInfo?.message);
      }
     dispatch(UserRefreshAction())
    //  return <Navigate to='/user/otp/from' replace state={{from:location?.state.from}}/>
      // navigate('/user/otp/from')
      setShowOtp(true)
     } 
     
    }, [error, toast, isOtpClient]);
  return (
    <>
      <div className="container__user__login__register bg-gray-400">
        <div className="screen__user__login__register">
          <div className="screen__content">
            <div className="my-1">
              {" "}
              {/* <h1 className="uppercase w-full  text-center md:text-5xl font-bold text-2xl font-serif  text-white tracking-tight">
                RADISSON DIGITAL TECHNOLOGIES LTD.
              </h1> */}
            </div>
          <div className="">
          {showOtp ? < UserOtp  setShowOtp={setShowOtp}/> :
            <UserLoginComponent emailOrPhone={emailOrPhone} setEmailOrPhone={setEmailOrPhone} />
            }
          </div>
            <div className="social-login flex w-full justify-end flex-col items-end p-4  my-5">
              <h3 className=" mr-5 font-serif">social media page</h3>
              <div className="social-icons flex  top-[300px]">
                <Link to="#" className="social-login__icon fab m-2 fa-instagram">
                  <img className="h-4 w-4 md:w-8 rounded-sm md:h-8" src="https://img.freepik.com/premium-vector/letter-f-icon-social-media-icon-facebook-icon_153454-590.jpg?size=626&ext=jpg&ga=GA1.1.1933048021.1718790888&semt=ais_userf" />
                </Link>
                <Link to="#" className="social-login__icon m-2  fab fa-facebook">
                  <img className="h-4 w-4 md:w-8 rounded-sm  md:h-8" src="https://static.vecteezy.com/system/resources/previews/029/284/964/original/google-logo-on-transparent-background-popular-search-engine-google-logotype-symbol-icon-google-sign-stock-free-vector.jpg" />
                </Link>
                <Link to="#" className="social-login__icon m-2  fab fa-twitter">
                  <img className="h-4 w-4 md:w-8 rounded-sm  md:h-8" src="https://cdn-icons-png.flaticon.com/512/124/124021.png" />
                </Link>
              </div>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginUser;
