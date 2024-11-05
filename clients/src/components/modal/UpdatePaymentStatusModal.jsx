import * as React from "react";
import { Box, Button, TextField, Typography, useMediaQuery } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import QuizIcon from "@mui/icons-material/Quiz";
import { useDispatch, useSelector } from "react-redux";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {  getAllWorkerAction, refreshServiceAction } from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GetAllBookingAction, refreshBookingAction, updateBookingWorkerAction, updatePaymentStatusAction } from "../../action/auth_admin/BookingAction";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

function UpdatePaymentStatusModal({bookingId}) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const[buttonDisabled,setButtonDisabled] = React.useState(false);
  const [open, setOpen] = React.useState(true);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [paymentStatus , setPaymentStatus] = React.useState("");


  const { lodding, error, allbooking,isPaymentStatus } = useSelector(
    (state) => state.bookingState
  );


  const dispatch = useDispatch();

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      setButtonDisabled(false)
    }
    if(isPaymentStatus){
        toast.success('status update successfully');
        navigate('/dashboard/booking')
        setOpen(false)
        setButtonDisabled(false)
    }
    dispatch(GetAllBookingAction());
    dispatch(refreshBookingAction())
  }, [dispatch, error, toast,isPaymentStatus]);


  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    dispatch(updatePaymentStatusAction(bookingId,paymentStatus));
  };

const paymentstatusarray = ['Pending', 'Confirmed', 'Completed', 'Cancelled']
 
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
          <QuizIcon /> {"Update Booking Payment Status?"}
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
            <Select
              fullWidth
              variant="filled"
              type="text"
              value={paymentStatus}
              sx={{ gridColumn: "span 4" }}
              style={{ cursor: "pointer" }}
              onChange={(e) =>setPaymentStatus(e.target.value)}
            >
              <option>Select Service Worker</option>
              {paymentstatusarray?.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button disabled={buttonDisabled} style={{fontWeight:'bold',color:'white',backgroundColor:'rgb(80, 166, 245)'}} type="submit" color="secondary" variant="contained">
              PAYMENT STATUS UPDATE
            </Button>
          </Box>
          </form>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default UpdatePaymentStatusModal;
