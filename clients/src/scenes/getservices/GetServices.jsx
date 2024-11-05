import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { RemoveCardBeforeWorkerAction, StoreBookingCardAction } from "../../action/auth_user/ServicesBookingCartAction";
import { getCategoryBasicServiceAction } from "../../action/auth_user/ServicesAction";
import { Localhost } from "../../action/host/HostConnection";
import Lodder from "../../components/lodder/Lodder";
import AcUnitIcon from "@mui/icons-material/AcUnit";
const GetService = () => {
  const { error, lodding, servicesList } = useSelector(
    (state) => state.serviceListState
  );
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteHandler = (serviceid) => {
    const filter = cart?.filter((i) => i._id !== serviceid._id);
    setCart(filter);
  };

  const handleBookService = (serviceid) => {
    if (!cart?.some((item) => item._id === serviceid._id)) {
      setCart((pre) => [...pre, serviceid]);
    }
  };
  const handleYourService = () => {
    dispatch(StoreBookingCardAction(cart));
    dispatch(RemoveCardBeforeWorkerAction());
    navigate("/worker/list");
  };

  useEffect(() => {
    dispatch(getCategoryBasicServiceAction());
  }, [dispatch]);

  return (
    <>
      {lodding && <Lodder />}
      <div className="min-h-[300px] overflow-hidden bg-white text-gray-700 pb-4">
        <Header />
        <div className="flex items-center flex-col justify-center  w-[100%] mt-20 ">
          <div className=" md:w-[50%] w-[100%] mt-7 flex items-center flex-col py-3 justify-center ">
            <h1 className="md:text-5xl text-4xl text-[#25a267] text-center p-2 font-serif">
              Our Suite of Services Solutions
            </h1>
            <p className=" block md:w-[80%] w-[75%] text-center">
              Our comprehensive family of brands address the complex workforce
              challenges organizations face today, from contingent and permanent
              staffing to talent management, outsourcing, and talent
              development. We deliver the solutions that drive your business
              forward.
            </p>
          </div>
        </div>
        <div className="w-full p-4"></div>

        {servicesList[0]?.map((category) => (
          <div className="max-w-screen-xl px-4 mx-auto">
            <div className="flex flex-col w-full p-1 mt-3 ">
              <div className="text-center p-4 w-full bg-[#25a267] text-white border-b-[1px] rounded-sm">
                {" "}
                <h1 className="font-serif text-2xl " key={category}>
                  {category?.category_name} 
                </h1>
              </div>
              <div className="flex items-start justify-start px-0 py-3 space-x-4">
                {category?.children[0].map((child) => (
                  <Link
                    to={`/category/basic/services/${child._id}/${child.category_name}`}
                    className="flex items-center justify-center px-5 py-2 border duration-700 border-[#25a267] hover:bg-[#25a267] hover:text-white rounded-md"
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <AcUnitIcon className="" />
                      <span>{child?.category_name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              {category?.children[1]
                // .filter((service) => service.category === category)
                .map((service) => (
                  <div
                    class={`${
                      cart.some((item) => item._id === service?.ele?._id)
                        ? "border p-0 mt-3 opacity-45 rounded-md shadow-lg"
                        : ""
                    }`}
                  >
                    {cart.some((item) => item._id === service?.ele?._id) && (
                      <div
                        style={{
                          color: "red",
                          cursor: "pointer",
                          backgroundColor: "white",
                          width: "10%",
                          borderBottomRightRadius: "20%",
                          textAlign: "center",
                        }}
                        onClick={() => deleteHandler(service.ele)}
                      >
                        <span>x</span>
                      </div>
                    )}
                    <div class="flex rounded-md h-full bg-transparent p-3 flex-col border-[0.3px] border-green-400 shadow-lg hover:shadow-xl hover:shadow-green-200 duration-400">
                      <div className="flex overflow-hidden transition-all rounded-md">
                        <img
                          src={
                            Localhost + `/images/services/${service.ele.image}`
                          }
                          alt="product image"
                          className="transition-all duration-1000 ease-linear rounded-md hover:scale-110"
                        />
                      </div>
                      <div class="flex items-center my-2">
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
                        <h2 class="text-lg font-medium truncate">
                          {service.ele.name}
                        </h2>
                      </div>
                      <div class="flex flex-col justify-between flex-grow">
                        <p class="leading-relaxed text-base text-gray-500 line-clamp-2">
                          {service.ele.description.substring(0, 90)}
                        </p>
                        <div className="flex justify-between w-full space-x-4">
                          <Link
                            to={`/service/details/${service.ele._id}`}
                            className="inline-flex items-center justify-center w-full p-2 mt-3 text-gray-500 transition-all ease-linear border border-[#25a267] rounded-sm hover:bg-[#25a267] hover:text-white duration-700 font-bold"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => handleBookService(service.ele)}
                            className="inline-flex items-center justify-center w-full p-2 mt-3 text-gray-500 transition-all ease-linear border border-[#25a267] rounded-sm hover:bg-[#25a267] hover:text-white duration-700 font-bold"
                          >
                            {cart.some((item) => item._id === service.ele._id)
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
                  <div class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-2 ">
                    {cart.length}
                  </div>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default GetService;
