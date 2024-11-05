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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {
  DiscountServicesAction,
  refreshServiceAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

function ServiceDiscountModal({id}) {
  const[buttonDisabled,setButtonDisabled] = React.useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [discount, setDiscount] = React.useState();
  const [discount_type, setDiscountType] = React.useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { lodding, error, isServiceDiscount } = useSelector(
    (state) => state.servicesState
  );
  const dispatch = useDispatch();



  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    const myFrom = new FormData();
    myFrom.set("discount", discount);
    myFrom.set('discount_type',discount_type)
    dispatch(DiscountServicesAction(id,myFrom));
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      navigate("/dashboard/services");
      setOpen(false);
      setButtonDisabled(false);
    }
    if (isServiceDiscount) {
      toast.success("service discount add successfully!");
      navigate("/dashboard/services");
      setOpen(false);
      setButtonDisabled(false);
    }
    dispatch(refreshServiceAction());
  }, [dispatch, error, toast, navigate, isServiceDiscount]);

  const discountTypes=["Percentage Discount","Taka Amount Discount"]
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
          <QuizIcon /> {"Add Service Discount?"}
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
              <Typography>Discount Price</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                sx={{ gridColumn: "span 4" }}
                value={discount}
                style={{ color: "red" }}
                onChange={(e) => setDiscount(e.target.value)}
              />
              <Typography>Discount Type</Typography>
              <Select
                fullWidth
                variant="filled"
                type="text"
                value={discount_type}
                sx={{ gridColumn: "span 4" }}
                style={{ cursor: "pointer" }}
                required
                onChange={(e) => setDiscountType(e.target.value)}
              >
                <option>Select Service Discount Type</option>
                {discountTypes?.map((item) => (
                  <MenuItem value={item}>{item}</MenuItem>
                ))}
              </Select>
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
                Add Discount
              </Button>
            </Box>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ServiceDiscountModal;
