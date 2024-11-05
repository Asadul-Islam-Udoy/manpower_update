import { Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import AdminContacts from "./scenes/contactsadmin";
import FAQ from "./scenes/faq";
import AdminProfile from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Worker from "./scenes/worker/worker_index";
import Client from "./scenes/client/client_index";
import Home from "./scenes/home/Home";
import { useDispatch, useSelector } from "react-redux";
import AdminMiddleware from "./scenes/middleware/AdminMiddleware";
import { useEffect } from "react";
import {
  logoutAction,
  refreshAuthAction,
  userTokenRefreshAction,
} from "./action/auth_admin/AdminAction";
import WorkerUpdate from "./scenes/worker/worker_update";
import ServicesIndex from "./scenes/service/services_index";
import ServicesCategoiesIndex from "./scenes/service_categoies/services_categories_index";
import ServiceUpdate from "./scenes/service/services_update";
import WorkerCreate from "./scenes/worker/worker_create";
import BookingIndex from "./scenes/booking";
import BookingInfo from "./components/dashboard/BookingInfo";
import BannerIndex from "./scenes/banner";
import BannerImage from "./components/dashboard/BannerImage";
import NotificationIndex from "./scenes/notification/notification_index";
import NotificationInfo from "./components/dashboard/NotificationInfo";
import NewBookingIndex from "./scenes/booking/newbooking";
import GetService from "./scenes/getservices/GetServices";
import { CartProvider } from "./components/context/Context";
import UserLogin from "./scenes/login/UserLogin";
import AdminLogin from "./scenes/login/AdminLogin";
import UserContact from "./scenes/contract/UserContact";
import About from "./scenes/about/About";
import ServiceBooking from "./scenes/servicebookingcart/ServiceBookingCart";
import BookingServiceInfo from "./scenes/servicebookinginfo/BookingServiceInfo";
import ServiceDetails from "./scenes/servicedetalis/ServiceDetails";
import CategoryServices from "./scenes/categoryservice/CategoryServices";
import UserMiddleware from "./scenes/middleware/UserMiddleware";
import ClientDashboard from "./scenes/clientdashboard/ClientProfile";
import Helps from "./scenes/clienthelpscontract/Helps";
import AgainPaymnetInfo from "./scenes/clientdashboard/againpayment/AgainPaymentInfo";
import UserPersonalOrderInfo from "./scenes/clientdashboard/UserPersonnalOrderInfo";
import Error404Page from "./scenes/404/404MPages";
import PaymentSuccess from "./scenes/paymentsuccess/PaymentSuccess";
import PaymentFaild from "./scenes/paymentfail/PaymentFails";
import PaymentCancel from "./scenes/paymentcancel/PaymentCancel";
import WorkerList from "./scenes/workerList/WorkerList";
import WorkerProfile from "./scenes/worker/worker_profile";
import AllWorkers from "./scenes/worker/allworkers/AllWorkers";
import GetWorkerToService from "./scenes/worker/allworkers/GetWorkerToService";
import HomePageManage from "./scenes/adminhomepagemanage/HomePageManage";
import Test from "./scenes/Test";
import WorkerResume from "./scenes/worker/worker_resume";
import BookingIndexByStatus from "./scenes/booking/statusbooking";

function App() {
  const [theme, colorMode] = useMode();
  const { error, lodding, userInfo, isLogout } = useSelector(
    (state) => state.loginState
  );
  const {
    error: userError,
    lodding: userLodding,
    clientInfo,
  } = useSelector((state) => state.userLoginState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      if (userInfo === null) {
        if (error === "jwt must be provided") {
          window.location.reload();
        }
      } else {
        dispatch(userTokenRefreshAction());
      }
    }, 100000);
    if (error === "jwt expired") {
      dispatch(logoutAction());
      navigate("/dashboard/login");
      dispatch(refreshAuthAction());
    }
    if (isLogout) {
      window.location.reload();
    }
    dispatch(refreshAuthAction());
  }, [
    dispatch,
    userInfo === null,
    error === "jwt must be provided",
    error == "jwt expired",
    navigate,
    isLogout,
  ]);

  return (
    <CartProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <main className="content">
              <Routes>
                <Route path="/test" element={<Test />} />
                <Route path="*" element={<Error404Page />} />
                <Route path="/" element={<Home />} />
                <Route path="/dashboard/login" element={<AdminLogin />} />
                <Route path="/login" element={<UserLogin />} />
                <Route path="/all/services" element={<GetService />} />
                <Route path="/contract" element={<UserContact />} />
                <Route path="/about" element={<About />} />
                <Route path="/service/booking" element={<ServiceBooking />} />
                <Route path="/worker/list" element={<WorkerList />} />
                <Route path="/worker/resume/:id" element={<WorkerResume />} />
                <Route path="/all/workers" element={<AllWorkers />} />
                <Route
                  path="/get/workers/services/:id"
                  element={<GetWorkerToService />}
                />
                <Route
                  path="/service/details/:id"
                  element={<ServiceDetails />}
                />
                <Route
                  path="/category/basic/services/:id/:name"
                  element={<CategoryServices />}
                />
                {/* user middleware */}
                <Route
                  path="/user/profile/:id"
                  element={
                    <UserMiddleware
                      isUser={
                        clientInfo?.user?.userType === "client" ||
                        userInfo?.user?.userType === "admin"
                      }
                    >
                      <ClientDashboard />
                    </UserMiddleware>
                  }
                />
                <Route
                  path="/user/again/payment/info/:id"
                  element={
                    <UserMiddleware
                      isUser={clientInfo?.user?.userType === "client"}
                    >
                      <AgainPaymnetInfo />
                    </UserMiddleware>
                  }
                />
                <Route
                  path="/user/personal/order/info/:id"
                  element={
                    <UserMiddleware
                      isUser={
                        clientInfo?.user?.userType === "client" ||
                        userInfo?.user?.userType === "admin"
                      }
                    >
                      <UserPersonalOrderInfo />
                    </UserMiddleware>
                  }
                />
                <Route
                  path="/user/helps"
                  element={
                    <UserMiddleware
                      isUser={clientInfo?.user?.userType === "client"}
                    >
                      <Helps />
                    </UserMiddleware>
                  }
                />
                <Route
                  path="/service/booking/details"
                  element={
                    <UserMiddleware
                      isUser={clientInfo?.user?.userType === "client"}
                    >
                      <BookingServiceInfo />
                    </UserMiddleware>
                  }
                />

                <Route
                  path="/user/payment/success"
                  element={
                    <UserMiddleware
                      isUser={clientInfo?.user?.userType === "client"}
                    >
                      <PaymentSuccess />
                    </UserMiddleware>
                  }
                />

                <Route
                  path="/user/payment/fails"
                  element={
                    <UserMiddleware
                      isUser={clientInfo?.user?.userType === "client"}
                    >
                      <PaymentFaild />
                    </UserMiddleware>
                  }
                />

                <Route
                  path="/user/payment/cancel"
                  element={
                    <UserMiddleware
                      isUser={clientInfo?.user?.userType === "client"}
                    >
                      <PaymentCancel />
                    </UserMiddleware>
                  }
                />
                {/* ///admin middleware */}
                <Route
                  path="/dashboard"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <Dashboard />
                    </AdminMiddleware>
                  }
                />
                {/* //worker manage page */}
                <Route
                  path="/dashboard/worker"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <Worker />
                    </AdminMiddleware>
                  }
                />

                {/* //worker create component */}
                <Route
                  path="/dashboard/worker/create"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <WorkerCreate />
                    </AdminMiddleware>
                  }
                />
                {/* //worker profile */}
                <Route
                  path="/dashboard/worker/profile/:id"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <WorkerProfile />
                    </AdminMiddleware>
                  }
                />

                {/* //worker update component */}
                <Route
                  path="/dashboard/worker/update/:id"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <WorkerUpdate />
                    </AdminMiddleware>
                  }
                />

                <Route
                  path="/dashboard/client"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <Client />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/services"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <ServicesIndex />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/service/update/:id"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <ServiceUpdate />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/services/categories"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <ServicesCategoiesIndex />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/contacts"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <AdminContacts />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/home/page"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <HomePageManage />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/banners"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <BannerIndex />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/banners/images/:id"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <BannerImage />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/notifications"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <NotificationIndex />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/notification/info/:id"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <NotificationInfo />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/invoices"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <Invoices />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/booking"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <BookingIndex />
                    </AdminMiddleware>
                  }
                />
                {/* //worker manage page */}
                <Route
                  path="/dashboard/get/booking/status/:status"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <BookingIndexByStatus />
                    </AdminMiddleware>
                  }
                />

                <Route
                  path="/dashboard/new/booking"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <NewBookingIndex />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/booking/info/:id"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <BookingInfo />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/booking/info/:pid"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <BookingInfo />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/admin/profile/:id"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <AdminProfile />
                    </AdminMiddleware>
                  }
                />
                <Route
                  path="/dashboard/faq"
                  element={
                    <AdminMiddleware
                      isAdmin={userInfo?.user?.userType === "admin"}
                    >
                      <FAQ />
                    </AdminMiddleware>
                  }
                />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </CartProvider>
  );
}

export default App;
