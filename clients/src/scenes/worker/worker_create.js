import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/dashboard/Header";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createWorkerConfrimAction,
  createWorkerOtpAction,
  refreshWorkerAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@emotion/react";
const WorkerCreate = () => {
  const theme = useTheme();
  const[buttonDisabled,setButtonDisabled] = useState(false);
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebar, setIsSidebar] = useState(true);
  const [showOtpFrom, setShowOtpFrom] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState("");
  const [userType, setUserType] = useState("worker");
  const dispatch = useDispatch();
  const [phone_or_email, setPhoneOrEmail] = useState("");
  const navigate = useNavigate();
  const { error, isOtpWorker, isConfirmWorker } = useSelector(
    (state) => state.allworkerState
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      setButtonDisabled (false)
    }
    if (isOtpWorker) {
      toast.success("send otp your phone");
      setShowOtpFrom(true);
      setButtonDisabled (false)
    }
    if (isConfirmWorker) {
      toast.success("worker create successfully!");
      navigate("/dashboard/worker");
      setShowOtpFrom(false);
      setButtonDisabled (false)
    }
    dispatch(refreshWorkerAction());
  }, [error, toast, isOtpWorker, navigate, isConfirmWorker]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createWorkerOtpAction(phone_or_email, userType));
    setButtonDisabled (true)
  };

  const handleSubmitConfrim = (e) => {
    e.preventDefault();
    dispatch(createWorkerConfrimAction(phoneOtp));
    setButtonDisabled (true)
  };
  return (
    <>
      <div className="sidbar__app">
        <Sidebar isSidebar={isSidebar} />
        <div
          className={
            theme.palette.mode === "dark"
              ? "sidbar__content"
              : "sidbar__container__2 "
          }
        >
          <Topbar setIsSidebar={setIsSidebar} />
          <Box m="20px">
            <Header title="CREATE WORKER" subtitle="Create a New Worker" />

            <Formik>
              {showOtpFrom ? (
                <form onSubmit={handleSubmitConfrim}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Enter Otp Number"
                      sx={{ gridColumn: "span 4" }}
                      value={phoneOtp}
                      onChange={(e) => setPhoneOtp(e.target.value)}
                      required
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button disabled={buttonDisabled} type="submit" color="secondary" variant="contained">
                      Submit
                    </Button>
                  </Box>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Contact Number Or Email"
                      sx={{ gridColumn: "span 4" }}
                      value={phone_or_email}
                      onChange={(e) => setPhoneOrEmail(e.target.value)}
                      required
                    />
                  </Box>
                  <Box display="flex" justifyContent="end" mt="20px">
                    <Button disabled={buttonDisabled} type="submit" color="secondary" variant="contained">
                      Create New Worker
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </div>
      </div>
    </>
  );
};

export default WorkerCreate;
