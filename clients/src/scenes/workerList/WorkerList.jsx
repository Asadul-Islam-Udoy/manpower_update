import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { FindServiceToWorkersAction } from "../../action/auth_user/UserAction";
import { Localhost } from "../../action/host/HostConnection";
import { StoreBookingWorkerAction } from "../../action/auth_user/ServicesBookingCartAction";
import Lodder from "../../components/lodder/Lodder";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const WorkerList = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [serviceId, setServiceId] = useState([]);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartState);
  const { lodding, error, ServiceWorkers } = useSelector(
    (state) => state.serviceWrokerState
  );

  const deleteHandler = (serviceid) => {
    const filter = cart?.filter((i) => i._id !== serviceid._id);
    setCart(filter);
  };

  const handleWorkerSelect = (worker) => {
    if (cartItems.length <= cart.length) {
      toast.warn("you can select same number of services and workers");
      return;
    }
    toast.success(`${worker.username} Selected successfully !`, {
      position: "top-right",
    });
    if (!cart?.some((item) => item._id === worker._id)) {
      setCart((pre) => [...pre, worker]);
    }
  };

  const handleYourService = () => {
    dispatch(StoreBookingWorkerAction(cart));
    navigate("/service/booking");
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      cartItems.forEach((service) => {
        if (!serviceId.includes(service._id)) {
          setServiceId((pre) => [...pre, service._id]);
        }
      });
    }
  }, [cartItems.length > 0]);

  useEffect(() => {
    dispatch(FindServiceToWorkersAction(serviceId));
  }, [dispatch, serviceId]);

  return (
    <>
      <div className="min-h-[300px] overflow-hidden bg-white">
        {lodding && <Lodder />}
        <Header />
        <div className="flex items-center flex-col justify-center  w-[100%] mt-20 ">
          <div className=" md:w-[50%] py-3 w-[100%] mt-7 flex items-center flex-col justify-center ">
            <h1 className="md:text-5xl text-4xl text-center text-[#25a267] p-2 font-serif">
              Our Suite of Workers Solutions
            </h1>
            <p className="md:w-[80%] w-[75%] text-gray-400 text-center">
              Our comprehensive family of brands address the complex workforce
              challenges organizations face today, from contingent and permanent
              staffing to talent management, outsourcing, and talent
              development. We deliver the solutions that drive your business
              forward.
            </p>
          </div>
        </div>
        <div className="w-full p-4"></div>
        <div class="flex flex-wrap justify-center m-1  w-full  ">
          {ServiceWorkers?.length > 0 ? (
            <>
              {ServiceWorkers?.map((worker, index) => (
                <div
                  class={`p-4 max-w-sm ${
                    cart.some((item) => item._id === worker?._id)
                      ? "border p-0 mt-3 opacity-45 rounded-md shadow-lg"
                      : ""
                  }`}
                >
                  <div class="flex rounded-md h-full bg-transparent p-8 flex-col border-[0.3px] border-green-400 shadow-md text-gray-800">
                    {cart.some((item) => item._id === worker?._id) && (
                      <div
                        style={{
                          color: "red",
                          cursor: "pointer",
                          backgroundColor: "white",
                          width: "10%",
                          borderBottomRightRadius: "30%",
                          textAlign: "center",
                        }}
                        onClick={() => deleteHandler(worker)}
                      >
                        <span>x</span>
                      </div>
                    )}
                    <div className="flex justify-center w-full overflow-hidden transition-all rounded-full">
                      {worker.avatar ? (
                        <img
                          src={Localhost + `/images/avatars/${worker.avatar}`}
                          className="w-48 h-48 transition-all duration-1000 ease-linear border rounded-full hover:scale-110"
                        />
                      ) : (
                        <img
                          src="https://media.istockphoto.com/id/1451587807/vector/user-profile-icon-vector-avatar-or-person-icon-profile-picture-portrait-symbol-vector.jpg?s=612x612&w=0&k=20&c=yDJ4ITX1cHMh25Lt1vI1zBn2cAKKAlByHBvPJ8gEiIg="
                          alt="user name"
                          title="user name"
                          width="300"
                          height="300"
                          className="max-w-full rounded-md"
                        />
                      )}
                    </div>
                    <div class="flex flex-col justify-between py-1 flex-grow">
                      <div class="flex items-center   min-w-[250px] mb-3">
                        <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[#25a267] text-white flex-shrink-0">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                          </svg>
                        </div>
                        <h2 class="text-gray-600 text-lg font-medium">
                          {worker.username}
                        </h2>
                      </div>
                      <div className="flex justify-center w-full py-1 border rounded-full">
                        <Stack spacing={1}>
                          <Rating
                            name="half-rating"
                            defaultValue={5}
                            precision={0.2}
                          />
                        </Stack>
                      </div>
                      <div className="flex justify-between space-x-4">
                        <Link
                          to={`/worker/resume/${worker?.user?._id}`}
                          className="inline-flex items-center justify-center w-full p-2 mt-3 text-gray-500 transition-all ease-linear border border-[#25a267] rounded-sm hover:bg-[#25a267] hover:text-white duration-700 font-bold"
                        >
                          View Profile
                        </Link>
                        <button
                          onClick={() => handleWorkerSelect(worker)}
                          class="inline-flex items-center justify-center w-full p-2 mt-3 text-gray-500 transition-all ease-linear border border-[#25a267] rounded-sm hover:bg-[#25a267] hover:text-white duration-700 font-bold"
                        >
                          {cart.some((item) => item._id === worker?._id)
                            ? "Worker Booked"
                            : "Select Worker"}
                        </button>
                      </div>
                      <div className="w-full"></div>
                    </div>
                  </div>
                  <div>
                    {cart.length > 0 ? (
                      <button
                        onClick={handleYourService}
                        type="button"
                        class="fixed left-[49%] top-[100px]   md:top-[55%] md:left-[86%] inline-flex items-center px-5 py-3 text- font-serif text-center text-white bg-blue-600 border rounded-md hover:bg-blue-800 focus:outline-none"
                      >
                        <span class="sr-only">Notifications</span>
                        Add To Workers
                        <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                          {cart.length}
                        </div>
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-48 bg-white-300">
              <h1 className="pb-3 text-5xl font-bold text-center text-red-700">
                Booking
              </h1>
              <button
                onClick={() => navigate("/service/booking")}
                className="p-2 pl-8 pr-8 bg-gray-300 rounded-sm hover:bg-red-200"
              >
                <ArrowForwardIcon style={{ fontSize: "12px" }} />
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WorkerList;
