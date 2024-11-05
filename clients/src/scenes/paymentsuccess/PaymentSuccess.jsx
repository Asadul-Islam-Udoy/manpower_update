import React from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
const PaymentSuccess = () => {
  return (
    <>
      <Header />
      <div className=" bg-blue-200 relative overflow-hidden h-screen w-full">
        <div className="absolute opacity-[0.2] left-0 right-0 button-0 top-0 bg-blue-200 overflow-hidden h-screen bg-[url('https://fortyseven47.com/storage/2024/01/N%D0%B5obanks-vs.-Traditional-Banks_-A-D%D0%B5%D0%B5p-Div%D0%B5-into-th%D0%B5-Fint%D0%B5ch-Disruption-1-1536x1024.jpg')]"></div>
        <div className="lg:pb-52 relative  lg:pt-52 pb-24 pt-32 px-4">
          <div className="bg-transparent shadow-md rounded-md md:w-1/2 lg:w-1/2 p-6  md:mx-auto">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-green-600 font-semibold text-center">
                Payment Successful!
              </h3>
              <p className="text-green-700 my-2">
                Thank you for completing your secure online payment.
              </p>
              <p> Have a great day! </p>
              <div className="py-10 text-center">
                <Link
                  to="/all/services"
                  className="px-12 bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3"
                >
                  {" "}
                  <ArrowBackIcon style={{ fontSize: "12px" }} />
                  GO BACK
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PaymentSuccess;
