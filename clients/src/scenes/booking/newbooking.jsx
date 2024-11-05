import React, { useEffect, useState } from "react";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/dashboard/Header";
import { useTheme } from "@mui/material";
import HailIcon from "@mui/icons-material/Hail";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { GetAllNewBookingAction } from "../../action/auth_admin/BookingAction";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import "./index.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import ServiceAddWrokerModal from "../../components/modal/ServiceAddWorkerModel";
import UpdatePaymentStatusModal from "../../components/modal/UpdatePaymentStatusModal";
import DeleteBookingModel from "../../components/modal/DeleteBookingModal";
import Commentbox from "./commentbox";
function NewBookingIndex() {
  const [isSidebar, setIsSidebar] = useState(true);

  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [bookingId, setBookingId] = React.useState("");
  const [showWorker, setShowWorker] = useState(false);
  const [showPaymentStatus, setShowPaymentStatus] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { lodding, error, allnewbooking } = useSelector(
    (state) => state.bookingState
  );



  useEffect(() => {
    dispatch(GetAllNewBookingAction());
  }, [dispatch]);

  const columns = [
    { field: "sn", headerName: "S/N", flex: 1 },
    {
      field: "bookinguser",
      headerName: "Booking Client",
      flex: 2,
      renderCell: (params) => {
        return (
          <>
            <div>
              <Link
                to={`/dashboard/client/profile/${params.row.bookinguser?.user?._id}`}
                style={{ color: "gold", margin: "3px" }}
              >
                {params.row.bookinguser?.user?.phone ||
                  params.row.bookinguser?.user?.email}
              </Link>
            </div>
          </>
        );
      },
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 3,
    },
    {
      field: "workers",
      headerName: "Service Worker",
      flex: 4,
      renderCell: (params) => {
        return (
          <>
            <div>
              {params.row.workers.map((item) => (
                <Link
                  to={`/dashboard/worker/profile/${item.user._id}`}
                  style={{ color: "gold", margin: "3px" }}
                >
                  {item.user.phone || item.user.email}
                </Link>
              ))}
            </div>
          </>
        );
      },
    },

    {
      field: "address",
      headerName: "Address",
      flex: 4,
    },
    {
      field: "area",
      headerName: "Area",
      flex: 4,
    },
    {
      field: "services",
      headerName: "Services",
      flex: 3,
    },
    {
      field: "othersinfo",
      headerName: "Others Info",
      flex: 3,
    },
    {
      field: "timeschedule",
      headerName: "Time Schedule",
      flex: 3,
    },

    {
      field: "advance_amount",
      headerName: "Advance Amount",
      flex: 1,
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      flex: 3,
    },
    {
      field: "charge_amount",
      headerName: "Charge Amount",
      flex: 3,
    },
    {
      field: "paymentstatus",
      headerName: "Payment Status",
      flex: 1,
    },
    {
      field: "ispayment",
      headerName: "IS Payment",
      flex: 1,
    },
    {
      field: "ratings",
      headerName: "Ratings",
      flex: 8,
      renderCell: (params) => {
        return (
          <>
            <div onMouseOver={()=>setBookingId(params.row.booking)} className="rating__container">
              <Stack spacing={1}>
                <Rating
                  name="half-rating"
                  defaultValue={params.row.ratings}
                  precision={0.5}
                />
              </Stack>
              <div className="comment__box__container">
                <Commentbox id={bookingId} />
              </div>
            </div>
          </>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 11,
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
                  marginLeft: "3px",
                  height:'30px',
                  width:'40px',
                  display:'flex',
                  alignItems:'center'
                }}
                title="booking info"
              >
                <Link to={`/dashboard/booking/info/${params.row.booking}`}>
                  <InfoIcon style={{ color: "white" }} />
                </Link>
              </button>

              <button
                style={{
                  backgroundColor: "rgb(200 126 20)",
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
                title="add service worker"
                onClick={() => [
                  setShowWorker((pre) => !pre),
                  setBookingId(params.row.booking),
                ]}
              >
                <HailIcon style={{ color: "white" }} />
              </button>
              <button
                style={{
                  backgroundColor: "#ef63",
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
                title="edit payment status"
                onClick={() => [
                  setShowPaymentStatus((pre) => !pre),
                  setBookingId(params.row.booking),
                ]}
              >
                <BorderColorIcon style={{ color: "white" }} />
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
                onClick={() => [
                  setShowDelete((pre) => !pre),
                  setBookingId(params.row.booking),
                ]}
              >
                <DeleteForeverIcon style={{ color: "white" }} />
              </button>
            </div>
          </>
        );
      },
    },
  ];

  let mockDataBookings = [];
  if (allnewbooking?.length > 0) {
    allnewbooking.forEach((item,index) => {
      mockDataBookings.push({
        sn:index+1,
        id: item._id,
        phone: item.phone,
        address: item.address,
        workers: item?.workers,
        othersinfo: item.others_info,
        area: item.area,
        ratings: item.ratings,
        bookinguser: item?.user,
        advance_amount: item.advance_amount || 0,
        total_amount: item.total_amount || 0,
        we_will_get_amount: item.we_will_get_payment,
        paymentstatus: item.is_payment_status,
        ispayment: item.is_payment?.status,
        booking:item.bookingId,
        services: [
          item?.services?.map(
            (i, index) => `(${index + 1})` + " " + i.service?.name
          ),
        ],
     
      });
    });
  }
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
          {showWorker && <ServiceAddWrokerModal bookingId={bookingId} />}
          {showPaymentStatus && (
            <UpdatePaymentStatusModal bookingId={bookingId} />
          )}
          {showDelete && <DeleteBookingModel bookingId={bookingId} />}
          <Box m="20px">
            <Header title="New Booking" subtitle="List of New Booking " />
            <Box
              m="40px 0 0 0"
              height="73vh"
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
                style={{ overflow: "auto", width: "100%" }}
                rows={mockDataBookings}
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

export default NewBookingIndex;
