import { React, useEffect, useState } from "react";
import { FaHandPointRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/header/Header";
import EngineeringIcon from "@mui/icons-material/Engineering";
import Footer from "../../components/footer/Footer";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import axios from "axios";
import { Localhost } from "../../action/host/HostConnection";

const BookingServiceInfo = () => {

  const navigate = useNavigate();
  const { clientInfo } = useSelector((state) => state.userLoginState);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { cartItems, addressInfo, workersItems } = useSelector(
    (state) => state.cartState
  );
  const [amount, setAmount] = useState(99);
  const handleProceed = async () => {
    setButtonDisabled(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: clientInfo?.token?.accesstoken,
        },
      };
      const { data } = await axios.post(
        Localhost + "/api/payments/ammerpay/create/",
        { cartItems, addressInfo, workersItems, amount },
        config
      );
      if (data.url) {
        window.location.replace(data.url);
      }
    } catch (error) {
      setButtonDisabled(false);
      toast.error(error.reponse.data.message);
    }
  };


  function totalPriceHandler(cartItems) {
    let sum = 0;
    cartItems?.forEach((element) => {
      sum += element.totalPrice;
    });
    return sum;
  }

  function totalDiscountHandler(cartItems) {
    let discount = 0;
    cartItems?.forEach((element) => {
      if (element?.service_discount?.discount_type == "Percentage Discount") {
        discount +=
          (element.service_price * element.service_discount?.discount) / 100;
      } else if (
        element?.service_discount?.discount_type == "Taka Amount Discount"
      ) {
        discount += element.service_discount?.discount;
      } else {
        discount += element.service_discount.discount;
      }
    });
    return discount;
  }

  const date_convart = (time) => {
    return new Date(time).toLocaleDateString();
  };
  const time_convart = (time) => {
    return new Date(time).toLocaleTimeString();
  };

  // useEffect(() => {
  //   // if (cartItems?.length !== workersItems?.length) {
  //   //   navigate("/all/services");
  //   // }
  // },[]);




  return (
    <>
      <Header />
      <div
        className="p-4 text-gray-700 bg-white md:p-12 md:pt-24 pt-28 pb-14"
      >
        <div className="flex flex-col items-center justify-center w-full font-serif text-center my-7 -mt-7 md:mt-0 ">
          <h1 className="text-3xl md:text-5xl   p-2 font-serif w-[100%] text-center ">
            This is Your Booking  Information
          </h1>
          <p className="md:w-[50%] w-[90%] ">
            Our comprehensive family of brands address the complex workforce
            challenges organizations face today, from contingent and permanent
            staffing to talent management, outsourcing, and talent development.
            We deliver the solutions that drive your business forward.
          </p>
        </div>
        {cartItems?.length > 0 ? (
          <div className="max-w-5xl p-6 mx-auto bg-transparent border rounded-lg shadow-md">
            <h2 className="mb-6 text-2xl font-semibold text-center text-gray-300">
              Selected Information
            </h2>
            <div className="flex">
              <div>
                <span className="text-orange-300">Services</span>

                {cartItems?.map((item, index) => (
                  <>
                    {/* {workersItems.map((w) => ( */}
                    <div key={index} className="mb-4">
                      <h3 className="flex flex-col gap-2 font-bold text-gray-400">
                        <div className="flex items-center">
                          {" "}
                          <FaHandPointRight />
                          {item.name}
                        </div>
                        {/* <d className='flex items-center'>
                      <EngineeringIcon/>
                      {w.username}
                    </d> */}
                      </h3>
                      <p className="text-gray-400">
                        time schedule : {item.timeSchedule}
                      </p>
                      <p className="text-gray-400">
                        start work time :{" "}
                        <span>{date_convart(item.startWork)}</span> -{" "}
                        <span>{time_convart(item.startWork)}</span>
                      </p>
                      {item.service_discount?.discount_type ==
                        "Percentage Discount" ? (
                        <span className="text-gray-400">
                          discount: {item.service_discount?.discount} %
                        </span>
                      ) : (
                        <span className="text-gray-400">
                          discount: {item.service_discount?.discount} tk
                        </span>
                      )}
                    </div>
                    {/* ))} */}
                  </>
                ))}
              </div>
              <div className="ml-4">
                {workersItems?.length > 0 &&
                  <span className="text-orange-300">Workers</span>
                }
                {workersItems?.map((w, index) => (
                  <>
                    <div key={index} className="mb-4">
                      <h3 className="flex flex-col gap-2 font-bold text-gray-400">
                        <div className="flex items-center">
                          <EngineeringIcon />
                          {w.username}
                        </div>
                      </h3>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <p className="mb-2 text-sky-500">
              <strong>Total Service Price: </strong>{" "}
              {(totalPriceHandler(cartItems) + totalDiscountHandler(cartItems)).toFixed(2)}{" "}
              TK
            </p>
            <p className="mb-2 text-sky-500">
              <strong>Total Service Discount Price: </strong>{" "}
              {totalDiscountHandler(cartItems)} TK
            </p>
            <p className="flex justify-center w-full p-2 mb-2 text-sky-500">
              <strong>Your Payment Price : </strong>{" "}
              <b className="ml-2"> {totalPriceHandler(cartItems).toFixed(2)}</b> tk
            </p>
            <div className="flex items-center justify-center w-full">
              <p className="flex items-center justify-center p-3 mb-2 text-orange-300 rounded-sm shadow-lg w-96">
                <strong>you have to advance payment : </strong>{" "}
                <b className="ml-2"> 99 </b> tk
              </p>
            </div>
            <h2 className="mt-10 mb-6 text-2xl font-semibold text-center text-gray-300">
              Your Information
            </h2>
            <p className="mb-2 text-gray-400">
              <strong>Full Name:</strong> {addressInfo?.name}
            </p>
            <p className="mb-2 text-gray-400">
              <strong>Phone Number:</strong> {addressInfo?.phone}
            </p>
            <p className="mb-2 text-gray-400">
              {/* <strong>Date:</strong> {addressInfo?.date} */}
            </p>
            <p className="mb-2 text-gray-400">
              <strong>Address:</strong>{" "}
              {`${addressInfo?.area}, ${addressInfo?.city}, ${addressInfo?.state}, ${addressInfo?.address}`}
            </p>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 text-white bg-blue-500 rounded-lg"
              >
                Edit
              </button>

              <button
                disabled={buttonDisabled}
                onClick={handleProceed}
                style={{ backgroundColor: buttonDisabled ? "gray" : "green" }}
                className="px-4 py-2 text-white bg-green-500 rounded-lg"
              >
                <b>99tk</b>Proceed
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-screen p-48 bg-white-300">
            <h1 className="pb-3 text-5xl font-bold text-center text-red-700">
              Empty Details
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
      </div>
      <Footer />
    </>
  );
};

export default BookingServiceInfo;
