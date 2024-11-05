import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/dashboard/Header";
import { useTheme } from "@mui/material";
import { useState } from "react";
import Sidebar from "../global/Sidebar";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import "react-toastify/dist/ReactToastify.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Topbar from "../global/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import {
  GetAllBannersAction,
  refreshBannersAction,
  updateActiveBannersAction,
} from "../../action/auth_admin/BannerAction";
import { Localhost } from "../../action/host/HostConnection";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import BannerUpdateModal from "../../components/modal/BannerUpdateModal";
import BannerDeleteModal from "../../components/modal/BannerDeleteModal";
import BannerCreateModal from "../../components/modal/BannerCreateModel";
function BannerIndex() {
  const theme = useTheme();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [bannerId, setBannerId] = useState("");
  const dispatch = useDispatch();
  const { lodding, error, allbanners, isActive } = useSelector(
    (state) => state.bannersState
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isActive) {
      toast.success("this banner is active");
    }
    dispatch(GetAllBannersAction());
    dispatch(refreshBannersAction());
  }, [dispatch, error, toast, isActive]);

  const deleteHandler = (id) => {
    setDeleteModal((pre) => !pre);
    setBannerId(id);
  };

  const createHandler = () => {
    setCreateModal((pre) => !pre);
  };
  const updateIsActiveHandler = (id) => {
    dispatch(updateActiveBannersAction(id));
  };

  const updateHandler = (id) => {
    setUpdateModal((pre) => !pre);
    setBannerId(id);
  };
  const columns = [
    { field: "sn", headerName: "S/N", flex: 1 },
    {
      field: "title",
      headerName: "Title",
      flex: 4,
      cellClassName: "name-column--cell",
    },
    {
      field: "start_date",
      headerName: "Start Date",
      flex: 3,
    },
    {
      field: "end_date",
      headerName: "End Date",
      flex: 3,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 5,
    },
    {
      field: "isActive",
      headerName: "Active Banner",
      flex: 2,
      renderCell: (params) => {
        return (
          <>
            <div>
              <FormGroup
                style={{
                  minHeight: "100px",
                  margin: "5px",
                  display: "inline-block",
                  width: "40%",
                }}
              >
                <FormControlLabel
                  label={`${params.row.isActive}`}
                  control={
                    <Checkbox
                      {...label}
                      defaultChecked={params.row.isActive}
                      color="secondary"
                      onClick={() => updateIsActiveHandler(params.row.id)}
                    />
                  }
                />
              </FormGroup>
            </div>
          </>
        );
      },
    },
    {
      field: "images",
      headerName: "Banner Images",
      flex: 5,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Link to={Localhost + `/images/banners/${params.row.image}`}>
                <img
                  style={{ height: "50px", width: "50px" }}
                  src={Localhost + `/images/banners/${params.row.image}`}
                />
              </Link>
            </div>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 5,
      renderCell: (params) => {
        return (
          <>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100%'}}>
              <button
                style={{
                  border: "none",
                  borderRadius: "3px",
                  backgroundColor: " rgb(169 169 19)",
                  padding: "0px 10px",
                  marginRight: "3px",
                  height:'30px',
                  width:'40px',
                  display:'flex',
                  alignItems:'center'
                }}
                title="images"
              >
                <Link to={`/dashboard/banners/images/${params.row.id}`}>
                  <ViewCarouselIcon style={{ color: "white" }} />
                </Link>
              </button>
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
                title="update"
                onClick={() => updateHandler(params.row.id)}
              >
                <Link>
                  <BorderColorIcon style={{ color: "white" }} />
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

  const mockDataBrancs = [];
  allbanners?.forEach((element,index) => {
    mockDataBrancs.push({
      sn:index+1,
      id: element._id,
      title: element.title,
      description: element.description,
      start_date:element.start_date,
      end_date:element.end_date,
      isActive: element.isActive,
      image: element?.images[0]?.image,
    });
  });
  const isDarkMode = theme.palette.mode === "dark";

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
          <Box m="20px" sx={{
              backgroundColor: isDarkMode ? "#1f2a40" : "#f5f5f5", // Light or dark mode background
              borderRadius: "8px",
            }}>
            {createModal && <BannerCreateModal />}
            {deleteModal && <BannerDeleteModal bannerId={bannerId} />}
            {updateModal && <BannerUpdateModal id={bannerId} />}
            
            <div className="flex justify-between p-5 pb-0 justify-items-center">
            <Header title="Banners" />
            <Link>
              {" "}
              <Button  className="!py-2 !px-5 !font-bold !text-white !bg-yellow-500 !capitalize" 
                onClick={createHandler}
              >
                CREATE BANNER
              </Button>
            </Link>
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
                rows={mockDataBrancs}
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

export default BannerIndex;
