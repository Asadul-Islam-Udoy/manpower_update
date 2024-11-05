import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutAction,
  refreshAuthAction,
} from "../../action/auth_admin/AdminAction";
import { GetAllNewBookingAction } from "../../action/auth_admin/BookingAction";
import { allClientMessagesAction } from "../../action/auth_admin/ContractAction";
const Topbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [isAuth, setIsauth] = useState(false);
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { allnewbooking } = useSelector((state) => state.bookingState);
  const { isLogout, userInfo } = useSelector((state) => state.loginState);
  const { allcontractList } = useSelector((state) => state.contractListState);
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    dispatch(logoutAction());
  };

  useEffect(() => {
    dispatch(GetAllNewBookingAction());
  }, [dispatch]);

  useEffect(() => {
    if (isLogout) {
      toast.success("logout successfully!");
      navigate("/dashboard/login");
    }
    dispatch(refreshAuthAction());
  }, [dispatch, isLogout, navigate, toast]);

  useEffect(() => {
    dispatch(allClientMessagesAction());
  }, [dispatch]);

  const contractListMethod = (data) => {
    const list = [];
    if (data.length > 0) {
      data.forEach((element) => {
        if (element.is_admin_get === false) {
          list.push(element);
        }
      });
    }
    return list.length;
  };
  return (
    <Box display="flex" backgroundColor={colors.primary[400]} justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[300]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              position: "absolute",
              width: "20px",
              height: "20px",
              textAlign: "center",
              fontSize: "10px",
              fontWeight: "bold",
              borderRadius: "50%",
              color: "#ffb418",
              border:
                theme.palette.mode === "dark"
                  ? "2px solid white"
                  : "2px solid black",
            }}
          >
            {allnewbooking?.length}
          </span>
          <Link to="/dashboard/new/booking">
            <button
              style={{
                cursor: "pointer",
                padding: "2px 25px",
                border: "none",
                backgroundColor:
                  theme.palette.mode === "dark" ? "rgb(7 23 66)" : "white",
                color: theme.palette.mode === "dark" ? "white" : "black",
                borderRadius: "3px",
                marginLeft: "2px",
                fontStyle: "italic",
                border: "2px solid white",
                overflow: "hidden",
              }}
            >
              booking
            </button>
          </Link>
        </div>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <div style={{ position: "relative" }}>
          <Link to="/dashboard/contacts">
            <span
              style={{
                position: "absolute",
                backgroundColor: "red",
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                textAlign: "center",
                fontSize: "10px",
              }}
            >
              {contractListMethod(allcontractList)}
            </span>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
          </Link>
        </div>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton style={{ display: "flex", flexDirection: "column" }}>
          <PersonOutlinedIcon onClick={() => setIsauth((pre) => !pre)} />
          {isAuth && (
            <div
              style={{
                backgroundColor:
                  theme.palette.mode === "dark" ? "#32508E" : "#ded5b1",
                position: "absolute",
                marginTop: "69px",
                padding: "5px 12px",
                borderRadius: "3px",
              }}
              className="auth__box__container"
            >
              {userInfo !== null ? (
                <div onClick={logoutHandler} className="auth__box">
                  <Link style={{ textDecoration: "none" }}>
                    <li
                      style={{
                        listStyle: "none",
                        fontWeight: "normal",
                        fontSize: "14px",
                        color:
                          theme.palette.mode === "dark" ? "white" : "black",
                        fontStyle: "italic",
                      }}
                    >
                      logout
                    </li>
                  </Link>
                </div>
              ) : (
                <div className="auth__box">
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <li
                      style={{
                        listStyle: "none",
                        fontWeight: "normal",
                        fontSize: "14px",
                        color:
                          theme.palette.mode === "dark" ? "white" : "black",
                        fontStyle: "italic",
                      }}
                    >
                      login
                    </li>
                  </Link>
                </div>
              )}
            </div>
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
