import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Lodder from "../lodder/Lodder";
import { getHomeVideosAction } from "../../action/auth_admin/AdminMaintainAction";
import { Localhost } from "../../action/host/HostConnection";
// import VideoSection from './VideoSection';

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });
  return domNode;
};

const Customer = () => {
  const [videoOpen, setVideoOpen] = useState(false);
  const dispatch = useDispatch();
  const { lodding, videos } = useSelector((state) => state.homePagesState);
  const { error, userInfo } = useSelector((state) => state.loginState);
  useEffect(() => {
    dispatch(getHomeVideosAction());
  }, [dispatch]);

  let domNode = useClickOutside(() => {
    setVideoOpen(false);
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      {lodding && <Lodder />}
      <section ref={ref} className="relative mt-10 bg-blue-50">
        <div className="absolute top-6 left-[8%] md:top-14 md:left-[30%]">
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.5 }}
            className="font-serif text-lg text-center text-black md:text-4xl"
          >
            {videos[0]?.title.substring(0, 20)}
            <span className="text-[#25a267]">
              {" "}
              {videos[0]?.title.substring(20, videos[0].length)}
            </span>
          </motion.h1>
        </div>
        <div class="relative flex flex-col items-center max-w-screen-xl sm:pt-20 px-4 mx-auto md:flex-row sm:px-6 p-8">
          <div class="flex items-center pt-16  md:pb-14 md:w-1/2  md:pr-10">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.5 }}
              class="text-left"
            >
              <blockquote class="relative border-s-4 ps-4 sm:ps-6 border-[#25a267]">
                <p class="text-gray-800 sm:text-xl dark:text-gray-600 md:text-4xl">
                  <em>{videos[0]?.description}</em>
                </p>
                <footer class="mt-4">
                  <div class="flex items-center">
                    <div class="shrink-0">
                      <img
                        class="size-10 rounded-full"
                        src={Localhost + `/images/avatars/29937.jpg`}
                        alt="Avatar"
                      />
                    </div>
                    <div class="ms-4">
                      <div class="text-base font-semibold text-gray-800 dark:text-neutral-400">
                        {userInfo?.user?.name}
                      </div>
                      <div class="text-xs text-gray-500 dark:text-neutral-500">
                        Source title
                      </div>
                    </div>
                  </div>
                </footer>
              </blockquote>
            </motion.div>
          </div>
          <div class="flex items-center py-5 md:w-1/2 pt-[30px] pb-10 md:pb-20 md:pt-[70px] md:pl-14">
            <motion.section
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
              className="container py-8 md:pt-8 bg-dark"
            >
              <div ref={domNode} className="">
                <div className="flex flex-wrap justify-center mr-8">
                  <div className="w-full px-4 lg:w-full">
                    <div className="relative z-20 h-[300px] w-[120%] overflow-hidden rounded-lg md:h-[300px]">
                      <div className="relative w-full h-full">
                        {videos[0]?.coverimage ? (
                          <img
                            src={videos[0]?.coverimage}
                            alt="bg"
                            className="object-cover object-center w-full h-full"
                          />
                        ) : (
                          <img
                            src="https://i.ibb.co/KbSwcWJ/image-01-1.jpg"
                            alt="bg"
                            className="object-cover object-center w-full h-full"
                          />
                        )}
                      </div>
                      <div
                        className={`absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-primary bg-opacity-5`}
                      >
                        <a
                          href="/#"
                          onClick={() => setVideoOpen(true)}
                          className="absolute z-20 flex h-20 w-20 items-center justify-center rounded-full bg-white text-primary dark:bg-dark-2 dark:text-white md:h-[100px] md:w-[100px]"
                        >
                          <span className="absolute right-0 top-0 z-[-1] h-full w-full animate-ping rounded-full bg-white bg-opacity-20 delay-300 duration-1000"></span>
                          <svg
                            width="23"
                            height="27"
                            viewBox="0 0 23 27"
                            className="fill-current"
                          >
                            <path d="M22.5 12.634C23.1667 13.0189 23.1667 13.9811 22.5 14.366L2.25 26.0574C1.58333 26.4423 0.750001 25.9611 0.750001 25.1913L0.750002 1.80866C0.750002 1.03886 1.58334 0.557731 2.25 0.942631L22.5 12.634Z" />
                          </svg>
                        </a>
                      </div>

                      <div>
                        <span className="absolute z-40 left-4 top-4">
                          <svg
                            width="50"
                            height="79"
                            viewBox="0 0 50 79"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <circle
                              cx="32.3916"
                              cy="1.74145"
                              r="1.74121"
                              transform="rotate(180 32.3916 1.74145)"
                              fill="white"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {videoOpen && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen bg-black bg-opacity-85">
                  <div className="mx-auto w-full max-w-[550px] bg-white">
                    <>
                      <iframe
                        className="h-[320px] w-full"
                        // src={Localhost + `/images/videos/${videos[0]?.video}`}
                        src="https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1&mute=1"
                      />
                    </>
                  </div>

                  <button
                    onClick={() => setVideoOpen(false)}
                    className="absolute top-0 right-0 flex items-center justify-center w-20 h-20 cursor-pointer text-body-color hover:bg-black"
                  >
                    <svg viewBox="0 0 16 15" className="w-8 h-8 fill-white">
                      <path d="M3.37258 1.27L8.23258 6.13L13.0726 1.29C13.1574 1.19972 13.2596 1.12749 13.373 1.07766C13.4864 1.02783 13.6087 1.00141 13.7326 1C13.9978 1 14.2522 1.10536 14.4397 1.29289C14.6272 1.48043 14.7326 1.73478 14.7326 2C14.7349 2.1226 14.7122 2.24439 14.6657 2.35788C14.6193 2.47138 14.5502 2.57419 14.4626 2.66L9.57258 7.5L14.4626 12.39C14.6274 12.5512 14.724 12.7696 14.7326 13C14.7326 13.2652 14.6272 13.5196 14.4397 13.7071C14.2522 13.8946 13.9978 14 13.7326 14C13.6051 14.0053 13.478 13.984 13.3592 13.9375C13.2404 13.8911 13.1326 13.8204 13.0426 13.73L8.23258 8.87L3.38258 13.72C3.29809 13.8073 3.19715 13.8769 3.08559 13.925C2.97402 13.9731 2.85405 13.9986 2.73258 14C2.46737 14 2.21301 13.8946 2.02548 13.7071C1.83794 13.5196 1.73258 13.2652 1.73258 13C1.73025 12.8774 1.753 12.7556 1.79943 12.6421C1.84586 12.5286 1.91499 12.4258 2.00258 12.34L6.89258 7.5L2.00258 2.61C1.83777 2.44876 1.74112 2.23041 1.73258 2C1.73258 1.73478 1.83794 1.48043 2.02548 1.29289C2.21301 1.10536 2.46737 1 2.73258 1C2.97258 1.003 3.20258 1.1 3.37258 1.27Z" />
                    </svg>
                  </button>
                </div>
              )}
            </motion.section>
          </div>
        </div>
      </section>
    </>
  );
};

export default Customer;
