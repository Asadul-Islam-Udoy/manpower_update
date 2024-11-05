import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  ContractRefreshAction,
  SendMessageClientToAdminAction,
} from "../../action/auth_user/UserAction";
import { toast } from "react-toastify";

const Helps = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [emailorphone, setEmailorPhone] = useState("");
  const dispatch = useDispatch();
  const { clientInfo } = useSelector((state) => state.userLoginState);
  const { error, iClientSend } = useSelector((state) => state.contractState);

  const handlerSubmit = (e) => {
    e.preventDefault();
    const myfrom = new FormData();
    myfrom.set("username", username);
    myfrom.set("message", message);
    myfrom.set("email_or_phone", emailorphone);
    dispatch(SendMessageClientToAdminAction(clientInfo?.user?._id, myfrom));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (iClientSend) {
      toast.success("message send successfully!");
    }
    dispatch(ContractRefreshAction());
  }, [dispatch, iClientSend, error, toast]);
  return (
    <>
      <Header />
      <div
        style={{ width: "100%" }}
        className="h-100 lg:w-38 md:h-full md:w-48 md:mt-0 mt-8  "
      >
        <section
          className="bg-blue-100 md:pt-24 dark:bg-slate-800"
          id="contact"
        >
          <div className="mx-auto max-w-screen-xl  px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <div className="mb-4">
              <div className="mb-6 max-w-3xl text-center sm:text-center md:mx-auto md:mb-12">
                <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
                  Get in Contract
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">
                  In hac habitasse platea dictumst
                </p>
              </div>
            </div>
            <div className="flex items-stretch justify-center">
              <div className="grid md:grid-cols-2">
                <div className="h-full pr-6">
                  <p className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Corporis sint voluptas labore harum ex neque, adipisci
                    suscipit natus aliquid eos!
                  </p>
                  <ul className="mb-6 md:mb-0">
                    <li className="flex">
                      <div className="flex h-10 w-10 items-center justify-center rounded  bg-[#25a267] text-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="h-6 w-6"
                        >
                          <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                          <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                        </svg>
                      </div>
                      <div className="ml-4 mb-4">
                        <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                          Our Address
                        </h3>
                        <p className="text-gray-600 dark:text-slate-400">
                          1230 Maecenas Street Donec Road
                        </p>
                        <p className="text-gray-600 dark:text-slate-400">
                          New York, EEUU
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex h-10 w-10 items-center justify-center rounded  bg-[#25a267] text-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="h-6 w-6"
                        >
                          <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                          <path d="M15 7a2 2 0 0 1 2 2"></path>
                          <path d="M15 3a6 6 0 0 1 6 6"></path>
                        </svg>
                      </div>
                      <div className="ml-4 mb-4">
                        <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                          Contact
                        </h3>
                        <p className="text-gray-600 dark:text-slate-400">
                          Mobile: +1 (123) 456-7890
                        </p>
                        <p className="text-gray-600 dark:text-slate-400">
                          Mail: tailnext@gmail.com
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex h-10 w-10 items-center justify-center rounded  bg-[#25a267] text-gray-50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="h-6 w-6"
                        >
                          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                          <path d="M12 7v5l3 3"></path>
                        </svg>
                      </div>
                      <div className="ml-4 mb-4">
                        <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                          Working hours
                        </h3>
                        <p className="text-gray-600 dark:text-slate-400">
                          Monday - Friday: 08:00 - 17:00
                        </p>
                        <p className="text-gray-600 dark:text-slate-400">
                          Saturday &amp; Sunday: 08:00 - 12:00
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="card h-fit max-w-6xl p-5 md:p-12" id="form">
                  <h2 className="mb-4 text-2xl text-black font-bold dark:text-white">
                    Ready to Get Started?
                  </h2>
                  <form id="contactForm" onSubmit={handlerSubmit}>
                    <div className="mb-6">
                      <div className="mx-0 mb-1 sm:mb-4">
                        <div className="mx-0 mb-1 sm:mb-4">
                          <label
                            for="name"
                            className="pb-1 text-xs uppercase tracking-wider"
                          ></label>
                          <input
                            type="text"
                            id="name"
                            autocomplete="given-name"
                            placeholder="Your name"
                            className="mb-2 w-full text-black rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                            name="name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="mx-0 mb-1 sm:mb-4">
                          <label
                            for="email"
                            className="pb-1 text-xs uppercase tracking-wider"
                          ></label>
                          <input
                            type="text"
                            id="email"
                            autocomplete="email"
                            placeholder="Your email  address or phone number"
                            className="mb-2 w-full text-black rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                            name="email"
                            value={emailorphone}
                            onChange={(e) => setEmailorPhone(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mx-0 mb-1 sm:mb-4">
                        <label
                          for="textarea"
                          className="pb-1 text-xs uppercase tracking-wider"
                        ></label>
                        <textarea
                          id="textarea"
                          name="textarea"
                          cols="30"
                          rows="5"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Write your message..."
                          className="mb-2 w-full text-black rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                        ></textarea>
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="w-full  bg-[#25a267] text-white px-6 py-3 font-xl rounded-md sm:mb-0"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Helps;
