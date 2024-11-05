import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import {
  refreshAuthAction,
  registerAction,
  registerOtpAction,
} from "../../action/auth/UserAuthAction";

function Register_User() {
  const navigate = useNavigate();
  const[buttonDisabled,setButtonDisabled] = useState(false);
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { lodding, isRegister, error, userRegisterInfo, isUserOtp } =
    useSelector((state) => state.registerState);
  const [isOtpShow, setIsOtpShow] = useState(false);
  const dispatch = useDispatch();
  const registerHandler = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    var formData = new FormData();
    if (password !== confirmPassword) {
      return toast.warn("confirm password is not match");
    }
    formData.set("name", name);
    formData.set("email", email);
    formData.set("phone", phone);
    formData.set("password", password);
    formData.set("userType", "client");
    dispatch(registerAction(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      setButtonDisabled(false);
    }
    if (isRegister) {
      toast.success(userRegisterInfo?.message);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");
      setIsOtpShow(true);
      setButtonDisabled(false);
    }
    if (isUserOtp) {
      toast.success("otp varify success plaease login now");
      navigate("/login");
      setIsOtpShow(false);
      setButtonDisabled(false);
    }
    dispatch(refreshAuthAction());
  }, [
    dispatch,
    toast,
    error,
    isRegister,
    userRegisterInfo?.message,
    isUserOtp,
  ]);

  const otpHandler = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    dispatch(registerOtpAction(otp));
  };
  return (
    <>
      <div class="container__user__login__register">
        <div class="screen__user__login__register">
          <div class="screen__content">
            <div className="login__register__header__title">
              {" "}
              <h1>RADISSON DIGITAL TECHNOLOGIES LTD.</h1>
            </div>
            {isOtpShow ? (
              // OTP SHOW FORM
              <form class="login__register" onSubmit={otpHandler}>
                <div class="login__register__field">
                  <i class="login__icon fas fa-user"></i>
                  <input
                    type="text"
                    class="login__input"
                    placeholder="Please write the Otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
                <button disabled={buttonDisabled} class="button login__submit">
                  <span class="button__text">Submit</span>
                  <i class="button__icon fas fa-chevron-right"></i>
                </button>
                <div
                  style={{
                    marginLeft: "50px",
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px",
                  }}
                >
                  <CompareArrowsIcon style={{ color: "gold" }} />
                  <Link
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      fontStyle: "italic",
                      color: "gold",
                      opacity: "0.6",
                    }}
                  >
                    resend otp
                  </Link>
                </div>
              </form>
            ) : (
              <>
               {/* REGISTER FORM */}
                <form class="login__register" onSubmit={registerHandler}>
                  <div class="login__register__field">
                    <i class="login__icon fas fa-user"></i>
                    <input
                      type="text"
                      class="login__input"
                      placeholder="User name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div class="login__register__field">
                    <i class="login__icon fas fa-user"></i>
                    <input
                      type="email"
                      class="login__input"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div class="login__register__field">
                    <i class="login__icon fas fa-user"></i>
                    <input
                      type="text"
                      class="login__input"
                      placeholder="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div class="login__field">
                    <i class="login__icon fas fa-lock"></i>
                    <input
                      type="password"
                      class="login__input"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div class="login__register__field">
                    <i class="login__icon fas fa-user"></i>
                    <input
                      type="text"
                      class="login__input"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button disabled={buttonDisabled} class="button login__submit">
                    <span class="button__text">Register Now</span>
                    <i class="button__icon fas fa-chevron-right"></i>
                  </button>
                </form>
                <div style={{ margin: "10px" }}>
                  <div>
                    <p style={{ display: "flex", color: "rgb(187 193 197)" }}>
                      <ExitToAppIcon style={{ fontSize: "17px" }} />
                      if you already register user please ?{" "}
                      <Link
                        to="/login"
                        style={{ color: "black", fontStyle: "italic" }}
                      >
                        sign-in
                      </Link>
                    </p>
                  </div>
                </div>
              </>
            )}
            <div class="social-login">
              <h3>log in via</h3>
              <div class="social-icons">
              <Link to="#" className="social-login__icon fab fa-instagram">
                  <img src="https://img.freepik.com/premium-vector/letter-f-icon-social-media-icon-facebook-icon_153454-590.jpg?size=626&ext=jpg&ga=GA1.1.1933048021.1718790888&semt=ais_userf"/>
                </Link>
                <Link to="#" className="social-login__icon fab fa-facebook">
                   <img src="https://static.vecteezy.com/system/resources/previews/029/284/964/original/google-logo-on-transparent-background-popular-search-engine-google-logotype-symbol-icon-google-sign-stock-free-vector.jpg"/>
                </Link>
                <Link to="#" className="social-login__icon fab fa-twitter">
                   <img src="https://cdn-icons-png.flaticon.com/512/124/124021.png"/>
                </Link>
              </div>
            </div>
          </div>
          <div class="screen__background">
            <span class="screen__background__shape screen__background__shape4"></span>
            <span class="screen__background__shape screen__background__shape3"></span>
            <span class="screen__background__shape screen__background__shape2"></span>
            <span class="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register_User;
