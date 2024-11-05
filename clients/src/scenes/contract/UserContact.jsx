import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  ContractRefreshAction,
  SendMessageClientToAdminAction,
} from "../../action/auth_user/UserAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserContact = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [emailorphone, setEmailorPhone] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clientInfo } = useSelector((state) => state.userLoginState);
  const { error, iClientSend } = useSelector((state) => state.contractState);

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (!clientInfo?.user?._id) {
      navigate("/login");
      return;
    }
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
        className="mt-8 h-100 lg:w-38 md:h-full md:w-48 md:mt-0 "
      >
        <section className="bg-white md:pt-24" id="contact">
          <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:py-20">
            <div className="mb-4">
              <div className="max-w-3xl mb-6 text-center sm:text-center md:mx-auto md:mb-12">
                {/* <p className="text-base font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-200">
                  Contact
                </p> */}
                <h2 className="font-heading mb-4 font-bold tracking-tight text-[#25a267] text-3xl sm:text-5xl">
                  Get in Touch
                </h2>
                <p className="max-w-3xl mx-auto mt-4 text-xl text-gray-400">
                  In hac habitasse platea dictumst
                </p>
              </div>
            </div>
            <div className="flex items-stretch justify-center">
              <div className="grid md:grid-cols-2">
                <div className="h-full pr-6">
                  <p className="mt-3 mb-12 text-lg text-gray-500">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Corporis sint voluptas labore harum ex neque, adipisci
                    suscipit natus aliquid eos!
                  </p>
                  <ul className="mb-6 md:mb-0">
                    <li className="flex">
                      <div className="flex h-10 w-10 items-center justify-center rounded border border-[#25a267] text-gray-500">
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
                          className="w-6 h-6"
                        >
                          <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                          <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                        </svg>
                      </div>
                      <div className="mb-4 ml-4">
                        <h3 className="mb-2 text-lg font-medium leading-6 text-[#25a267] ">
                          Our Address
                        </h3>
                        <p className="text-gray-500">
                          1230 Maecenas Street Donec Road
                        </p>
                        <p className="text-gray-500">
                          New York, EEUU
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex h-10 w-10 items-center justify-center rounded border border-[#25a267] text-gray-500">
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
                          className="w-6 h-6"
                        >
                          <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                          <path d="M15 7a2 2 0 0 1 2 2"></path>
                          <path d="M15 3a6 6 0 0 1 6 6"></path>
                        </svg>
                      </div>
                      <div className="mb-4 ml-4">
                        <h3 className="mb-2 text-lg font-medium leading-6 text-[#25a267]">
                          Contact
                        </h3>
                        <p className="text-gray-500">
                          Mobile: +1 (123) 456-7890
                        </p>
                        <p className="text-gray-500">
                          Mail: tailnext@gmail.com
                        </p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex items-center justify-center w-10 h-10 text-gray-500 border rounded border-[#25a267]">
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
                          className="w-6 h-6"
                        >
                          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                          <path d="M12 7v5l3 3"></path>
                        </svg>
                      </div>
                      <div className="mb-4 ml-4">
                        <h3 className="mb-2 text-lg font-medium leading-6 text-[#25a267]">
                          Working hours
                        </h3>
                        <p className="text-gray-500">
                          Monday - Friday: 08:00 - 17:00
                        </p>
                        <p className="text-gray-500">
                          Saturday &amp; Sunday: 08:00 - 12:00
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="max-w-6xl p-5 card h-fit md:p-12" id="form">
                  <h2 className="mb-4 text-2xl text-[#25a267] font-bold">
                    Ready to Get Started?
                  </h2>
                  <form id="contactForm" onSubmit={handlerSubmit}>
                    <div className="mb-6">
                      <div className="mx-0 mb-1 sm:mb-4">
                        <div className="mx-0 mb-1 sm:mb-4">
                          <label
                            for="name"
                            className="pb-1 text-xs tracking-wider uppercase"
                          ></label>
                          <input
                            type="text"
                            id="name"
                            autocomplete="given-name"
                            placeholder="Your name"
                            className="w-full py-2 pl-2 pr-4 mb-2 text-black border border-gray-400 rounded-md shadow-md sm:mb-0"
                            name="name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="mx-0 mb-1 sm:mb-4">
                          <label
                            for="email"
                            className="pb-1 text-xs tracking-wider uppercase"
                          ></label>
                          <input
                            type="text"
                            id="email"
                            autocomplete="email"
                            placeholder="Your email  address or phone number"
                            className="w-full py-2 pl-2 pr-4 mb-2 text-black border border-gray-400 rounded-md shadow-md sm:mb-0"
                            name="email"
                            value={emailorphone}
                            onChange={(e) => setEmailorPhone(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="mx-0 mb-1 sm:mb-4">
                        <label
                          for="textarea"
                          className="pb-1 text-xs tracking-wider uppercase"
                        ></label>
                        <textarea
                          id="textarea"
                          name="textarea"
                          cols="30"
                          rows="5"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Write your message..."
                          className="w-full py-2 pl-2 pr-4 mb-2 text-black border border-gray-400 rounded-md shadow-md sm:mb-0"
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

export default UserContact;
