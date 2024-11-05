import * as React from "react";
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
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import {
  getAllWorkerAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  GetAllBookingAction,
  refreshBookingAction,
  updateBookingWorkerAction,
} from "../../action/auth_admin/BookingAction";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

function ServiceAddWrokerModal({ bookingId }) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(true);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [workerId, setWorkerId] = React.useState([]);
  const[buttonDisabled,setButtonDisabled] = React.useState(false);
  const { allworkers } = useSelector((state) => state.allworkerState);

  const { lodding, error, allbooking, isAddWorker } = useSelector(
    (state) => state.bookingState
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      setButtonDisabled(false);
    }
    if (isAddWorker) {
      toast.success("worker add this service successfully");
      navigate("/dashboard/booking");
      setOpen(false);
      setButtonDisabled(false);
    }
    dispatch(getAllWorkerAction());
    dispatch(GetAllBookingAction());
    dispatch(refreshBookingAction());
  }, [dispatch, error, toast, isAddWorker]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    dispatch(updateBookingWorkerAction(workerId,bookingId));
  };

  const workerIdHandler =(id)=>{
    if(!workerId.includes(id)){
      setWorkerId((pre)=>[...pre,id])
    }
    else{
      const filter_list = workerId.filter((i)=>i !== id)
      setWorkerId(filter_list)
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
          <QuizIcon /> {"Add the Worker in the Service?"}
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
              {allworkers?.map((item, index) => (
                <FormControlLabel
                  label={`${item.username}`}
                  control={
                    <Checkbox
                      {...label}
                      defaultChecked={false}
                      color="secondary"
                      onClick={() => workerIdHandler(item?.user?._id)}
                    />
                  }
                />
              ))}
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
                Add Worker This Service
              </Button>
            </Box>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ServiceAddWrokerModal;
