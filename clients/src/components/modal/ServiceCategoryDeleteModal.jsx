import * as React from "react";
import Button from "react-bootstrap/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import QuizIcon from "@mui/icons-material/Quiz";
import "./DeleteModal.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteServicesCategoriesAction,  refreshServiceCategoryAction } from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

function ServiceCategoryDeleteModal({ categoryId ,categoryName}) {
  const [show, setShow] = React.useState(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const[buttonDisabled,setButtonDisabled] = React.useState(false);
  const handleShow = () => setShow(true);
  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const {error,isCategoryDelete} = useSelector((state)=>state.servicesCategoiesState);
  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = (id) => {
    setButtonDisabled(true);
    dispatch(deleteServicesCategoriesAction(id));
  };

  React.useEffect(() => {
    if (error) {
      toast.error(error);
      setButtonDisabled(false)
    }
    if(isCategoryDelete){
        toast.success('service category delete successfully')
        setOpen(false);
        setButtonDisabled(false)
    }
    dispatch(refreshServiceCategoryAction())
  }, [dispatch, error, toast,isCategoryDelete]);

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
            style={{ display: "flex", fontSize: "25px",backgroundColor: theme.palette.mode === "dark"?'rgb(18, 48, 85)':'rgb(225, 218, 218)' }}
            id="alert-dialog-title"
          >
            <QuizIcon /> {"Are sure you want to delete this category?"}
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
              {categoryName}----
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              style={{ color: "white", backgroundColor: "red", padding:'5px 30px',border:'none' }}
              onClick={handleClose}
            >
              Disagree
            </Button>
            <Button
              style={{ color: "white", backgroundColor: "green" ,padding:'5px 35px',border:'none'}}
              onClick={() => deleteHandler(categoryId)}
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

export default ServiceCategoryDeleteModal;
