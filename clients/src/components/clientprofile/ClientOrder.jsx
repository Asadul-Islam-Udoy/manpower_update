import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  bookingAgainAction,
  bookingCancleAction,
  getUserBookingAction,
  GivenUserBookingReviewsAction,
  userReviewRefreshController,
} from "../../action/auth_user/UserBookingAction";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
const ClientOrder = () => {
  const {
    lodding,
    error,
    personalBooking,
    isReviewCreate,
    isBookingCancel,
    isBookingAgain,
  } = useSelector((state) => state.userpersonalBookingState);
  const { clientInfo } = useSelector((state) => state.userLoginState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [serviceId, setServiceId] = useState([]);
  const [workerId, setWorkerId] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isReviewCreate) {
      toast.success("review create successfully");
    }
    if (isBookingCancel) {
      toast.success("booking cancel successfully");
    }
    if (isBookingAgain) {
      toast.success("again booking order successfully");
    }
    dispatch(userReviewRefreshController());
    dispatch(getUserBookingAction(id));
  }, [
    dispatch,
    error,
    toast,
    id,
    isReviewCreate,
    isBookingCancel,
    isBookingAgain,
  ]);

  const raingVlaue = (val) => {
    setRating(val);
  };

  const reviewHandler = (bookingId, services, workers) => {
    setServiceId([]);
    if (services.length > 0) {
      services.forEach((element) => {
        if (!serviceId.includes(element.service?._id)) {
          setServiceId((pre) => [...pre, element.service._id]);
        }
      });
    }
    setWorkerId([]);
    if (workers.length > 0) {
      workers.forEach((element) => {
        if (!workerId.includes(element.user)) {
          setWorkerId((pre) => [...pre, element.user]);
        }
      });
    }
    if (serviceId.length > 0) {
      dispatch(
        GivenUserBookingReviewsAction(
          bookingId,
          serviceId,
          workerId,
          comment,
          rating
        )
      );
    }
  };

  ///cancel booking method
  const cancelBookingHandler = (bookingId, paymentStatus) => {
    dispatch(bookingCancleAction(bookingId, paymentStatus));
  };
  ////again booking method
  const againBookingHandler = (bookingId, paymentStatus) => {
    dispatch(bookingAgainAction(bookingId, paymentStatus));
  };

  const bookingPaymentHandler = (item) => {
    if (item.is_payment_status == "Cancelled") {
      toast.warn("your booking is cancelled please again booking");
      return;
    }
    navigate(`/user/again/payment/info/${item._id}`);
  };
  return (
    <section className="bg-blue-200  rounded-md group-2 w-full mt-[24px] px-7 md:w-[100%] py-8 antialiased min-h-screen   dark:bg-gray-900 md:py-0">
      <div className="mx-auto max-w-screen-2xl border-gray-500 px-4 2xl:px-0">
        <div className="mx-auto max-w-7xl">
          <div className="gap-4 w-full md:text-center  sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl text-center font-semibold text-gray-900 dark:text-white sm:text-2xl">
              My orders
            </h2>
          </div>

          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {personalBooking?.map((item) => (
                <>
                  {item.is_payment_status !== "Pending" && (
                    <div className="flex flex-wrap items-center gap-y-4 py-6">
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <Link
                          to={`/user/personal/order/info/${item._id}`}
                          className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-blue-400 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto"
                        >
                          booking info
                        </Link>
                      </dl>

                      <dl className="w-1/2 p-3 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Service Name:
                        </dt>
                        {item?.services.map((i) => (
                          <dd className="mt-1.5 text-[10px]  text-gray-900 dark:text-white">
                            {i.service.name}
                          </dd>
                        ))}
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Total Price:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          {item.total_amount.toFixed(2)} Tk
                        </dd>
                      </dl>
                      {item?.total_paid ? (
                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                            Paid Amount:
                          </dt>
                          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            {item.total_paid} Tk
                          </dd>
                        </dl>
                      ) : (
                        <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                          <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                            Advance:
                          </dt>
                          <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                            {item.advance_amount} Tk
                          </dd>
                        </dl>
                      )}
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Status:
                        </dt>
                        <dd
                          style={{
                            color:
                              item.is_payment_status == "Cancelled"
                                ? "red"
                                : item.is_payment_status == "Completed"
                                ? "white"
                                : "blue",
                            backgroundColor:
                              item.is_payment_status == "Cancelled"
                                ? "pink"
                                : item.is_payment_status == "Completed"
                                ? "green"
                                : "gold",
                          }}
                          className="me-2  mt-1.5 inline-flex items-center rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                        >
                          {item.is_payment_status == "Cancelled" ? (
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
                              {item.is_payment_status !== "Completed" && (
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

                          {item.is_payment_status}
                        </dd>
                      </dl>
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1 group">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Review:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          <ReactStars
                            count={5}
                            value={item.ratings}
                            size={14}
                            activeColor="#ffd700"
                            isHalf={true}
                            emptyIcon={<i className="far fa-star"></i>}
                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                            fullIcon={<i className="fa fa-star"></i>}
                          />
                        </dd>
                        <div className=" -mt-6 shadow-inner bg-blue-300 rounded-sm absolute p-3 z-10 hidden group-hover:block ">
                          <div>
                            <label>Rating</label>
                            <ReactStars
                              count={5}
                              onChange={raingVlaue}
                              size={14}
                              activeColor="#ffd700"
                              isHalf={true}
                              emptyIcon={<i className="far fa-star"></i>}
                              halfIcon={<i className="fa fa-star-half-alt"></i>}
                              fullIcon={<i className="fa fa-star"></i>}
                              required={true}
                            />
                          </div>
                          <div className="flex flex-col">
                            <label>Comment</label>
                            <textarea
                              required
                              onChange={(e) => setComment(e.target.value)}
                              className="text-gray-400"
                            ></textarea>
                          </div>
                          <div className="flex flex-col mt-2">
                            {clientInfo?.user?._id == id && (
                              <button
                                onClick={() =>
                                  reviewHandler(
                                    item._id,
                                    item?.services,
                                    item.workers
                                  )
                                }
                                type="button"
                                className="bg-orange-300 rounded-full text-[10px] p-1"
                              >
                                Add
                              </button>
                            )}
                          </div>
                        </div>
                      </dl>
                      {clientInfo?.user?._id == id && (
                        <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                          {item.is_payment_status == "Cancelled" ? (
                            <button
                              onClick={() =>
                                againBookingHandler(item._id, "Confirmed")
                              }
                              style={{
                                color:
                                  item.is_payment_status == "Cancelled"
                                    ? "red"
                                    : "",
                              }}
                              type="button"
                              className="w-full  rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                            >
                              Again booking
                            </button>
                          ) : (
                            <>
                              {item.is_payment_status == "Completed" ? (
                                <button
                                  type="button"
                                  className="w-full rounded-lg border  px-3 py-2 text-center bg-orange-400 text-sm font-medium text-white hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                                >
                                  Booking Successfully Completed
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    cancelBookingHandler(item._id, "Cancelled")
                                  }
                                  type="button"
                                  className="w-full rounded-lg border border-red-700 px-3 py-2 text-center text-sm font-medium text-red-700 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300 dark:border-red-500 dark:text-red-500 dark:hover:bg-red-600 dark:hover:text-white dark:focus:ring-red-900 lg:w-auto"
                                >
                                  Cancel booking
                                </button>
                              )}
                            </>
                          )}

                          <div
                            style={{
                              display:
                                item.is_payment_status == "Completed" && "none",
                            }}
                            onClick={() => bookingPaymentHandler(item)}
                          >
                            <Link className="w-full inline-flex justify-center rounded-lg  border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 lg:w-auto">
                              Payment
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientOrder;
