import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
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
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { crateHomeVideosAction, homePagesRefreshAction } from "../../action/auth_admin/AdminMaintainAction";
function VideoCreateModal() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(true);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const[buttonDisabled,setButtonDisabled] = useState(false);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const {error,isvideoCreate} = useSelector((state)=>state.homePagesState);
  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true)
    const myfrom = new FormData();
    myfrom.set("title", title);
    myfrom.set("description", description);
    myfrom.set("video", video);
    dispatch(crateHomeVideosAction(myfrom))
  };
  useEffect(()=>{
    if(error){
       toast.error(error);
    }
    if(isvideoCreate){
       toast.success('video create successfully!');
       setOpen(false);
    }
    setButtonDisabled(false)
    dispatch(homePagesRefreshAction())
  },[dispatch,error,isvideoCreate,toast,buttonDisabled]);
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
          style={{
            display: "flex",
            fontSize: "25px",
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgb(18, 48, 85)"
                : "rgb(225, 218, 218)",
          }}
          id="alert-dialog-title"
        >
          <QuizIcon /> {"Create Video ?"}
        </DialogTitle>
        <DialogContent
          style={{
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgb(18, 48, 85)"
                : "rgb(225, 218, 218)",
          }}
        >
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
                style={{ color: "red" }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Typography>Description</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                value={description}
                sx={{ gridColumn: "span 4" }}
                style={{ color: "red" }}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Typography>Video</Typography>
              <div style={{ display: "flex", flexDirection: "column" }}>
              <input
                fullWidth
                variant="filled"
                type="file"
                sx={{ gridColumn: "span 4" }}
                style={{ color: "red" }}
                onChange={(e) => setVideo(e.target.files[0])}
              />
                <div style={{ display: "flex" }}>
                  <Typography>
                    <div className="h-28 w-28 rounded-sm">
                      <video
                        src={video && URL.createObjectURL(video)}
                        width="100"
                        height="80"
                      />
                    </div>
                  </Typography>
                </div>
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
                Create New Video
              </Button>
            </Box>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default VideoCreateModal;
