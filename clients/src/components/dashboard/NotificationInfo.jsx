import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../scenes/global/Sidebar";
import Topbar from "../../scenes/global/Topbar";
import "./BookingInfo.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "./NotificationInfo.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { getSingleUserNotificationAction } from "../../action/auth_admin/NotificationAction";
import { toast } from "react-toastify";
function NotificationInfo() {
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isSidebar, setIsSidebar] = useState(true);
  const { lodding, error, singlenotification } = useSelector(
    (state) => state.notificationState
  );
  const dispatch = useDispatch();
  console.log("singe", singlenotification);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getSingleUserNotificationAction(id));
  }, [dispatch, id, error, toast]);
  return (
    <>
      <div className="sidbar__app">
        <Sidebar isSidebar={isSidebar} />
        <div
          className={
            theme.palette.mode === "dark"
              ? "sidbar__content"
              : "sidbar__container__2"
          }
        >
          <Topbar setIsSidebar={setIsSidebar} />
          <div className="notification__container">
            <div className="notification__info__box">
              <h3>Notification Information</h3>
              <div className="notification__info">
                <div className="notification__info__1">
                  <h3
                    style={{
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? " rgb(10, 51, 102)"
                          : "white",
                    }}
                  >
                    Seen Notification
                  </h3>
                  {singlenotification?.seenNotifiactions?.map((item) => (
                    <div
                      style={{
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgb(10, 51, 102)"
                            : "white",
                      }}
                      className="notification__info__1__box"
                    >
                      <div>
                        <button>
                          <ModeEditIcon />
                        </button>
                        <button>
                          <HighlightOffIcon />
                        </button>
                      </div>
                      <div>
                        <span>Send Date :10-05-2024</span>
                        <span>{item.title}</span>
                        <p>{item.description}</p>
                        <Link>{item.details_url}</Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="notification__info__2">
                  <h3
                    style={{
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgb(10, 51, 102)"
                          : "white",
                    }}
                  >
                    New Notification
                  </h3>
                  {singlenotification?.newNotifiactions?.map((item) => (
                    <div
                      style={{
                        backgroundColor:
                          theme.palette.mode === "dark"
                            ? "rgb(10, 51, 102)"
                            : "white",
                      }}
                      className="notification__info__1__box"
                    >
                      <div>
                        <button>
                          <ModeEditIcon />
                        </button>
                        <button>
                          <HighlightOffIcon />
                        </button>
                      </div>
                      <div>
                        <span>Send Date :10-05-2024</span><span>End Date :10-06-2024</span>
                        <br />
                        <h4>{item.title}</h4>
                        <p>{item.description}</p>
                        <Link>{item.details_url}</Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotificationInfo;
