import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/dashboard/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useDispatch, useSelector } from "react-redux";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import {
  getAllClientsAction,
  getSingleClientAction,
  refreshWorkerAction,
} from "../../action/auth_admin/AdminMaintainAction";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import { Localhost } from "../../action/host/HostConnection";
import WorkerClientDeleteModel from "../../components/modal/DeleteModal";
import { toast } from "react-toastify";
import SingleNotificationModal from "../../components/modal/SingleNotificationModal";
import GroupNotificationModal from "../../components/modal/GroupNotificationModal";
const Client = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const[buttonDisabled,setButtonDisabled] = useState(false);
  const [isSidebar, setIsSidebar] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [singleNotificationShow,setSingleNotificationshow] = useState(false);
  const [groupNotificationShow,setGroupNotificationshow] = useState(false);
  const [clientId,setClientId] = useState("")
  const { lodding, error, allclients } = useSelector(
    (state) => state.allclientsState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClientsAction());
  }, [dispatch]);

  const { error: singleError, singleworker } = useSelector(
    (state) => state.sigleWorkerState
  );

  const deleteHandler = (id) => {
    dispatch(getSingleClientAction(id));
    setDeleteModal((pre) => !pre);
  };

  useEffect(() => {
    if (singleError) {
      toast.error(singleError);
      setButtonDisabled(false)
    }

    dispatch(refreshWorkerAction());
  }, [singleError, toast]);


 


  const columns = [
    { field: "sn", headerName: "S/N", flex: 1 },
    {
      field: "name",
      headerName: "Name",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number Or Eamil",
      flex: 2,
    },
    {
      field: "avatar",
      headerName: "Avatar",
      flex: 2,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Link to={Localhost + `/images/avatars/${params.row.avatar}`}>
                <Typography>
                  <Avatar
                    src={Localhost + `/images/avatars/${params.row.avatar}`}
                  />
                </Typography>
              </Link>
            </div>
          </>
        );
      },
    },
    {
      field: "address",
      headerName: "Address",
      flex: 2,
    },
    {
      field: "area",
      headerName: "Area",
      flex: 2,
    },
    {
      field: "othersInfo",
      headerName: "Others Information",
      flex: 2,
    },
    {
      field: "isvalid",
      headerName: "User Validated", 
      flex: 2,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => {
        return (
          <>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>
              {/* <button
                style={{
                  border: "none",
                  borderRadius: "3px",
                  backgroundColor: "#50a6f5",
                  padding: "0px 10px",
                }}
                title="update"
              >
                <Link to={`/dashboard/worker/update/${params.row.id}`}>
                  <BorderColorIcon style={{ color: "white" }} />
                </Link>
              </button> */}
             
              <button
                style={{
                  backgroundColor: "rgb(131 116 9)",
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
                onClick={() => [setSingleNotificationshow((pre)=>!pre),setClientId(params.row.id)]}
              >
                <CircleNotificationsIcon style={{ color: "white" }} />
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
                onClick={() => deleteHandler(params.row.id)}
              >
                <DeleteForeverIcon style={{ color: "white" }} />
              </button>
            </div>
          </>
        );
      },
    },
  ];

  const mockDataClients = [];
  const isDarkMode = theme.palette.mode === "dark";
  allclients?.forEach((item,index) => {
    mockDataClients.push({
      sn:index+1,
      id: item?.user?._id,
      name: item.username,
      phone: item.phone_or_email,
      isfree: item.is_free,
      address: item.address,
      avatar: item.avatar,
      area: item.area,
      isvalid: item.user?.is_phone_verified,
      othersInfo: item.profile_description,
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
          {singleNotificationShow && <SingleNotificationModal id={clientId}/>}
          {groupNotificationShow && <GroupNotificationModal/>}
          {/* worker delete modal */}
          {deleteModal && <WorkerClientDeleteModel workerData={singleworker} />}
          <Box m="20px" sx={{
                        backgroundColor: isDarkMode ? "#1f2a40" : "#f5f5f5", // Light or dark mode background 
                        borderRadius: "8px",
                      }}>
          
            <div className="flex justify-between p-5 pb-0 justify-items-center">
              <Header title="Clients" />
              <div>
              <Button className="!py-2 !px-5 !font-bold !text-white !bg-yellow-500 !capitalize"
                onClick={()=>[setGroupNotificationshow((pre)=>!pre)]}
                ><CircleNotificationsIcon />
                  Send Group Notification
              </Button>
              </div>
            </div>
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
                rows={mockDataClients}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.id}
              />
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Client;
