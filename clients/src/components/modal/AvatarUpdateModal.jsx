import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getSingleWorkerAction,
  refreshWorkerAction,
  workerProfileAvatarUpdateAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
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
import { Localhost } from "../../action/host/HostConnection";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
function AvatarUpdateModal({ id }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(true);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const[buttonDisabled,setButtonDisabled] = React.useState(false);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const { error, isAvatarUpdate } = useSelector(
    (state) => state.allworkerState
  );

  const {
    lodding: singleLoding,
    error: singleError,
    singleworker,
  } = useSelector((state) => state.sigleWorkerState);
  const [avatar, setAvatar] = useState("");
  const [shwoAvator,setShowAvatar] = useState(singleworker?.avatar)

  
  useEffect(() => {
    if (isAvatarUpdate) {
      toast.success("avatar update successfully");
      navigate("/dashboard/worker");
      setOpen(false);
      setButtonDisabled(false);
    }
    if (singleError) {
      toast.error(singleError);
      setButtonDisabled(false);
    }

    dispatch(refreshWorkerAction());
    dispatch(getSingleWorkerAction(id));
  }, [id, singleError, toast, isAvatarUpdate, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    const myfrom = new FormData();
    myfrom.append("avatar", avatar);
    dispatch(workerProfileAvatarUpdateAction(id, myfrom));
  };
  return (
    <React.Fragment>
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
          <QuizIcon /> {"Update Avatar Image ?"}
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
              <Typography>Avatar</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="file"
                sx={{ gridColumn: "span 4" }}
                style={{ color: "red" }}
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              {avatar ? (
                <Typography>
                  <Typography>New Avatar</Typography>
                  <Avatar src={avatar && URL.createObjectURL(avatar)} />
                </Typography>
              ) : (
                <Typography>
                  <Typography>Old Avatar</Typography>
                  <Avatar src={Localhost + `/images/avatars/${shwoAvator}`} />
                </Typography>
              )}
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
                Update
              </Button>
            </Box>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AvatarUpdateModal;
