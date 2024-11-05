import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import StartIcon from "@mui/icons-material/Start";
import { toast } from "react-toastify";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { useDispatch, useSelector } from "react-redux";
import {
  forgetPasswordAction,
  forgetPasswordConfirmAction,
  loginAction,
  refreshAuthAction,
} from "../../action/auth_admin/AdminAction";
function AdminLogin() {
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [forgetPasswordOtpShow, setForgetPasswordOtpShow] = useState(false);
  const [forgetOtp, setForgetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfrimNewPassword] = useState("");
  const [forgetPhone, setForgetPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isForgetShow, setIsFrogetShow] = useState(false);
  const [password, setPassword] = useState("");
  const {
    lodding,
    error,
    isLogin,
    isForgetPassword,
    isForgetPasswordConfirm,
    userInfo,
  } = useSelector((state) => state.loginState);
  const dispatch = useDispatch();

  //login section handler
  const loginHandler = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    const myFrom = new FormData();
    myFrom.set("email", email);
    myFrom.set("password", password);
    dispatch(loginAction(myFrom));
  };

  ///reset password send otp user phone handler
  const forgetHandler = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    dispatch(forgetPasswordAction(forgetPhone));
  };

  ///reset password confirm handler
  const forgetPasswordOtpHandler = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    if (newPassword !== confirmNewPassword) {
      return toast.warn("user confirm password is not match!");
    }
    const myFrom = new FormData();
    myFrom.set("otp", forgetOtp);
    myFrom.set("newPassword", newPassword);
    myFrom.set("confirmPassword", confirmNewPassword);
    dispatch(forgetPasswordConfirmAction(myFrom));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setButtonDisabled(false);
    }
    if (isLogin) {
      toast.success("user login successfully!");
      if (userInfo?.user.userType === "admin") {
        navigate("/dashboard");
        setButtonDisabled(false);
      } else {
        setButtonDisabled(false);
        navigate("/");
      }
    }
    if (isForgetPassword) {
      toast.success("send otp your phone!");
      setForgetPasswordOtpShow(true);
      setButtonDisabled(false);
    }
    if (isForgetPasswordConfirm) {
      toast.success("user password reset successfully");
      setForgetPasswordOtpShow(false);
      setIsFrogetShow(false);
      navigate("/login");
      setButtonDisabled(false);
    }
    dispatch(refreshAuthAction());
  }, [
    dispatch,
    toast,
    error,
    isLogin,
    isForgetPassword,
    isForgetPasswordConfirm,
  ]);
  return (
    <>
      <div className="loginBody">
        <div class="login">
          {forgetPasswordOtpShow ? (
            <>
              <form onSubmit={forgetPasswordOtpHandler}>
                <h2>Please Enter Your OTP</h2>
                <input
                  type="text"
                  placeholder="Enter Your Otp ... "
                  value={forgetOtp}
                  onChange={(e) => setForgetOtp(e.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="Enter Your New Password ... "
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="Enter Confirm Password ... "
                  value={confirmNewPassword}
                  onChange={(e) => setConfrimNewPassword(e.target.value)}
                  required
                />

                <input type="submit" disabled={buttonDisabled} value="Submit" />
              </form>
            </>
          ) : (
            <>
              {isForgetShow ? (
                <form onSubmit={forgetHandler}>
                  <h2>Forget Password</h2>
                  <p>Please provide your information</p>
                  <input
                    type="text"
                    placeholder="Enter Your Phone ... "
                    value={forgetPhone}
                    onChange={(e) => setForgetPhone(e.target.value)}
                    required
                  />
                  <input
                    type="submit"
                    disabled={buttonDisabled}
                    value="Send OTP"
                  />
                </form>
              ) : (
                <form onSubmit={loginHandler}>
                  <h2>Welcome, Rdtl User!</h2>
                  <p>Please log in</p>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <input
                    type="submit"
                    disabled={buttonDisabled}
                    value="Log In Now"
                  />
                </form>
              )}
            </>
          )}
          <div class="links">
            {isForgetShow !== true && (
              <a
                href="#"
                onClick={() => [
                  setIsFrogetShow((pre) => !pre),
                  setForgetPasswordOtpShow(false),
                ]}
              >
                Forgot password
              </a>
            )}

            {/* {isForgetShow === true ? <a href="#" onClick={()=>[setIsFrogetShow((pre)=>!pre),setForgetPasswordOtpShow(false)]}>Resend OTP</a> : <h5>else</h5>} */}

            
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
