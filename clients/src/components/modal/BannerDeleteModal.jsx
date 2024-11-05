import  React ,{useState,useEffect} from "react";
import Button from "react-bootstrap/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import QuizIcon from "@mui/icons-material/Quiz";
import "./DeleteModal.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteActiveBannersAction, refreshBannersAction } from "../../action/auth_admin/BannerAction";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

function BannerDeleteModal({ bannerId }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const[buttonDisabled,setButtonDisabled] = useState(false);
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const { lodding, error,isDeleteBanner} = useSelector(
    (state) => state.bannersState
  );
  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = (id) => {
    setButtonDisabled(true);
    dispatch(deleteActiveBannersAction(id));
  };

useEffect(() => {
    if (error) {
      toast.error(error);
      setButtonDisabled(false);
    }
    if(isDeleteBanner){
        toast.success('banner delete successfully')
        setOpen(false);
        setButtonDisabled(false);
    }
    dispatch(refreshBannersAction())
  }, [dispatch, error, toast,isDeleteBanner]);

  return (
    <>
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
            <QuizIcon /> {"Are sure you want to delete this Banner?"}
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
            >
            </DialogContentText>
          </DialogContent >
          <DialogActions>
            <Button
              style={{ color: "white", backgroundColor: "red", padding:'5px 30px',border:'none' }}
              onClick={handleClose}
            >
              Disagree
            </Button>
            <Button
              style={{ color: "white", backgroundColor: "green" ,padding:'5px 35px',border:'none'}}
              onClick={() => deleteHandler(bannerId)}
              autoFocus
              disabled={buttonDisabled}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </>
  );
}

export default BannerDeleteModal;
