import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/dashboard/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPaymentAction } from "../../action/auth_admin/AdminMaintainAction";
import Sidebar from "../global/Sidebar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Topbar from "../global/Topbar";
import { Link } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import DeletePaymentToBookingModal from "../../components/modal/DeletePaymentToBookingModal";
const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const dispatch = useDispatch();
  const { lodding, error, allpayments } = useSelector(
    (state) => state.paymentState
  );

  useEffect(() => {
    dispatch(getAllPaymentAction());
  }, [dispatch]);

  const columns = [
    { field: "sn", headerName: "S/N", flex: 1 },
    {
      field: "userid",
      headerName: "User Id",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "tran_id",
      headerName: "Tran ID",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      flex: 1,
    },
    {
      field: "before_payment_id",
      headerName: "Before Payment Id",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
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
                title="payment and booking info"
              >
                <Link to={`/dashboard/booking/info/${params.row?.id}`}>
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
                onClick={() => [
                  setShowDelete((pre) => !pre),
                  setPaymentId(params.row.id),
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

  let mockDataPayment = [];

  if (allpayments?.length > 0) {
    allpayments.forEach((item,index) => {
      mockDataPayment.push({
        sn:index+1,
        id: item._id,
        userid: item.user?._id,
        phone: item.user?.phone,
        email: item.user?.email,
        cost: item.amount,
        date: item.createdAt,
        tran_id: item.tran_id,
        paymentStatus: item.paidStatus,
        before_payment_id: item?.before_payment_id?._id,
      });
    });
  }
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
          {showDelete && <DeletePaymentToBookingModal paymentid={paymentId}/>}
          <Topbar setIsSidebar={setIsSidebar} />
          <Box m="20px" sx={{
              backgroundColor: isDarkMode ? "#1f2a40" : "#f5f5f5", // Light or dark mode background
              borderRadius: "8px",
          }}>
            
            <div className="!p-4 !pb-2"><Header title="Invoice"/></div>
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
              }}
            >
              <DataGrid
                checkboxSelection
                rows={mockDataPayment}
                columns={columns}
              />
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Invoices;
