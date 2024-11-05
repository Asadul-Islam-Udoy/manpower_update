
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
import { crateHomeAppsAction, homePagesRefreshAction } from "../../action/auth_admin/AdminMaintainAction";
function AppsCreateModal() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(true);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const dispatch = useDispatch();
    const[buttonDisabled,setButtonDisabled] = useState(false);
    const[title,setTitle] = useState('');
    const[description,setDescription] = useState('');
    const[image,setImage] = useState('');
    const handleClose = () => {
      setOpen(false);
    };

   const {error,isappsCreate} = useSelector((state)=>state.homePagesState);
  

   const handleSubmit=(e)=>{
    e.preventDefault();
    setButtonDisabled(true);
    const myfrom = new FormData();
    myfrom.set('title',title);
    myfrom.set('description',description);
    myfrom.set('image',image);
    dispatch(crateHomeAppsAction(myfrom));
    
   }

   useEffect(()=>{
     if(error){
        toast.error(error);
     }
     if(isappsCreate){
        toast.success('apps create successfully!');
        setOpen(false);
     }
     setButtonDisabled(false)
     dispatch(homePagesRefreshAction())
   },[dispatch,error,isappsCreate,toast,buttonDisabled,setOpen]);


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
          <QuizIcon /> {"Create Apps Image ?"}
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
                required
                type="text"
                sx={{ gridColumn: "span 4" }}
                style={{ color: "red" }}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Typography>Description</Typography>
              <TextField
                fullWidth
                required
                variant="filled"
                type="text"
                value={description}
                sx={{ gridColumn: "span 4" }}
                style={{ color: "red" }}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Typography>Images</Typography>
              <div>
              <input
                fullWidth
                variant="filled"
                required
                type="file"
                sx={{ gridColumn: "span 4" }}
                style={{ color: "red" }}
                onChange={(e)=>setImage(e.target.files[0])}
              />
              <div >
                <Typography>
                  <div className="h-14 w-14 rounded-sm">
                   <img src={image && URL.createObjectURL(image)}/>
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
                New Create
              </Button>
            </Box>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default AppsCreateModal
