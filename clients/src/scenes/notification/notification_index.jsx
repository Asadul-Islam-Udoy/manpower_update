import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/dashboard/Header";
import { useTheme } from "@mui/material";
import { useState } from "react";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import InfoIcon from "@mui/icons-material/Info";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getAllReviewAction } from "../../action/auth_admin/ReviewAction";
import { getAllNotificationAction } from "../../action/auth_admin/NotificationAction";
function NotificationIndex() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const dispatch = useDispatch();
  const {lodding,error,allnotification} = useSelector((state)=>state.notificationState);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getAllNotificationAction());
  }, [error, toast]);
  const columns = [
    { field: "sn", headerName: "S/N", flex: 1 },
    {
      field: "user",
      headerName: "User",
      flex: 4,
      cellClassName: "name-column--cell",
      renderCell:((params)=>{
        return(
          <>
          <Link to={`/user/profile/${params.row.id}`}>
             <p style={{color:'white'}}>{params.row.user}</p> 
          </Link>
          </>
        )
      })
    },
    {
      field: "action",
      headerName: "Action",
      flex: 3,
      renderCell: (params) => {
        return (
          <>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>
              <button
                style={{
                  border: "none",
                  borderRadius: "3px",
                  backgroundColor: "#50a6f5",
                  padding: "0px 10px",
                  height:'30px',
                  width:'40px',
                  display:'flex',
                  alignItems:'center'
                }}
                title="notification info"
                // onClick={()=>updateHandler(params.row.id)}
              >
                <Link to={`/dashboard/notification/info/${params.row.id}`}>
                  <InfoIcon style={{ color: "white" }} />
                </Link>
              </button>
              <button
                style={{
                  backgroundColor: "#ef630f",
                  marginLeft: "3px",
                  border: "none",
                  borderRadius: "3px",
                  padding: "0px 10px",
                  cursor: "pointer",
                  height:'30px',
                  width:'40px',
                  display:'flex',
                  alignItems:'center'
                }}
                title="delete"
                // onClick={() => deleteHandler(params.row.id, params.row.name)}
              >
                <DeleteForeverIcon style={{ color: "white" }} />
              </button>
            </div>
          </>
        );
      },
    },
  ];
  const isDarkMode = theme.palette.mode === "dark";
  const mockDataNotification = [];
  allnotification?.forEach((element,index) => {
    mockDataNotification.push({
      sn:index+1,
      id: element._id,
      user: element.user?.email || element.user?.phone 
    });
  });
  return (
    <>
      <div className="sidbar__app">
        <Sidebar isSidebar={isSidebar} />
        <div
          className={
            theme.palette.mode === "dark"
              ? "sidbar__content"
              : "sidbar__container__2"
          }
        >
          <Topbar setIsSidebar={setIsSidebar} />
          <Box m="20px"
          sx={{
            backgroundColor: isDarkMode ? "#1f2a40" : "#f5f5f5", // Light or dark mode background
            borderRadius: "8px",
          }}>
            {/* {createModal && <ServiceCategoryCreateModal />}
            {updateModal && <ServiceCategoryUpdateModal categoryId={categoryId} />}
            {deleteModal && <ServiceCategoryDeleteModal categoryId={categoryId}  categoryName={categoryName}/>} */}
            <div className="!p-4 !pb-2"><Header title="User notification"/></div>
            <Box
              height="75vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: colors.blueAccent[700],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: "none",
                  backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                  color: `${colors.greenAccent[200]} !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${colors.grey[100]} !important`,
                },
              }}
            >
              <DataGrid
                rows={mockDataNotification}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
              />
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}

export default NotificationIndex;
