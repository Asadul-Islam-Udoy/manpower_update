import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ReplyIcon from "@mui/icons-material/Reply";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  createClientConfrimAction,
  UserRefreshAction,
} from "../../action/auth_user/UserAction";
import { Localhost } from "../../action/host/HostConnection";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
function UserOtp({setShowOtp}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { clientInfo, error, isConfirmClient } = useSelector(
    (state) => state.userLoginState
  );

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createClientConfrimAction(otp));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(UserRefreshAction());
    }
    if (isConfirmClient) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate(`/user/profile/${clientInfo?.user?._id}`);
      }
      dispatch(UserRefreshAction());
    }
  }, [error, navigate, toast, isConfirmClient, clientInfo?.user?._id]);
  return (
    <>
      <div className="container__user__login__register">
        <div className="screen__user__login__register">
          <div className="screen__content">
            <div
              style={{ width: "100%", position: "relative" }}
              className="h-100 lg:w-38 md:h-full md:w-48 md:-mt-20 mt-10 "
            >
              <div className="flex justify-center items-center  font-[sans-serif] h-[50%] md:min-h-screen p-4 md: md:pt-40 md:pb-20 pt-20 pb-10">
                <div className="grid justify-center max-w-md mx-auto ">
                  <div>
                    {/* <img
                      src="./images/worker.avif"
                      className="w-full object-cover rounded-2xl"
                      alt="login-image"
                    /> */}
                  </div>

                  <form
                    onSubmit={submitHandler}
                    className="bg-white min-w-[400px] rounded-2xl p-6 mt-24 relative z-10 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]"
                  >
                    <div className="mb-12">
                      <div className=" my-5 -mt-3 w-10  h-5 ml-1 rounded-full ">
                        <button
                          onClick={() => navigate(-1)}
                          className="pl-2 w-10 h-10 border  pr-2 rounded-md text-black hover:text-black hover:border-blue-500"
                        >
                          <KeyboardBackspaceSharpIcon
                            style={{ color: "blue", fontSize: "14px" }}
                          />
                        </button>
                      </div>
                      <h3 className="text-3xl font-serif font-extrabold text-blue-600">
                        Validation From 
                      </h3>
                    </div>

                    <div className="mt-6">
                      <div className="relative flex items-center">
                        <input
                          name="text"
                          type="text"
                          required
                          value={otp}
                          className="w-full text-gray-800 font-serif text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                          placeholder="Enter your otp"
                          onChange={(e) => setOtp(e.target.value)}
                        />
                        <img
                          src={`${Localhost}/images/logo/phone-call.png`}
                          alt="phone"
                          className="w-5 right-2 absolute"
                        />
                      </div>
                    </div>

                    <div className="mt-12">
                      <div className="text-green-400 italic  m-3 pointer">
                        <span onClick={()=>setShowOtp(false)} className="border-b hover:cursor-pointer font-serif">
                          <ReplyIcon />
                          resend otp
                        </span>
                      </div>
                      <button
                        type="submit"
                        className="w-full font-serif py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                      >
                        Confirm
                      </button>
                    </div>
                  </form>
                </div>
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

export default UserOtp;
