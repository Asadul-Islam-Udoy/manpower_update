import React, { useEffect, useState } from "react";
import { FindWorkersToServiceAction } from "../../../action/auth_user/UserAction";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { StoreBookingCardAction } from "../../../action/auth_user/ServicesBookingCartAction";
import Lodder from "../../../components/lodder/Lodder";
import Header from "../../../components/header/Header";
import { Localhost } from "../../../action/host/HostConnection";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Footer from "../../../components/footer/Footer";
import { toast } from "react-toastify";
function GetWorkerToService() {
  const { lodding, error, WorkerServices } = useSelector(
    (state) => state.serviceWrokerState
  );
  const { workersItems } = useSelector((state) => state.cartState);
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteHandler = (serviceid) => {
    const filter = cart?.filter((i) => i._id !== serviceid._id);
    setCart(filter);
  };

  const handleBookService = (serviceid) => {
    if (workersItems.length <= cart.length) {
      toast.warn("you can select same number of  workers and services");
      return;
    }
    if (!cart?.some((item) => item._id === serviceid._id)) {
      setCart((pre) => [...pre, serviceid]);
    }
  };
  const handleYourService = () => {
    dispatch(StoreBookingCardAction(cart));
    navigate("/service/booking");
  };

  useEffect(() => {
    dispatch(FindWorkersToServiceAction(id));
  }, [dispatch]);

  return (
    <>
      {lodding && <Lodder />}
      <Header />
      <div
        style={{ backgroundColor: "#436da7cc" }}
        className="min-h-[300px] overflow-hidden"
      >
        {WorkerServices?.length > 0 ? (
          <div>
            {WorkerServices !== undefined ? (
              <>
                <div className="flex items-center flex-col justify-center  w-[100%] mt-20 ">
                  <div className=" md:w-[50%] w-[100%] mt-7 flex items-center flex-col py-3 justify-center ">
                    <h1 className="p-2 font-serif text-4xl text-center md:text-5xl">
                      Our Suite of Services Solutions
                    </h1>
                    <p className=" block  md:w-[80%] w-[75%]  text-center">
                      Our comprehensive family of brands address the complex
                      workforce challenges organizations face today, from
                      contingent and permanent staffing to talent management,
                      outsourcing, and talent development. We deliver the
                      solutions that drive your business forward.
                    </p>
                  </div>
                </div>
                <div className="w-full p-4 bg-slate-300"></div>
                <div>
                  <div class="flex flex-wrap justify-center m-1  w-full  ">
                    {WorkerServices?.map((service) => (
                      <div
                        class={`p-4 max-w-sm ${
                          cart.some((item) => item._id === service?._id)
                            ? "border p-0 mt-3 opacity-45 rounded-md shadow-lg"
                            : ""
                        }`}
                      >
                        {cart.some((item) => item._id === service?._id) && (
                          <div
                            style={{
                              color: "red",
                              cursor: "pointer",
                              backgroundColor: "white",
                              width: "10%",
                              borderBottomRightRadius: "20%",
                              textAlign: "center",
                            }}
                            onClick={() => deleteHandler(service)}
                          >
                            <span>x</span>
                          </div>
                        )}
                        <div class="flex rounded-md h-full dark:bg-gray-800 bg-transparent p-8 flex-col hover:border-[0.3px] border-blue-400">
                          <div class="flex items-center mb-3">
                            <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-[#25a267] bg-[#25a267] text-white flex-shrink-0">
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
                            <h2 class="text-white dark:text-white text-lg font-medium">
                              {service.name}
                            </h2>
                          </div>
                          <div className="flex overflow-hidden transition-all rounded-md">
                            <img
                              src={
                                Localhost + `/images/services/${service.image}`
                              }
                              alt="product image"
                              className="transition-all duration-1000 ease-linear rounded-md hover:scale-110"
                            />
                          </div>
                          <div class="flex flex-col justify-between flex-grow">
                            <p class="leading-relaxed text-base text-white dark:text-gray-300 mt-2">
                              {service.description.substring(0, 90)}
                            </p>
                            <div className="flex w-[98%] py-4 justify-between">
                              <Link
                                to={`/service/details/${service?._id}`}
                                className="mt-3 p-2 justify-center hover:bg-transparent hover:border hover:text-white transition-all ease-linear w-[48%] bg-white  text-black dark:text-black  inline-flex items-center"
                              >
                                View Details
                              </Link>
                              <button
                                onClick={() => handleBookService(service)}
                                class="mt-3 p-2 w-[48%] justify-center bg-white hover:bg-transparent hover:border hover:text-white transition-all ease-linear text-black dark:text-black  inline-flex items-center"
                              >
                                {cart.some((item) => item._id === service?._id)
                                  ? "Service Booked"
                                  : "Book Service"}
                              </button>
                            </div>
                            <div className="w-full"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    {cart.length > 0 ? (
                      <button
                        onClick={handleYourService}
                        type="button"
                        class="fixed left-[49%] top-[100px]   md:top-[55%] md:left-[86%] inline-flex items-center px-5 py-3 text- font-serif text-center text-white bg-[#25a267] border rounded-md hover:bg-blue-800 focus:outline-none"
                      >
                        <span class="sr-only">Notifications</span>
                        Add To Service
                        <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                          {cart.length}
                        </div>
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div>
                <h1 className="pb-64 text-5xl font-bold text-center text-red-700">
                  Empty
                </h1>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-48 bg-white-300">
            <h1 className="pb-3 text-5xl font-bold text-center text-red-700">
              Empty
            </h1>
            <button
              onClick={() => navigate(-1)}
              className="p-2 pl-8 pr-8 bg-gray-300 rounded-sm hover:bg-red-200"
            >
              <ArrowBackIcon style={{ fontSize: "12px" }} />
              back
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default GetWorkerToService;
