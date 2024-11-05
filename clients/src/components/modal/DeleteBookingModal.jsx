import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import QuizIcon from "@mui/icons-material/Quiz";
import "./DeleteModal.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { bookingDeleteAction, GetAllBookingAction, refreshBookingAction } from "../../action/auth_admin/BookingAction";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
function DeleteBookingModel({ bookingId }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { lodding, error, allbooking,isBookingDelete } = useSelector((state) => state.bookingState);
  const[buttonDisabled,setButtonDisabled] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = (bookingId) => {
    setButtonDisabled(true);
    dispatch(bookingDeleteAction(bookingId));
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      setButtonDisabled(false);
    }
    if(isBookingDelete){
        toast.success('booking delete  successfully');
        navigate('/dashboard/booking')
        setOpen(false)
        setButtonDisabled(false);
    }
    dispatch(GetAllBookingAction());
    dispatch(refreshBookingAction())
  }, [dispatch, error, toast,isBookingDelete]);
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
          <QuizIcon /> {"Are sure you want to delete this booking?"}
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
            {bookingId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ color: "white", backgroundColor: "red" }}
            onClick={handleClose}
          >
            Disagree
          </Button>
          <Button
            style={{ color: "white", backgroundColor: "green" }}
            onClick={() => deleteHandler(bookingId)}
            autoFocus
            disabled={buttonDisabled}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DeleteBookingModel;
