import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Localhost } from "../../action/host/HostConnection";
const ServiceReview = ({ singleService }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [addReviwList, setAddReviewList] = useState(2);
  const openModal = () => {
    setIsOpenModal(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const date_convart = (time) => {
    return new Date(time).toLocaleDateString();
  };
  const time_convart = (time) => {
    return new Date(time).toLocaleTimeString();
  };

  let Five = 0;
  let Four = 0;
  let Thire = 0;
  let Two = 0;
  let One = 0;

  singleService?.reviews?.forEach((item) => {
    if (item.rating === 5) {
      Five += 1;
    }
    if (item.rating === 4) {
      Four += 1;
    }
    if (item.rating === 3) {
      Thire += 1;
    }
    if (item.rating === 2) {
      Two += 1;
    }
    if (item.rating === 1) {
      One += 1;
    }
  });

  return (
    <div>
      <section className="antialiased bg-white">
        <div className="max-w-screen-xl px-4 m-5 mx-auto 2xl:px-0">
          <div className="flex items-center gap-2 m-5">
            <h2 className="text-2xl font-semibold text-gray-900">
              Reviews
            </h2>

            <div className="flex items-center gap-2 mt-2 sm:mt-0">
              <div className="flex items-center gap-0.5">
                <ReactStars
                  count={5}
                  value={singleService?.ratings}
                  size={30}
                  activeColor="#ffd700"
                  isHalf={true}
                  emptyIcon={<i className="far fa-star"></i>}
                  halfIcon={<i className="fa fa-star-half-alt"></i>}
                  fullIcon={<i className="fa fa-star"></i>}
                />
              </div>
              <p className="text-sm font-medium leading-none text-gray-400">
                {singleService?.reviews?.length}
              </p>
              <a
                href="#"
                className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline"
              >
                Reviews
              </a>
            </div>
          </div>

          <div className="gap-8 my-6 ml-9 sm:flex sm:items-start md:my-8">
            <div className="space-y-4 shrink-0">
              <p className="text-2xl font-semibold leading-none text-gray-900">
                4.65 out of 5
              </p>
              <button
                onClick={openModal}
                type="button"
                className="mb-2 me-2 rounded-lg bg-[#25a267] px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-primary-300"
              >
                Write a review
              </button>
            </div>

            <div className="flex-1 min-w-0 mt-6 space-y-3 sm:mt-0">
              <div className="flex items-center gap-2">
                <p className="w-2 text-sm font-medium leading-none text-gray-900 shrink-0 text-start dark:text-white">
                  5
                </p>
                <svg
                  className="w-4 h-4 text-yellow-300 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    style={{ width: `${Five}%` }}
                    className="h-1.5 rounded-full bg-yellow-300 "
                  ></div>
                </div>
                <a
                  href="#"
                  className="w-8 text-sm font-medium leading-none text-right shrink-0 text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                >
                  239 <span className="hidden sm:inline">reviews</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <p className="w-2 text-sm font-medium leading-none text-gray-900 shrink-0 text-start dark:text-white">
                  4
                </p>
                <svg
                  className="w-4 h-4 text-yellow-300 shrink-0 bg-bl"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    style={{ width: `${Four}` }}
                    className="h-1.5 rounded-full bg-yellow-300 "
                  ></div>
                </div>
                <a
                  href="#"
                  className="w-8 text-sm font-medium leading-none text-right shrink-0 text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                >
                  432 <span className="hidden sm:inline">reviews</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <p className="w-2 text-sm font-medium leading-none text-gray-900 shrink-0 text-start dark:text-white">
                  3
                </p>
                <svg
                  className="w-4 h-4 text-yellow-300 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    style={{ width: `${Thire}%` }}
                    className="h-1.5 rounded-full bg-yellow-300"
                  ></div>
                </div>
                <a
                  href="#"
                  className="w-8 text-sm font-medium leading-none text-right shrink-0 text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                >
                  53 <span className="hidden sm:inline">reviews</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <p className="w-2 text-sm font-medium leading-none text-gray-900 shrink-0 text-start dark:text-white">
                  2
                </p>
                <svg
                  className="w-4 h-4 text-yellow-300 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    style={{ width: `${Two}%` }}
                    className="h-1.5 rounded-full bg-yellow-300 "
                  ></div>
                </div>
                <a
                  href="#"
                  className="w-8 text-sm font-medium leading-none text-right shrink-0 text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                >
                  32 <span className="hidden sm:inline">reviews</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <p className="w-2 text-sm font-medium leading-none text-gray-900 shrink-0 text-start dark:text-white">
                  1
                </p>
                <svg
                  className="w-4 h-4 text-yellow-300 shrink-0"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <div className="h-1.5 w-80 rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    style={{ width: `${One}%` }}
                    className="h-1.5 rounded-full bg-yellow-300"
                  ></div>
                </div>
                <a
                  href="#"
                  className="w-8 text-sm font-medium leading-none text-right shrink-0 text-primary-700 hover:underline dark:text-primary-500 sm:w-auto sm:text-left"
                >
                  13 <span className="hidden sm:inline">reviews</span>
                </a>
              </div>
            </div>
          </div>
          {singleService?.reviews.slice(0, addReviwList).map((i) => (
            <div className="mt-6 ml-8 divide-y divide-gray-200 dark:divide-gray-700">
              <div className="gap-3 pt-10 pb-6 sm:flex sm:items-start">
                <div className="space-y-2 shrink-0 sm:w-48 md:w-72">
                  <div className="space-y-0.5 ">
                    {i?.user?.avatar ? (
                      <img
                        className="w-16 h-16 rounded-full"
                        src={Localhost + `/images/avatars/${i?.user?.avatar}`}
                        alt="imagess"
                      />
                    ) : (
                      <img
                        className="w-16 h-16 rounded-full"
                        src="https://media.istockphoto.com/id/1341046662/vector/picture-profile-icon-human-or-people-sign-and-symbol-for-template-design.jpg?s=612x612&w=0&k=20&c=A7z3OK0fElK3tFntKObma-3a7PyO8_2xxW0jtmjzT78="
                        alt="imagess"
                      />
                    )}

                    <p className="text-base font-semibold text-gray-900 dark:text-white">
                      {i?.user?.username}
                    </p>
                    <div className="flex items-center  gap-0.5">
                      <ReactStars
                        count={5}
                        value={i.rating}
                        size={20}
                        activeColor="#ffd700"
                        isHalf={true}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                      />
                    </div>
                    <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      <span>{date_convart(i.date)}</span>,{" "}
                      <span>{time_convart(i.date)}</span>
                    </p>
                  </div>
                </div>

                <div className="flex-1 min-w-0 mt-4 space-y-4 sm:mt-0">
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    {i.comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setAddReviewList(singleService?.reviews.length)}
              className="mb-2 me-2 rounded-lg border border-gray-200 bg-[#25a267] text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
            >
              View more reviews
            </button>
          </div>
        </div>
      </section>

      {/* <!-- Add review modal --> */}

      {isOpenModal && (
        <div
          id="review-modal"
          className="fixed left-0 right-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0 antialiased"
        >
          <div className="relative w-full max-w-2xl max-h-full p-4">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t dark:border-gray-700 md:p-5">
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                    Add a review for:
                  </h3>
                  <a
                    href="#"
                    className="font-medium text-primary-700 hover:underline dark:text-primary-500"
                  >
                    Apple iMac 24" All-In-One Computer, Apple M1, 8GB RAM, 256GB
                    SSD
                  </a>
                </div>
                <button
                  type="button"
                  className="absolute inline-flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg right-5 top-5 ms-auto hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="review-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <form onSubmit={handleSubmit} className="p-4 md:p-5">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="col-span-2">
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-yellow-300"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-6 h-6 text-yellow-300 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-6 h-6 text-yellow-300 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-6 h-6 text-gray-300 ms-2 dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <svg
                        className="w-6 h-6 text-gray-300 ms-2 dark:text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <span className="text-lg font-bold text-gray-900 ms-2 dark:text-white">
                        3.0 out of 5
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label
                      for="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Review title
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      required=""
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      for="description"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Review description
                    </label>
                    <textarea
                      id="description"
                      rows="6"
                      className="mb-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      required=""
                    ></textarea>
                    <p className="text-xs text-gray-500 ms-auto dark:text-gray-400">
                      Problems with the product or delivery?{" "}
                      <a
                        href="#"
                        className="text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Send a report
                      </a>
                      .
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Add real photos of the product to help other customers{" "}
                      <span className="text-gray-500 dark:text-gray-400">
                        (Optional)
                      </span>
                    </p>
                    <div className="flex items-center justify-center w-full">
                      <label
                        for="dropzone-file"
                        className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 h-52 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center">
                      <input
                        id="review-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
                      />
                      <label
                        for="review-checkbox"
                        className="text-sm font-medium text-gray-500 ms-2 dark:text-gray-400"
                      >
                        By publishing this review you agree with the{" "}
                        <a
                          href="#"
                          className="text-primary-600 hover:underline dark:text-primary-500"
                        >
                          terms and conditions
                        </a>
                        .
                      </label>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 md:pt-5">
                  <button
                    type="button"
                    className="me-2 inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Add review
                  </button>
                  <button
                    type="button"
                    data-modal-toggle="review-modal"
                    className="me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceReview;
