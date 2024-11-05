import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/dashboard/Header";
import { useTheme } from "@mui/material";
import { useState } from "react";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import DiscountIcon from '@mui/icons-material/Discount';
import { useDispatch, useSelector } from "react-redux";
import {
  getAllServicesAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { toast } from "react-toastify";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link } from "react-router-dom";
import ServiceDeleteModal from "../../components/modal/ServiceDeleteModal";
import ServiceCreateModal from "../../components/modal/ServiceCreateModal";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import ServiceDiscountModal from "../../components/modal/ServiceDiscountModal";
import { Localhost } from "../../action/host/HostConnection";
function ServicesIndex() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [discountShow,setDiscountShow] = useState(false);
  const dispatch = useDispatch();
  const { lodding, error, allservices } = useSelector(
    (state) => state.servicesState
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(getAllServicesAction());
  }, [dispatch, error, toast]);

  const deleteHandler = (id, name) => {
    setDeleteModal((pre) => !pre);
    setServiceId(id);
    setServiceName(name);
  };

  const createHandler = (id) => {
    setCreateModal((pre) => !pre);
  };
  const columns = [
    { field: "sn", headerName: "S/N", flex: 1 },
    {
      field: "categoryName",
      headerName: "Services Category Name",
      flex: 4,
      cellClassName: "name-column--cell",
    },
    {
      field: "name",
      headerName: "Services Name",
      flex: 4,
      cellClassName: "name-column--cell",
    },
    {
      field: "serviceprice",
      headerName: "Services Price",
      flex: 4,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 5,
    },
    {
      field: "discount",
      headerName: "Discount",
      flex: 3,
    },
    {
      field: "discount_type",
      headerName: "Discount Type",
      flex: 3,
    },
    {
      field:'ratings',
      headerName:"Ratings",
      flex:3,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Stack spacing={1}>
                <Rating
                  name="half-rating"
                  defaultValue={params.row.ratings}
                  precision={0.5}
                />
              </Stack>
            </div>
          </>
        );
      },
    },
    {
      field:'image',
      headerName:'Service Image',
      flex:3,
      renderCell:(params)=>{
        return(
          <>
          <div>
           {
            params.row.image &&
            <Link to={Localhost + `/images/services/${params.row.image}`}>
            <img style={{height:'50px',width:'30px'}}  src={Localhost + `/images/services/${params.row.image}`} alt="imgestt"/>
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
      flex: 5,
      renderCell: (params) => {
        return (
          <>
            <div style={{display:'flex',alignItems:'center',justifyContent:'center'}} >
              <button
                style={{
                  border: "none",
                  borderRadius: "3px",
                  backgroundColor: "rgb(17 98 20)",
                  padding: "0px 10px",
                  margin:'3px',
                  height:'30px',
                  width:'40px',
                  display:'flex',
                  alignItems:'center',
                }}
                title="add discount"
                onClick={()=>[setDiscountShow((pre)=>!pre),setServiceId(params.row.id)]}
              >
                <Link>
                  <DiscountIcon style={{ color: "white" }} />
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
              >
                <Link to={`/dashboard/service/update/${params.row.id}`}>
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

  const mockDataServices = [];
  allservices?.forEach((element,index) => {
    mockDataServices.push({
      sn:index+1,
      id: element._id,
      name: element.name,
      serviceprice:`${element.service_price} tk`,
      ratings:element.ratings,
      image:element.image,
      description: element.description,
      discount: element.service_discount?.discount,
      discount_type:element.service_discount?.discount_type,
      categoryName: element.service_category_id?.category_name,
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
            {createModal && <ServiceCreateModal />}
            {deleteModal && (
              <ServiceDeleteModal
                serviceId={serviceId}
                serviceName={serviceName}
              />
            )}
            {discountShow && <ServiceDiscountModal id={serviceId}/>}
            <div className="flex justify-between p-5 pb-0 justify-items-center">
            <Header title="Services" />
            <Link>
              {" "}
              <Button className="!py-2 !px-5 !font-bold !text-white !bg-yellow-500 !capitalize" onClick={createHandler}>
                Create Service
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
                rows={mockDataServices}
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

export default ServicesIndex;
