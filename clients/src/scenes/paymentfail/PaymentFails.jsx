import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
const PaymentFaild = () => {
  return (
   <>
   <Header/>
    <div className="bg-blue-200 h-screen ">
      <div className="absolute opacity-[0.2] left-0 right-0 button-0 top-0 bg-blue-200 overflow-hidden h-screen bg-[url('https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150544940.jpg?w=740&t=st=1726725117~exp=1726725717~hmac=ee444db8d00a02a0990b3bbb5c0500fd737bc11116bf76ef32f177d235d7547d')]">

      </div>
      <div className="lg:pb-52 relative lg:pt-52 pb-24 pt-32 px-4">
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
              Payment Faild!
            </h3>
            <p className="text-gray-600 my-2">Try again later.</p>
            <div className="py-10 text-center">
              <Link
                to="/service/booking"
                className="px-12 bg-orange-400 hover:bg-orange-600 text-white font-semibold py-3"
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

export default PaymentFaild;
