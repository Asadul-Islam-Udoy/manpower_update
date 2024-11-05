import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
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
import {
  notificationRefreshAction,
  SendSingleNotificationAction,
} from "../../action/auth_admin/NotificationAction";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

function SingleNotificationModal({ id }) {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const[buttonDisabled,setButtonDisabled] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [details_url, setDetails_Url] = useState("");
  const [endDate, setEndDate] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClose = () => {
    setOpen(false);
  };
  const { lodding, error, isSingleNoti } = useSelector(
    (state) => state.notificationState
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    const myfrom = new FormData();
    myfrom.set("title", title);
    myfrom.set("description", description);
    myfrom.set("details_url", details_url);
    myfrom.set("end_date", endDate);
    dispatch(SendSingleNotificationAction(id, myfrom));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      setButtonDisabled(false);
    }
    if (isSingleNoti) {
      toast.success("notification send successfully");
      navigate("/dashboard/client");
      setOpen(false);
      setButtonDisabled(false);
    }
    dispatch(notificationRefreshAction());
  }, [dispatch, error, toast, isSingleNoti]);
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
          style={{ display: "flex", fontSize: "25px",backgroundColor: theme.palette.mode === "dark"?'rgb(18, 48, 85)':'rgb(225, 218, 218)' }}
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
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <Typography>Description</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                value={description}
                sx={{ gridColumn: "span 4" }}
                required
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

export default SingleNotificationModal;
