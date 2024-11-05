import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/dashboard/Header";
import { useTheme } from "@mui/material";
import { useState } from "react";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import {
  getAllCategoriesServicesAction,
} from "../../action/auth_admin/AdminMaintainAction";
import ServiceCategoryCreateModal from "../../components/modal/ServiceCategoryCreateModal";
import ServiceCategoryUpdateModal from "../../components/modal/ServiceCategoryUpdateModal";
import ServiceCategoryDeleteModal from "../../components/modal/ServiceCategoryDeleteModal";
import { Localhost } from "../../action/host/HostConnection";
function ServicesCategoiesIndex() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [deleteModal, setDeleteModal] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [isSidebar, setIsSidebar] = useState(true);
  const { lodding, error, allCategoriesServices } = useSelector(
    (state) => state.servicesCategoiesState
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getAllCategoriesServicesAction());
  }, [dispatch, error, toast]);

  const deleteHandler = (id, name) => {
    setDeleteModal((pre) => !pre);
    setCategoryId(id);
    setCategoryName(name);
  };

  const createHandler = (id) => {
    setCreateModal((pre) => !pre);
  };

  const updateHandler = (id) => {
    setUpdateModal((pre) => !pre);
    setCategoryId(id);
  };

  const columns = [
    { field: "sn", headerName: "S/N", flex: 1 },
    {
      field: "name",
      headerName: "Categories Name",
      flex: 4,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 5,
    },
    {
      field: "children_category",
      headerName: "Children Category",
      flex: 5,
    },
    {
      field:'image',
      headerName:'Service Category Image',
      flex:3,
      renderCell:(params)=>{
        return(
          <>
          <div>
           {
            params.row.image &&
            <Link to={Localhost + `/images/services_categories/${params.row.image}`}>
            <img style={{height:'50px',width:'30px'}}  src={Localhost + `/images/services_categories/${params.row.image}`} alt="imgestt"/>
            </Link>
           }
          </div>
          </>
        )
      }
    },
    {
      field: "action",
      headerName: "Action",
      flex: 4,
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
                onClick={() => deleteHandler(params.row.id, params.row.name)}
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
  const mockDataServicesCategories = [];
  allCategoriesServices?.forEach((element,index) => {
    mockDataServicesCategories.push({
      sn:index+1,
      id: element._id,
      name: element.category_name,
      image:element.image,
      children_category:element.children?.map((i)=>i.category_name),
      description: element.description,
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
          <Box m="20px" sx={{
              backgroundColor: isDarkMode ? "#1f2a40" : "#f5f5f5", // Light or dark mode background
              borderRadius: "8px",
            }}>
            {createModal && <ServiceCategoryCreateModal />}
            {updateModal && (
              <ServiceCategoryUpdateModal categoryId={categoryId} />
            )}
            {deleteModal && (
              <ServiceCategoryDeleteModal
                categoryId={categoryId}
                categoryName={categoryName}
              />
            )}
            <div className="flex justify-between p-5 pb-0 justify-items-center">
            <Header
              title="Category Services"
            />
            <Link>
              {" "}
              <Button  className="!py-2 !px-5 !font-bold !text-white !bg-yellow-500 !capitalize" onClick={createHandler} >
                Category Service Category
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
                rows={mockDataServicesCategories}
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

export default ServicesCategoiesIndex;
