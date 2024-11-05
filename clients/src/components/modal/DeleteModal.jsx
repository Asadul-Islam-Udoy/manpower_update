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
import {
  deleteWorkerClientAction,
  getAllWorkerAction,
  refreshWorkerAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
function DeleteModel({ workerData }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { isDeleteDelete } = useSelector((state) => state.allworkerState);
  const [open, setOpen] = React.useState(true);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };
  const deleteHandler = (id) => {
    setButtonDisabled(true);
    dispatch(deleteWorkerClientAction(id));
  };

  React.useEffect(() => {
    if (isDeleteDelete) {
      toast.success("delete successfully");
      setOpen(false);
      setButtonDisabled(false);
    }
    dispatch(getAllWorkerAction());
    dispatch(refreshWorkerAction());
  }, [isDeleteDelete, dispatch, toast]);
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="bg-transparent worker__delete__container"
      >
        <div class="relative w-full max-w-2xl">
              <div class="inline-block w-full max-w-md overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl xl:max-w-xl">
                <div className="border-b-2">
                  <div class="flex items-center justify-between space-x-4 px-4 py-3 bg-slate-200">
                    <h1 class="text-xl font-bold text-gray-800 flex items-center">
                     
                      <span>Are you sure delete?</span>
                    </h1>
                    <button
                      type="button"
                      class="text-gray-400 hover:text-red-500"
                      onClick={handleClose}
                    >
                      <svg
                        aria-hidden="true"
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span class="sr-only">Close modal</span>
                    </button>
                  </div>
                </div>

                
                <svg class="h-32 w-32 mx-auto rounded-full p-3 bg-red-200 mt-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"></path>
                </svg>

                <p class="text-xl text-gray-800 p-4 text-center">
                  If you continue, you will permanently delete this record. Are
                  you sure you want to continue?
                </p>

                <div class="flex justify-end items-center space-x-4  px-4 py-2 bg-slate-200">
                  <button
                    onClick={handleClose}
                    type="button"
                    class="px-3 py-2 text-sm font-medium bg-white rounded-lg border border-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  >
                    No, cancel
                  </button>
                  <button
                    onClick={() => deleteHandler(workerData?.user?._id)}
                    autoFocus
                    disabled={buttonDisabled}
                    class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-md hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Yes, I'm sure
                  </button>
                </div>
              </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}

export default DeleteModel;
