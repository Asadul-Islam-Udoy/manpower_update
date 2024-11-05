import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
import { Localhost } from "../../action/host/HostConnection";
import {
  GetAllBannersAction,
  getSingleBannersAction,
  refreshBannersAction,
  updateBannersAction,
} from "../../action/auth_admin/BannerAction";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
function BannerUpdateModal({ id }) {
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
  const { lodding, error, singleBanners, isUpdateBanner } = useSelector(
    (state) => state.bannersState
  );
  const [title, setTitle] = useState(singleBanners?.title);
  const [description, setDescription] = useState(singleBanners?.description);
  const [images, setImages] = useState([]);
  const [shwoImages, setShowImages] = useState(singleBanners?.images);
  const [showNewImages, setShowNewImages] = useState([]);


  useEffect(() => {
    if (error) {
      toast.error(error);
      setButtonDisabled(false);
    }
    if (isUpdateBanner) {
      toast.success("banner update successfully");
      navigate("/dashboard/banners");
      setOpen(false);
      setButtonDisabled(false);
    }
    dispatch(GetAllBannersAction());
    dispatch(getSingleBannersAction(id));
    dispatch(refreshBannersAction());
  }, [dispatch, id, error, toast, isUpdateBanner, navigate]);


  
  useEffect(() => {
   setTitle(singleBanners?.title)
   setDescription(singleBanners?.description)
   setImages(singleBanners?.images)
  },[singleBanners]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    const myfrom = new FormData();
    myfrom.set("title", title);
    myfrom.set("description", description);
    if(images.length > 0){
      images.forEach(file => {
        myfrom.append('images',file);
      });
    }
    dispatch(updateBannersAction(id, myfrom));
  };

  const imageHanlers=(e)=>{
    const files = Array.from(e.target.files);
    if(files.length > 0){
      setImages(files)
       files.forEach(file => {
          const render = new FileReader();
          render.onload = ()=>{
            if(render.readyState === 2){
              setShowNewImages((pre)=>[...pre,render.result])
            }
          }
          render.readAsDataURL(file)
       });
    }
  }
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
          style={{ display: "flex", fontSize: "25px" ,backgroundColor: theme.palette.mode === "dark"?'rgb(18, 48, 85)':'rgb(225, 218, 218)'}}
          id="alert-dialog-title"
        >
          <QuizIcon /> {"Update Banner ?"}
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
              <Typography>Banner Images</Typography>
              <input
                fullWidth
                variant="filled"
                type="file"
                sx={{ gridColumn: "span 4" }}
                style={{ color: "red" }}
                onChange={imageHanlers}
                multiple
              />
              <div style={{display:'flex',flexDirection:'column'}}>
              {shwoImages?.length > 0 && (
                <div style={{ display: "flex" }}>
                  <Typography>
                    <Typography>Before Images</Typography>
                    <div style={{ display: "flex" }}>
                      {shwoImages.map((item) => (
                        <img
                          style={{ height: "60px", width: "50px",margin:'4px' }}
                          src={Localhost + `/images/banners/${item.image}`}
                        />
                      ))}
                    </div>
                  </Typography>
                </div>
              )}
              {showNewImages?.length > 0 && (
              <div style={{ display: "flex" }}>
                <Typography>
                  <Typography> After Images</Typography>
                  <div style={{ display: "flex" }}>
                  {showNewImages.map((item) => (
                    <img style={{ height: "60px", width: "50px",margin:'4px' }} src={item} />
                  ))}
                  </div>
                </Typography>
                </div>
              )}
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

export default BannerUpdateModal;
