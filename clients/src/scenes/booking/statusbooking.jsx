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
import { GetAllBookingAction, GetAllBookingByStatusAction } from "../../action/auth_admin/BookingAction";
import InfoIcon from "@mui/icons-material/Info";
import { Link, useParams } from "react-router-dom";
import "./index.css";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import ServiceAddWrokerModal from "../../components/modal/ServiceAddWorkerModel";
import UpdatePaymentStatusModal from "../../components/modal/UpdatePaymentStatusModal";
import DeleteBookingModel from "../../components/modal/DeleteBookingModal";
import Commentbox from "./commentbox";
function BookingIndexByStatus() {
  const [isSidebar, setIsSidebar] = useState(true);
  const {status} = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [bookingId, setBookingId] = React.useState("");
  const [showWorker, setShowWorker] = useState(false);
  const [showPaymentStatus, setShowPaymentStatus] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const { lodding, error, allbooking } = useSelector(
    (state) => state.bookingState
  );

  useEffect(() => {
    dispatch(GetAllBookingByStatusAction(status));
  }, [dispatch,status]);

  const columns = [
    { field: "sn", headerName: "S/N", flex: 1 },
    {
      field: "bookinguser",
      headerName: "Booking Client",
      flex: 3,
      renderCell: (params) => {

        return (
          <>
            <div>
              <Link
                to={`/user/profile/${params.row.bookinguser?._id}`}
                style={{ color: "gold", margin: "3px" }}
              >
                {params.row.bookinguser?.phone ||
                  params.row.bookinguser?.email}
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
      headerName: "Worker",
      flex: 4,
      renderCell: (params) => {
        return (
          <>
            <div>
              {params.row.workers.map((item) => (
                <Link
                  to={`/dashboard/worker/profile/${item?.user?._id}`}
                  style={{ color: "gold", margin: "3px" }}
                >
                  {item.user?.phone || item.user?.email}
                </Link>
              ))}
            </div>
          </>
        );
      },
    },
    {
      field: "advance_amount",
      headerName: "Advance Amount",
      flex: 3,
    },
    {
      field: "total_amount",
      headerName: "Total Amount",
      flex: 3,
    },
    {
      field: "we_will_get_amount",
      headerName: "We Will Get Amount",
      flex: 3,
    },
    {
      field: "paymentstatus",
      headerName: "Payment Status",
      flex: 3,
    },
    {
      field: "ratings",
      headerName: "Ratings",
      flex: 6,
      renderCell: (params) => {
        return (
          <>
            <div onMouseOver={()=>setBookingId(params.row?.id)} className="rating__container">
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
      cellClassName:'center',
      flex: 5,
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
                <Link to={`/dashboard/booking/info/${params.row?.id}`}>
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
                  setBookingId(params.row.id),
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
                  setBookingId(params.row.id),
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
                  setBookingId(params.row.id),
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
  if (allbooking?.length > 0) {
    allbooking.forEach((item,index) => {
      mockDataBookings.push({
        sn:index+1,
        id: item?._id,
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
            <Header title="Bookings" subtitle="List of Bookings " />
            <Link
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                width: "100%",
                backgroundColor: "#897406",
                borderRadius: "5px",
              }}
            >
              <Link
                style={{
                  backgroundColor: "#dfb811",
                  width: "10%",
                  fontWeight: "bold",
                  color: "white",
                  margin: "3px",
                  padding: "2px 20px",
                  borderRadius: "3px",
                }}
                to={`/dashboard/get/booking/status/${'Pending'}`}
              >
                <Button
                  style={{
                    width: "10%",
                    fontWeight: "bold",
                    color: "white",
                    margin: "3px",
                  }}
                >
                  Pending
                </Button>
              </Link>
              <Link
                style={{
                  backgroundColor: "#4b81e9",
                  width: "10%",
                  fontWeight: "bold",
                  color: "white",
                  margin: "3px",
                  padding: "2px 20px",
                  borderRadius: "3px",
                }}
                to={`/dashboard/get/booking/status/${'Confirmed'}`}
              >
                <Button
                  style={{
                    width: "10%",
                    fontWeight: "bold",
                    color: "white",
                    margin: "3px",
                  }}
                >
                  Confirmed
                </Button>
              </Link>
              <Link
                style={{
                  backgroundColor: "#47bd47",
                  width: "10%",
                  fontWeight: "bold",
                  color: "white",
                  margin: "3px",
                  padding: "2px 20px",
                  borderRadius: "3px",
                }}
                to={`/dashboard/get/booking/status/${'Completed'}`}
              >
                <Button
                  style={{
                    width: "10%",
                    fontWeight: "bold",
                    color: "white",
                    margin: "3px",
                  }}
                >
                  Completed
                </Button>
              </Link>
              <Link
                style={{
                  backgroundColor: "#e14778",
                  width: "10%",
                  fontWeight: "bold",
                  color: "white",
                  margin: "3px",
                  padding: "2px 20px",
                  borderRadius: "3px",
                }}
                to={`/dashboard/get/booking/status/${'Cancelled'}`}
              >
                <Button
                  style={{
                    width: "10%",
                    fontWeight: "bold",
                    color: "white",
                    margin: "3px",
                  }}
                >
                  Cancelled
                </Button>
              </Link>
            </Link>
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

export default BookingIndexByStatus;
