import React, { useContext, useEffect, useRef, useState } from "react";
import Sidebar from "../../scenes/global/Sidebar";
import Topbar from "../../scenes/global/Topbar";
import "./BookingInfo.css";
import html2pdf from "html2pdf.js";
import { useDispatch, useSelector } from "react-redux";
import {
  GetPaymentToSingleBookingAction,
  GetSingleBookingAction,
} from "../../action/auth_admin/BookingAction";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ColorModeContext, tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import Rating from "@mui/material/Rating";
function BookingInfo() {
  const contentRef = useRef();
  const { id, pid } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isSidebar, setIsSidebar] = useState(true);

  const dispatch = useDispatch();

  const { lodding, error, singlebooking } = useSelector(
    (state) => state.singleBookingState
  );
  const [rating, setRating] = useState(singlebooking?.ratings);
  const isDarkMode = theme.palette.mode === "dark";
  useEffect(() => {
    // if (error) {
    //   toast.error(error);
    // }
    if (id) {
      dispatch(GetSingleBookingAction(id));
    }
    if (pid) {
      dispatch(GetPaymentToSingleBookingAction(pid));
    }
    setRating(singlebooking?.ratings);
  }, [id, pid, singlebooking?.ratings]);


    //download pdf file
    const handleDownloadPDF = () => {
      const element = contentRef.current;
  
      // Customize PDF settings
      const options = {
        margin: [0.5, 0.5],                // Adjust margins as needed
        filename: "booking_information.pdf",
        image: { type: "jpeg", quality: 1.0 }, // Maximum image quality
        html2canvas: { scale: 3 },          // Higher scale for better clarity
        jsPDF: { unit: "in", format: "a3", orientation: "portrait" },
      };
  
      html2pdf().set(options).from(element).save();
    };

  return (
    <>
      <div className="sidbar__app">
        <Sidebar isSidebar={isSidebar} />
        <div
          className={
            theme.palette.mode === "dark"
              ? "sidbar__content"
              : "sidbar__container__2"
          }
        >
          <Topbar setIsSidebar={setIsSidebar} />
          <div className="booking__information__container">

            <div
              className="booking__info__box" style={{ padding: '25px' }}>
              <div style={{
                backgroundColor: isDarkMode ? "#1f2a40" : "#f5f5f5",
                padding: "20px",
                borderRadius: "8px", color: isDarkMode ? "#f5f5f5" : "#1f2a40"
              }}>
                <div className='cursor-pointer ' onClick={handleDownloadPDF} >
                  <li
                    class="flex c items-center justify-center font-bold py-2 space-x-4 border bg-blue-600  hover:bg-blue-700 text-white duration-500 rounded-md"
                  >
                    <span>Download Pdf</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="w-4 h-4"
                    >
                      <path
                        fill="currentColor"
                        d="M13 10h5l-6 6l-6-6h5V3h2zm-9 9h16v-7h2v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h2z"
                      ></path>
                    </svg>
                  </li>
                </div>
                <div ref={contentRef} className="booking__info__container">

                  <h3 className="text-3xl font-bold" style={{ color: isDarkMode ? "#f5f5f5" : "#1f2a40" }}>Booking Information</h3>
                  <div>
                    <div>
                      <p
                        style={{
                          fontWeight: "bold", fontSize: '18px',
                          // borderBottom: "1px solid black",
                        }}
                      >
                        Address
                      </p>
                      <p>{singlebooking?.address}</p>
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: "bold", fontSize: '18px',
                          // borderBottom: "1px solid black",
                        }}
                      >
                        Area
                      </p>
                      <p>{singlebooking?.area}</p>
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: "bold", fontSize: '18px',
                          // borderBottom: "1px solid black",
                        }}
                      >
                        Phone
                      </p>
                      <p>{singlebooking?.phone}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p
                        style={{
                          fontWeight: "bold", fontSize: '18px',
                        }}
                      >
                        Payment Status
                      </p>
                      <span
                        style={{
                          color:
                            singlebooking?.paymentid?.paidStatus == true
                              ? "green"
                              : "red",
                          margin: "20px",
                          padding: "2px",
                        }}
                      >
                        {singlebooking?.paymentid?.paidStatus == true
                          ? "Success"
                          : "Fails"}
                      </span>
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: "bold", fontSize: '18px',
                          // borderBottom: "1px solid black",
                        }}
                      >
                        Status
                      </p>
                      <span
                        style={{
                          color:
                            singlebooking?.is_payment_status == "Cancelled"
                              ? "red"
                              : singlebooking?.is_payment_status == "Completed"
                                ? "#10a1de"
                                : "gold",
                          fontWeight: "bold", fontSize: '18px',
                        }}
                      >
                        {singlebooking?.is_payment_status}
                      </span>
                    </div>

                    <div>
                      <p
                        style={{
                          fontWeight: "bold", fontSize: '18px',
                          // borderBottom: "1px solid black",
                        }}
                      >
                        Payment Id
                      </p>
                      <span>{singlebooking?.paymentid?._id}</span>
                    </div>
                  </div>
                  <div>
                    {singlebooking?.total_paid ? (
                      <div>
                        <p
                          style={{
                            fontWeight: "bold", fontSize: '18px',
                            // borderBottom: "1px solid black",
                          }}
                        >
                          Paid Amount
                        </p>
                        <span className="text-xl text-orange-500">
                          {singlebooking?.total_paid}-tk
                        </span>
                      </div>
                    ) : (
                      <div>
                        <p
                          style={{
                            fontWeight: "bold", fontSize: '18px',
                            // borderBottom: "1px solid black",
                          }}
                        >
                          Advance Amount
                        </p>
                        <span>{singlebooking?.advance_amount}tk</span>
                      </div>
                    )}
                    <div>
                      <p
                        style={{
                          fontWeight: "bold", fontSize: '18px',
                          // borderBottom: "1px solid black",
                        }}
                      >
                        Total Amount
                      </p>
                      <span>{singlebooking?.total_amount}tk</span>
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: "bold", fontSize: '18px',
                          // borderBottom: "1px solid black",
                        }}
                      >
                        We Will Get Amount
                      </p>
                      <span>{singlebooking?.we_will_get_payment}tk</span>
                    </div>
                  </div>
                  <div className="w-full">
                    <div>
                      <p
                        style={{
                          fontWeight: "bold", fontSize: '18px',
                        }}
                      >
                        Service Worker Profile Information
                      </p>
                      {singlebooking?.workers?.map((item) => (
                        <Link
                          title="worker info"
                          className="flex flex-col"
                          style={{ color: "black", margin: "3px" }}
                          to={`/worker/profile/${item.user._id}`}
                        >
                          <p
                            // style={{ borderBottom: "1px solid green" }}
                            className=""
                          >
                            <button className="w-full py-1 my-1 font-serif text-white bg-blue-500 border rounded-sm hover:text-black hover:bg-blue-400">
                              Information of{" "}
                              {item.user?.phone || item.user?.email}
                            </button>
                          </p>
                        </Link>
                      ))}
                    </div>
                    <div className="w-40 ">
                      <p
                        style={{
                          fontWeight: "bold", fontSize: '18px',
                        }}
                        className="w-44"
                      >
                        {" "}
                        Client Information
                      </p>
                      <Link
                        title="worker info"
                        style={{
                          color: "black",
                          margin: "3px",
                          width: "100%",
                          fontSize: "12px",
                        }}
                        to={`/user/profile/${singlebooking?.user?._id}`}
                      >
                        <button className="w-full py-1 my-1 font-serif text-white bg-blue-500 border rounded-sm hover:text-black hover:bg-blue-400">
                          Information of{" "}
                          {singlebooking?.user?.phone ||
                            singlebooking?.user?.email}
                        </button>
                      </Link>
                    </div>
                    <div>
                      <p
                        style={{
                          fontWeight: "bold", fontSize: '18px',
                          // borderBottom: "1px solid black",
                        }}
                      >
                        Others Info
                      </p>
                      <p>{singlebooking?.others_info}</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <p
                        style={{
                          fontWeight: "bold", fontSize: '18px',
                          // borderBottom: "1px solid black",
                        }}
                      >
                        Service
                      </p>
                      {singlebooking?.services?.map((item) => (
                        <>
                          <span className="w-full text-gray-600">
                            {item.service?.name}
                          </span>
                          <div className="m-2">
                            <p>service price :{item.service.service_price}</p>
                            <p>service total price :{item.price} tk</p>
                            {item.service.service_discount.discount_type ==
                              "Taka Amount Discount" ? (
                              <p>
                                service discount :
                                {item.service.service_discount.discount} tk
                              </p>
                            ) : (
                              <p>
                                service discount :
                                {item.service.service_discount.discount}%
                              </p>
                            )}
                            <p>worker start time :{item.work_start_date}</p>
                            <p>time schedule :{item.time_schedule}</p>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookingInfo;
