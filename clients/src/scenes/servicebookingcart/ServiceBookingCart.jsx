import React, { useState } from "react";
import ServiceForm from "../../components/addressfrom/AddressFrom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import BookingWorker from "../../components/bookingworker/BookingWorker";
import { useNavigate } from "react-router-dom";

const ServiceBooking = () => {
  const { cartItems, workersItems } = useSelector((state) => state.cartState);
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div  className="flex-col justify-between min-h-screen overflow-hidden text-gray-500 bg-gray-100 md:flex md:w-full md:mt-24"
      >
        <div className=" py-7 w-full flex flex-col justify-center md:mt-0 mt-20 text-center items-center font-serif border-b-[1px] rounded-2xl md:rounded-3xl">
          <h1 className="text-3xl md:text-5xl text-[#25a267] p-2 font-serif w-[100%] text-center ">
            Your Services Workers And Give me a Same Information
          </h1>
          <p className="md:w-[50%] max-w-screen-xl mx-auto ">
            Our comprehensive family of brands address the complex workforce
            challenges organizations face today, from contingent and permanent
            staffing to talent management, outsourcing, and talent development.
            We deliver the solutions that drive your business forward.
          </p>
        </div>
        <div className="justify-between -mt-24 overflow-hidden md:flex md:w-full md:-mt-0">
          <div className="h-[90%] items-center flex flex-col justify-center text-black  md:pt-2 w-full pt-10 pb-3">
            {cartItems?.length > 0 ? (
              cartItems.map((item) => (
                <CartItem item={item} workersItems={workersItems} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center w-screen p-48 bg-white-300">
                <h1 className="pb-3 text-5xl font-bold text-center text-red-700">
                  Empty Service
                </h1>
                <button
                  onClick={() => navigate("/all/services")}
                  className="p-2 pl-8 pr-8 bg-gray-300 rounded-sm hover:bg-red-200"
                >
                  <TravelExploreIcon style={{ fontSize: "12px" }} />
                  All Services
                </button>
              </div>
            )}
            <div className="h-[100%] items-center justify-center  md:pt-2 md:w-full md:ml-36 pt-1  pb-1 -mt-16">
              <BookingWorker workersItems={workersItems} />
            </div>
          </div>

          <div className="w-full">
            {cartItems?.length > 0 && <ServiceForm />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ServiceBooking;

// selectedhour={selectedhour} price={price}
