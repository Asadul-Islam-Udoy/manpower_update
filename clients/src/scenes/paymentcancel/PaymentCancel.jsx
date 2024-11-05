import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
const PaymentCancel = () => {
  return (
   <>
   <Header/>
    <div className="">
      <div className="absolute opacity-[0.2] left-0 right-0 button-0 top-0 bg-blue-200 overflow-hidden h-screen bg-[url('https://img.freepik.com/premium-vector/payment-canceled-illustration_8499-3034.jpg')]"></div>
      <div className="lg:pb-52 relative  lg:pt-52 pb-24 pt-32 px-4">
        <div className="bg-transparent rounded-md md:w-1/2 lg:w-1/2 p-6  md:mx-auto">
          <div className="flex justify-center mb-4">
            <img
              className="w-20 h-20"
              src="https://raw.githubusercontent.com/mdrony5134/Service-Booking-Website/c3cb5df6f53076676d8c7f50a6e837171c772678/public/images/cross-circle.svg"
              alt=""
            />
          </div>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-red-500 font-semibold text-center">
              Payment Canceled!
            </h3>
            <p className="text-gray-200 my-2">Try again later.</p>
            <div className="py-10 text-center md:-mt-6">
              <Link
                to="/service/booking"
                className="px-12 bg-yellow-400 hover:bg-yellow-600 text-white font-semibold py-3"
              >
                <ArrowBackIcon style={{ fontSize: "12px" }} />
                GO BACK
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
   </>
  );
};

export default PaymentCancel;
