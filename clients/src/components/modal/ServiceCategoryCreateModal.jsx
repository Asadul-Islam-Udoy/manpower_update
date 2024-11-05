import  React, { useState } from "react";
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
import Select from "@mui/material/Select";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import QuizIcon from "@mui/icons-material/Quiz";
import { useDispatch, useSelector } from "react-redux";
import {
  createServicesCategoriesAction,
  getAllCategoriesServicesAction,
  refreshServiceCategoryAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

function ServiceCategoryCreateModal() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [image, setImage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState(null);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { error, isCategoryCreate, allCategoriesServices } = useSelector(
    (state) => state.servicesCategoiesState
  );
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    const myFrom = new FormData();
    myFrom.set("category_name", categoryName);
    myFrom.set("image", image);
    myFrom.set("description", description);
    if (parentId !== null) {
      myFrom.set("parentId", parentId);
    }
    dispatch(createServicesCategoriesAction(myFrom));
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      navigate("/dashboard/services/categories");
      setOpen(false);
      setButtonDisabled(false);
    }
    if (isCategoryCreate) {
      toast.success("service category create successfully!");
      navigate("/dashboard/services/categories");
      setOpen(false);
      setButtonDisabled(false);
    }
    dispatch(refreshServiceCategoryAction());
  }, [dispatch, error, toast, navigate, isCategoryCreate]);

  React.useEffect(() => {
    dispatch(getAllCategoriesServicesAction());
  }, [dispatch]);

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
          <QuizIcon /> {"Create Service Category?"}
          <Box>
            {image && (
              <div style={{ margin: "4px" }}>
                <img
                  style={{ height: "40px", width: "40px" }}
                  src={image && URL.createObjectURL(image)}
                />
              </div>
            )}
          </Box>
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
              <Typography sx={{ gridColumn: "span 4" }}>
                Service Category Name
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                type="text"
                sx={{ gridColumn: "span 4" }}
                value={categoryName}
                style={{ color: "red" }}
                onChange={(e) => setCategoryName(e.target.value)}
                required
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
              <Typography sx={{ gridColumn: "span 4" }}>
                Select Parent Service
              </Typography>
              <Select
                fullWidth
                variant="filled"
                type="text"
                value={parentId}
                sx={{ gridColumn: "span 4" }}
                style={{ cursor: "pointer" }}
                onChange={(e) => setParentId(e.target.value)}
              >
                <option>Select Service Category</option>
                {allCategoriesServices?.map((item) => (
                  <MenuItem value={item._id}>{item.category_name}</MenuItem>
                ))}
              </Select>
              <Typography>Service Image</Typography>
              <TextField
                fullWidth
                variant="filled"
                type="file"
                sx={{ gridColumn: "span 4" }}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                disabled={buttonDisabled}
                style={{
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: "rgb(80, 166, 245)",
                }}
                type="submit"
                color="secondary"
                variant="contained"
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

export default ServiceCategoryCreateModal;
