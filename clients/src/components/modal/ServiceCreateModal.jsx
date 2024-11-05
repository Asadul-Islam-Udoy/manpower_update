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
  CreateServicesAction,
  getAllCategoriesServicesAction,
  refreshServiceAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

function ServiceCreateModal() {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(true);
  const[buttonDisabled,setButtonDisabled] = React.useState(false);
  const [image, setImage] = React.useState("");
  const [serviceName, setServiceName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [servicePrice, setServicePrice] = React.useState();
  const [serviceCategory, setServiceCategory] = React.useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { allCategoriesServices } = useSelector(
    (state) => state.servicesCategoiesState
  );
  const { lodding, error, isServiceCreate } = useSelector(
    (state) => state.servicesState
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAllCategoriesServicesAction());
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true)
    const myFrom = new FormData();
    myFrom.set("name", serviceName);
    myFrom.set("description", description);
    myFrom.set("service_category_id", serviceCategory);
    myFrom.set("service_price", servicePrice);
    myFrom.set("image", image);
    dispatch(CreateServicesAction(myFrom));
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      navigate("/dashboard/services");
      setOpen(false);
      setButtonDisabled(false);
    }
    if (isServiceCreate) {
      toast.success("service create successfully!");
      navigate("/dashboard/services");
      setOpen(false);
      setButtonDisabled(false);
    }
    dispatch(refreshServiceAction());
  }, [dispatch, error, toast, navigate, isServiceCreate]);
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
          style={{ display: "flex", fontSize: "25px" ,backgroundColor: theme.palette.mode === "dark"?'rgb(18, 48, 85)':'rgb(225, 218, 218)' }}
          id="alert-dialog-title"
        >
          <QuizIcon /> {"Create Service?"}
          <Box>
            {image && (
              <div style={{margin:'4px'}}>
                <img
                  style={{ height: "40px", width: "40px" }}
                  src={image && URL.createObjectURL(image)}
                />
              </div>
            )}
          </Box>
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
              <Typography>Service Name</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                sx={{ gridColumn: "span 4" }}
                value={serviceName}
                style={{ color: "red" }}
                onChange={(e) => setServiceName(e.target.value)}
              />
              <Typography>Description</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                value={description}
                sx={{ gridColumn: "span 4" }}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Typography>Service Price</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="number"
                value={servicePrice}
                sx={{ gridColumn: "span 4" }}
                onChange={(e) => setServicePrice(e.target.value)}
              />
              <Typography>Service Image</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="file"
                sx={{ gridColumn: "span 4" }}
                onChange={(e) => setImage(e.target.files[0])}
              />
              <Typography sx={{ gridColumn: "span 4" }} >Service Category</Typography>
              <Select
                fullWidth
                variant="filled"
                type="text"
                value={serviceCategory}
                sx={{ gridColumn: "span 4" }}
                style={{ cursor: "pointer" }}
                required
                onChange={(e) => setServiceCategory(e.target.value)}
              >
                <option>Select Service Category</option>
                {allCategoriesServices?.map((item) => (
                  <MenuItem value={item._id}>{item.category_name}</MenuItem>
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
                Create Service
              </Button>
            </Box>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default ServiceCreateModal;
