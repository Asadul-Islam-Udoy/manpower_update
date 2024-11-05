import React, { useEffect, useState } from "react";
import "./Login_User.css";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import {
  createClientOtpAction,
  googleLoginAction,
  UserRefreshAction,
} from "../../action/auth_user/UserAction";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Localhost } from "../../action/host/HostConnection";
const UserLoginComponent = ({emailOrPhone,setEmailOrPhone}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { clientInfo, error, isConfirmClient } = useSelector(
    (state) => state.userLoginState
  );
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createClientOtpAction(emailOrPhone));
  };

  const clientId =
    "234096437468-ecsfg6a7rshikue0on482e7a14tsv5u7.apps.googleusercontent.com";
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scrope: "",
      });
    }
    gapi.load("client:auth2", start);
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isConfirmClient) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate(`/user/profile/${clientInfo?.user?._id}`);
      }
      dispatch(UserRefreshAction());
    }
  }, [dispatch, location, navigate, error, isConfirmClient, toast]);
  const hanglerSubmitGoogle = async (googleData) => {
    const val = googleData.wt.Ad;
    if (val) {
      dispatch(googleLoginAction(val));
    }
  };
  return (
    <div
      style={{ width: "100%", position: "relative" }}
      className="h-100 lg:w-38 md:h-full md:w-48 md:-mt-36  "
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
            className="bg-white rounded-2xl p-6 mt-20 relative min-w-[400px] z-10 shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]"
          >
            <div className="mb-15">
              <div className=" my-5 -mt-3 w-10  h-5 ml-1 rounded-full ">
                <button
                  onClick={() => navigate(-1)}
                  className="pl-2 w-10 h-10 border  pr-2 rounded-md text-black hover:text-black hover:border-blue-500"
                >
                  <KeyboardBackspaceSharpIcon style={{color:'blue',fontSize:'14px'}}/>
                </button>
              </div>
              <h3 className="text-3xl font-serif text-blue-600">Sign Up</h3>
            </div>

            <div className="mt-6">
              <div className="relative flex items-center">
                <input
                  name="text"
                  type="text"
                  value={emailOrPhone}
                  required
                  className="w-full font-serif text-gray-800 text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                  placeholder="Enter email or phone"
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                />
                <img
                  src={`${Localhost}/images/logo/phone-call.png`}
                  alt="phone"
                  className="w-5 right-2 absolute "
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4  w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  for="remember-me"
                  className="text-gray-800 font-serif ml-3 block text-sm"
                >
                  Remember me
                </label>
              </div>
              {/* <div>
                <a
                  href="#"
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  forgot phone or email?
                </a>
              </div> */}
            </div>

            <div className="mt-12">
              <button
                type="submit"
                className="w-full font-serif py-2.5 px-4 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Sign Up
              </button>
            </div>

            <div class="my-4 flex items-center gap-4">
              <hr class="w-full border-gray-300" />
              <p class="text-sm text-gray-800 text-center font-serif">or</p>
              <hr class="w-full border-gray-300" />
            </div>
            {/* <Link to={ Localhost + "/api/users/google"}> */}
            <GoogleLogin
              clientId={clientId}
              buttonText="Log in with Google"
              onSuccess={hanglerSubmitGoogle}
              onFailure={hanglerSubmitGoogle}
              cookiePolicy={"single_host_origin"}
              className="w-full font-serif flex items-center justify-center gap-4 py-3 px-6 text-sm tracking-wide text-gray-800 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none"
            />
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLoginComponent;
