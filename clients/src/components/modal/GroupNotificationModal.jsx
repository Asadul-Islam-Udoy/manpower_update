import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import QuizIcon from "@mui/icons-material/Quiz";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getAllClientsAction } from "../../action/auth_admin/AdminMaintainAction";
import {
  notificationRefreshAction,
  SendGroupNotificationAction,
} from "../../action/auth_admin/NotificationAction";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
function GroupNotificationModal() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details_url, setDetails_Url] = useState("");
  const [groupUserId, setGroupUserId] = useState([]);
  const [endDate,setEndDate] = useState("");
  const[buttonDisabled,setButtonDisabled] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const { lodding, error, isGroupNoti } = useSelector(
    (state) => state.notificationState
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    const myfrom = new FormData();
    myfrom.set("title", title);
    myfrom.set("description", description);
    myfrom.set("details_url", details_url);
    myfrom.append("usersId", groupUserId);
    myfrom.set('end_date',endDate);
    dispatch(SendGroupNotificationAction(myfrom));
  };

  const { allclients } = useSelector((state) => state.allclientsState);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setButtonDisabled(false);
    }
    if (isGroupNoti) {
      toast.success("groups notification send successfully");
      navigate("/dashboard/client");
      setOpen(false);
      setButtonDisabled(false);
    }
    dispatch(getAllClientsAction());
    dispatch(notificationRefreshAction());
  }, [dispatch, error, toast, isGroupNoti]);

  const addAllUserSelectHandler = (allclients) => {
    if (groupUserId?.length <= 0) {
      allclients?.forEach((element) => {
        setGroupUserId((pre) => [...pre, element?.user?._id]);
      });
    } else {
      setGroupUserId([]);
    }
  };
  const inseartDataHandler = (id) => {
    if (!groupUserId.includes(id)) {
      setGroupUserId((pre) => [...pre, id]);
    } else {
      const datafilter = groupUserId.filter((i) => i !== id);
      setGroupUserId(datafilter);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="worker__delete__container"
      >
        <DialogTitle
          style={{ display: "flex", fontSize: "25px" ,backgroundColor: theme.palette.mode === "dark"?'rgb(18, 48, 85)':'rgb(225, 218, 218)'}}
          id="alert-dialog-title"
        >
          <QuizIcon /> {"Send User Notification?"}
        </DialogTitle>
        <DialogContent style={{backgroundColor: theme.palette.mode === "dark"?'rgb(18, 48, 85)':'rgb(225, 218, 218)'}}>
          <DialogContentText
            style={{
              color: "red",
              display: "flex",
              fontWeight: "bold",
              fontSize: "30px",
              fontStyle: "italic",
              margin: "10px",
            }}
            id="alert-dialog-description"
          ></DialogContentText>
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
              <Typography>Title</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                sx={{ gridColumn: "span 4" }}
                value={title}
                style={{ color: "red" }}
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <Typography>Description</Typography>
              <TextField
                fullWidth
                variant="filled"
                required
                type="text"
                value={description}
                sx={{ gridColumn: "span 4" }}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Typography>Details Url</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                value={details_url}
                sx={{ gridColumn: "span 4" }}
                onChange={(e) => setDetails_Url(e.target.value)}
              />
              <Typography>End Date</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="date"
                value={endDate}
                sx={{ gridColumn: "span 4" }}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "auto",
                }}
              >
                <FormGroup
                  style={{
                    height: "250px",
                    margin: "5px",
                    display: "inline-block",
                    minWidth: "400px",
                    overflow: "scroll",
                    flexDirection: "row",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ width: "100%" }}>Select Sender User</span>
                    <Button
                      onClick={() => addAllUserSelectHandler(allclients)}
                      style={{
                        color: "green",
                        backgroundColor: "white",
                        padding: "1px",
                        border: "none",
                      }}
                    >
                      All
                    </Button>
                  </div>
                  {allclients?.map((item, index) => (
                    <div
                      style={{
                        display: "flex",
                        marginTop: "10px",
                        borderBottom: "1px solid",
                        minWidth: "180px",
                      }}
                    >
                      <input
                        style={{ height: "20px", cursor: "pointer" }}
                        type="checkbox"
                        onChange={() => inseartDataHandler(item.user?._id)}
                        checked={groupUserId.includes(item.user?._id)}
                      />
                      <span style={{ fontStyle: "italic" }}>
                        {item.username || item.phone_or_email}
                      </span>
                    </div>
                  ))}
                </FormGroup>
              </div>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                style={{
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "rgb(80, 166, 245)",
                }}
                type="submit"
                color="secondary"
                variant="contained"
                disabled={buttonDisabled}
              >
                SEND
              </Button>
            </Box>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
}

export default GroupNotificationModal;
