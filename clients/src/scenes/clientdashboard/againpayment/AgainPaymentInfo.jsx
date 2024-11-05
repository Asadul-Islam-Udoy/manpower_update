import { React, useEffect, useState } from "react";
import { FaHandPointRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Localhost } from "../../../action/host/HostConnection";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import {
  getSingleBookingByIdAction,
} from "../../../action/auth_user/UserBookingAction";

const AgainPaymnetInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { lodding, error, personalSingleBooking } = useSelector((state) => state.userpersonalBookingState);
  const { clientInfo} = useSelector((state) => state.userLoginState);


  const cartItems ={};

  const addressInfo ={
    address:personalSingleBooking?.address,
    area:personalSingleBooking?.area,
    city:personalSingleBooking?.city,
    name:personalSingleBooking?.username,
    phone:personalSingleBooking?.phone,
    state:personalSingleBooking?.state
  }
  let amount = personalSingleBooking?.we_will_get_payment;

  const handleProceed = async() => {
    setButtonDisabled(true);
    try{
      const config = {headers:{'Content-Type':'application/json',
       Authorization: clientInfo?.token?.accesstoken, 
      }}
      const { data } = await axios.post(
        Localhost + '/api/payments/ammerpay/create/',{cartItems,addressInfo,amount,bookingId:id},
        config
      );
     if(data.url){
      window.location.replace(data.url)
     }
    
    }catch(error){
      setButtonDisabled(false);
      toast.error(error.reponse.data.message)
    }
  };


  useEffect(() => {
    dispatch(getSingleBookingByIdAction(id));
  }, [id]);

  const date_convart = (time) => {
    return new Date(time).toLocaleDateString();
  };
  const time_convart = (time) => {
    return new Date(time).toLocaleTimeString();
  };

  return (
    <>
      <Header />
      <div className="md:p-12 bg-gray-100 md:pt-36 pt-28 p-4 pb-10">
        {/* <h1 className="text-3xl text-sky-400 font-bold text-center mb-2">
          Review Your Booking
        </h1> */}
        <div className="bg-white p-6 rounded-lg shadow-md mx-auto max-w-5xl">
          <h2 className="text-2xl text-gray-300 font-semibold mb-6 text-center">
            Your Booking Information
          </h2>
         
          <p className="mb-2 text-sky-500">
            <strong>Your Payment ID : </strong>{" "}
            {personalSingleBooking?.paymentid?._id}
          </p>
          <p className="mb-2 text-sky-500">
            <strong>Your Tran Id : </strong>{" "}
            {personalSingleBooking?.paymentid?.tran_id}
          </p>
          <p className="mb-2  p-2  text-sky-500 w-full flex justify-center">
            <strong>Your Total Amount : </strong>{" "}
            {personalSingleBooking?.total_amount} tk
          </p>
          <p className="mb-2  p-2  text-green-500 w-full flex justify-center">
            <strong>Your Advance Payment : </strong>{" "}
            {personalSingleBooking?.advance_amount} tk
          </p>
          <div className="w-full flex justify-center items-center">
            <p className="mb-2  shadow-lg text-orange-300 p-3 rounded-sm w-96 flex justify-center items-center">
              <strong>you have to payment : </strong>{" "}
              <b className="ml-2">
                {" "}
                {personalSingleBooking?.we_will_get_payment}{" "}
              </b>{" "}
              tk
            </p>
          </div>
          <h2 className="text-2xl font-semibold mt-10 text-gray-300 mb-6 text-center">
            Your Information
          </h2>
          <p className="mb-2 text-gray-400">
            <strong>Full Name:</strong> {personalSingleBooking?.username}
          </p>
          <p className="mb-2 text-gray-400">
            <strong>Phone Number:</strong> {personalSingleBooking?.phone}
          </p>
          <p className="mb-2 text-gray-400">
            <strong>Booking Date:</strong>{" "}
            <span>
              {date_convart(personalSingleBooking?.paymentid?.createdAt)}
            </span>{" "}
            -{" "}
            <span>
              {time_convart(personalSingleBooking?.paymentid?.createdAt)}
            </span>
          </p>
          <p className="mb-2 text-gray-400">
            <strong>Address:</strong>{" "}
            {`${personalSingleBooking?.area}, ${personalSingleBooking?.city}, ${personalSingleBooking?.state}, ${personalSingleBooking?.address}`}
          </p>

          <div className="flex justify-between mt-8">
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              <ArrowBackIcon style={{ fontSize: "12px" }} /> back
            </button>

            <button
              disabled={buttonDisabled}
              onClick={handleProceed}
              style={{ backgroundColor: buttonDisabled ? "gray" : "green" }}
              className="bg-green-500 text-white py-2 px-4 rounded-lg"
            >
              <b>{personalSingleBooking?.we_will_get_payment}-tk</b> Proceed
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AgainPaymnetInfo;
