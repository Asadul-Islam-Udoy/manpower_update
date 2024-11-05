import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/dashboard/Header";
import LineChart from "../../components/dashboard/LineChart";
import GeographyChart from "../../components/dashboard/GeographyChart";
import BarChart from "../../components/dashboard/BarChart";
import StatBox from "../../components/dashboard/StatBox";
import ProgressCircle from "../../components/dashboard/ProgressCircle";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import { useEffect, useState } from "react";
import {
  logoutAction,
  refreshAuthAction,
} from "../../action/auth_admin/AdminAction";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllClientsAction,
  getAllPaymentAction,
  getAllServicesAction,
  getAllWorkerAction,
} from "../../action/auth_admin/AdminMaintainAction";
import { GetAllBookingAction } from "../../action/auth_admin/BookingAction";

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const { error } = useSelector((state) => state.loginState);

  const { allworkers } = useSelector((state) => state.allworkerState);
  const { allclients } = useSelector((state) => state.allclientsState);
  const { lodding,  allservices } = useSelector((state) => state.servicesState);
  const { allpayments } = useSelector((state) => state.paymentState);
  const { allbooking } = useSelector((state) => state.bookingState);
  useEffect(() => {
    if (error === "jwt expired") {
      dispatch(logoutAction());
      navigate("/login");
      dispatch(refreshAuthAction());
    }
    dispatch(getAllWorkerAction());
    dispatch(getAllClientsAction());
    dispatch(getAllServicesAction());
    dispatch(GetAllBookingAction());
    dispatch(refreshAuthAction());
  }, [dispatch, error === "jwt expired", navigate]);


  useEffect(() => {
    dispatch(getAllPaymentAction());
  }, [dispatch]);


  const totalPaymentHandler=(paymenArray)=>{
    let sum = 0 ;
    if(paymenArray.length>0){
      paymenArray.forEach(element => {
         sum += element.amount
      });
    }
    return sum;
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
          <Box m="20px">
            {/* HEADER */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

              <Box>
                <Button
                  sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                >
                  <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                  Download Reports
                </Button>
              </Box>
            </Box>

            {/* GRID & CHARTS */}
            <Box
              display="grid"
              gridTemplateColumns="repeat(12, 1fr)"
              gridAutoRows="140px"
              gap="20px"
            >
              {/* ROW 1 */}
              {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}
              <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox
                  title={allbooking?.length}
                  subtitle="Total Booking"
                  progress="0.50"
                  increase="+21%"
                  icon={
                    <PointOfSaleIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
                />
              </Box>
              
              <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox
                  title={allclients?.length}
                  subtitle="New Clients"
                  progress="0.30"
                  increase="+5%"
                  icon={
                    <PersonAddIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
                />
              </Box>
              <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox
                  title={allworkers?.length}
                  subtitle="New Workers"
                  progress="0.30"
                  increase="+5%"
                  icon={
                    <PersonAddIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
                />
              </Box>
              <Box
                gridColumn="span 3"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox
                  title={allservices?.length}
                  subtitle="Total Service"
                  progress="0.80"
                  increase="+43%"
                  icon={
                    <TrafficIcon
                      sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                    />
                  }
                />
              </Box>

              {/* ROW 2 */}
              <Box
                gridColumn="span 8"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
              >
                <Box
                  mt="25px"
                  p="0 30px"
                  display="flex "
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      variant="h5"
                      fontWeight="600"
                      color={colors.grey[100]}
                    >
                      Revenue Generated
                    </Typography>
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      color={colors.greenAccent[500]}
                    >
                      $59,342.32
                    </Typography>
                  </Box>
                  <Box>
                    <IconButton>
                      <DownloadOutlinedIcon
                        sx={{
                          fontSize: "26px",
                          color: colors.greenAccent[500],
                        }}
                      />
                    </IconButton>
                  </Box>
                </Box>
                <Box height="250px" m="-20px 0 0 0">
                  <LineChart isDashboard={true} />
                </Box>
              </Box>
              <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                overflow="auto"
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom={`4px solid ${colors.primary[500]}`}
                  colors={colors.grey[100]}
                  p="15px"
                >
                  <Typography
                    color={colors.grey[100]}
                    variant="h5"
                    fontWeight="600"
                  >
                    Recent Transactions
                  </Typography>
                </Box>
                {mockTransactions.map((transaction, i) => (
                  <Box
                    key={`${transaction.txId}-${i}`}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p="15px"
                  >
                    <Box>
                      <Typography
                        color={colors.greenAccent[500]}
                        variant="h5"
                        fontWeight="600"
                      >
                        {transaction.txId}
                      </Typography>
                      <Typography color={colors.grey[100]}>
                        {transaction.user}
                      </Typography>
                    </Box>
                    <Box color={colors.grey[100]}>{transaction.date}</Box>
                    <Box
                      backgroundColor={colors.greenAccent[500]}
                      p="5px 10px"
                      borderRadius="4px"
                    >
                      ${transaction.cost}
                    </Box>
                  </Box>
                ))}
              </Box>

              {/* ROW 3 */}
              <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                p="30px"
              >
                <Typography variant="h5" fontWeight="600">
                  Campaign
                </Typography>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mt="25px"
                >
                  <ProgressCircle size="125" />
                  <Typography
                    variant="h5"
                    color={colors.greenAccent[500]}
                    sx={{ mt: "15px" }}
                  >
                    {totalPaymentHandler(allpayments)}-tk revenue generated
                  </Typography>
                  <Typography>
                    Includes extra misc expenditures and costs
                  </Typography>
                </Box>
              </Box>
              <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
              >
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ padding: "30px 30px 0 30px" }}
                >
                  Sales Quantity
                </Typography>
                <Box height="250px" mt="-20px">
                  <BarChart isDashboard={true} />
                </Box>
              </Box>
              <Box
                gridColumn="span 4"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                padding="30px"
              >
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ marginBottom: "15px" }}
                >
                  Geography Based Traffic
                </Typography>
                <Box height="200px">
                  <GeographyChart isDashboard={true} />
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
