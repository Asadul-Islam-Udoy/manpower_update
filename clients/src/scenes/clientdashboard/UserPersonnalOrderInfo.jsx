import React, { useEffect } from "react";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { getSingleBookingByIdAction } from "../../action/auth_user/UserBookingAction";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const UserPersonalOrderInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { personalSingleBooking } = useSelector(
    (state) => state.userpersonalBookingState
  );

  useEffect(() => {
    dispatch(getSingleBookingByIdAction(id));
  }, [id]);
  return (
    <div className="bg-blue-200">
      <Header />
      <section className="w-full  px-6  pt-40 pb-20  max-w-7xl mx-auto">
        <div className="shadow-md px-10 pb-5 rounded-md bg-blue-200">
          <div className="flex justify-center items-center w-full gap-2 border-b py-8">
            <h1 className="font-bold text-3xl text-orange-400">
              Order Information
            </h1>
          </div>

          <div className="my-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
            <div>
              <p className="text-gray-500 text-lg font-semibold">User Name:</p>
              <p className="font-semibold t">
                {personalSingleBooking?.username}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-lg font-semibold">
                Phone Number:
              </p>
              <p className="font-semibold">{personalSingleBooking?.phone}</p>
            </div>
            <div>
              <p className="text-gray-500 text-lg font-semibold"> Address:</p>
              <p className="font-semibold">
                {personalSingleBooking?.address},{personalSingleBooking?.area},
                {personalSingleBooking?.city},{personalSingleBooking?.state}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-lg font-semibold">Others:</p>
              <p className="font-semibold">
                {personalSingleBooking?.others_info}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-lg font-semibold">
                Service Status:
              </p>
              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dd
                  style={{
                    color:
                      personalSingleBooking?.is_payment_status == "Cancelled"
                        ? "red"
                        : personalSingleBooking?.is_payment_status ==
                          "Completed"
                        ? "white"
                        : "blue",
                    backgroundColor:
                      personalSingleBooking?.is_payment_status == "Cancelled"
                        ? "pink"
                        : personalSingleBooking?.is_payment_status ==
                          "Completed"
                        ? "green"
                        : "gold",
                  }}
                  className="me-2  mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                >
                  {personalSingleBooking?.is_payment_status == "Cancelled" ? (
                    <svg
                      className="me-1 h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18 17.94 6M18 18 6.06 6"
                      />
                    </svg>
                  ) : (
                    <>
                      <svg
                        className="me-1 h-3 w-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 11.917 9.724 16.5 19 7.5"
                        />
                      </svg>
                      {personalSingleBooking?.is_payment_status !==
                        "Completed" && (
                        <svg
                          className="me-1 h-3 w-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                          />
                        </svg>
                      )}
                    </>
                  )}

                  {personalSingleBooking?.is_payment_status}
                </dd>
              </dl>
            </div>
            <div>
              <p className="text-gray-500 text-lg font-semibold">
                Payment Status:
              </p>
              <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                <dd className="me-2 mt-1.5 inline-flex items-center rounded bg-green-300 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                  <svg
                    className="me-1 h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 11.917 9.724 16.5 19 7.5"
                    />
                  </svg>
                  {personalSingleBooking?.total_paid ? (
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Paid Amount:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        {personalSingleBooking?.total_paid} Tk
                      </dd>
                    </dl>
                  ) : (
                    <dl className="w-1/2 flex sm:w-1/4 items-center  lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Advance:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        {personalSingleBooking?.advance_amount} Tk
                      </dd>
                    </dl>
                  )}
                </dd>
              </dl>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3  gap-4 py-4 border-b">
            <div>
              <p className="text-gray-500 text-lg font-semibold">
                Worker List:
              </p>
              <p className="font-semibold">
                {personalSingleBooking?.workers?.map((worker) => (
                  <div className="flex items-center gap-1">
                    <IoCheckmarkDoneOutline />
                    {worker?.user?.phone ?
                    <li className="list-none mb-1 mt-1">{worker?.user?.phone}</li>:
                    <li className="list-none mb-1 mt-1">{worker?.user?.email}</li>
                    }
                    </div>
                ))}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-lg font-semibold">
                Service List:
              </p>
              <p className="font-semibold">
              {personalSingleBooking?.services?.map((i) => (
                <div className="flex items-center gap-1">
                  <IoCheckmarkDoneOutline />
                  <li className="list-none mb-1 mt-1">{i.service.name}</li>
                </div>
              ))}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 py-4 gap-2 md:grid-cols-2 lg:grid-cols-3">
            <div className="border p-2 rounded-md ">
              <p className="text-gray-500 text-xs font-semibold">
                Total Price:
              </p>
              <p className="font-bold text-xl"> {personalSingleBooking?.total_amount} tk</p>
            </div>
            <div className="border p-2 rounded-md ">
              <p className="text-gray-500 text-xs font-semibold">
                Advance Amount:
              </p>
              <p className="font-bold text-xl">{personalSingleBooking?.advance_amount} tk</p>
            </div>
            <div className="border p-2 rounded-md ">
              <p className="text-gray-500 text-xs font-semibold">
                you have to be payment:
              </p>
              <p className="font-bold text-xl">{personalSingleBooking?.we_will_get_payment} tk</p>
            </div>

            <div className="border p-2 rounded-md ">
              <p className="text-gray-500 text-xs font-semibold">
                your comment:
              </p>
               {personalSingleBooking?.reviews?.length > 0 &&
                 <p className="font-normal text-[10px]">{personalSingleBooking?.reviews[0]?.comment} </p>
               }
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default UserPersonalOrderInfo;
