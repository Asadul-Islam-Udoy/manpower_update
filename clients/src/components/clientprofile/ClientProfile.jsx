import React, { useEffect, useState } from "react";
import CreateClientProfile from "./UpdateClientProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  GetClientProfileAction,
  UpdateClientProfileAction,
} from "../../action/auth_user/UserAction";
import { Localhost } from "../../action/host/HostConnection";
import { useParams } from "react-router-dom";

const ClientProfile = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { clientInfo, clientProfile } = useSelector(
    (state) => state.userLoginState
  );

  useEffect(() => {
    dispatch(GetClientProfileAction(clientInfo?.user?._id || id));
  }, [clientInfo?.user?._id || id]);

  const [profileData, setProfileData] = useState({
    avatar: clientProfile?.avatar,
    username: clientProfile?.username,
    phone: clientProfile?.avatar,
    area: clientProfile?.area,
    address: clientProfile?.address,
    profile_description: clientProfile?.profile_description,
  });

  const handleProfileEdit = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleSaveProfile = (upadateData) => {
    dispatch(UpdateClientProfileAction(clientInfo?.user?._id, upadateData));
    setProfileData(upadateData);
    setShowModal(false);
  };

  return (
    <div
      style={{ scrollbarWidth: "none" }}
      className="h-screen overflow-y-scroll "
    >
      <section className="min-h-screen mt-0 md:pt-10 md:-mt-20">
        <div className="w-full lg:w-[100%]   md:w-2/3 px-4 mx-auto">
          <div className="flex flex-col w-full min-w-0 mt-16 mb-6 text-white break-words bg-white rounded-lg shadow-xl  md:min-h-screen">
            <div className="px-6 ">
              <div className="flex flex-wrap justify-start">
                <div className="flex justify-center w-full px-4"></div>
                <div className="m-5">
                  {clientInfo?.user?._id == id && (
                    <button
                      onClick={handleProfileEdit}
                      className="relative md:left-[840px] left-48 flex p-2.5 bg-emerald-600 rounded-xl hover:rounded-3xl hover:bg-[#25a267] transition-all duration-300 text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="relative flex flex-col mt-12 text-start md:items-center md:mt-28 ">
                  <div className="absolute justify-center hidden md:block md:-mt-28">
                    {clientProfile?.avatar ? (
                      <img
                        src={
                          Localhost + `/images/avatars/${clientProfile?.avatar}`
                        }
                        className="shadow-xl  rounded-md w-28 h-28  align-middle bg-blue-600 border-none    max-w-[150px]"
                        alt=""
                      />
                    ) : (
                      <img
                        src="https://www.kaartech.com/wp-content/uploads/2023/05/hw_client-img.png"
                        className="shadow-xl rounded-full w-28 h-28  align-middle bg-blue-600 border-none   max-w-[150px]"
                        alt=""
                      />
                    )}
                  </div>
                  <div className="lg:w-[700px] md:[500px] w-full my-4 ">
                    <h1 className="ml-3 text-3xl font-bold text-gray-600 md:text-center md:ml-8">
                      {clientProfile?.username}
                    </h1>
                    <p class="md:ml-8 px-2 max-w-screen-xl mx-auto w-full text-justify text-black py-8 italic md:text-sm  text-lg">
                      {clientProfile?.profile_description}
                    </p>
                  </div>

                  {/* here */}

                  <div class="w-full items-center  md:shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]  md:w-[650px] my-auto py-6 flex flex-col  justify-center gap-2">
                    <div class="w-full flex flex-col md:flex-row gap-2 justify-center">
                      <div class="w-full ml-3 md:ml-16">
                        <dl class="text-gray-900 md:divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                          <div class="flex flex-col pb-3">
                            <dt class="py-2 text-blue-600 md:text-lg dark:text-gray-400">
                              Country
                            </dt>
                            <p
                              style={{ fontSize: "12px" }}
                              class="text-sm font-semibold text-gray-600"
                            >
                              Bangladesh
                            </p>
                          </div>
                          <div class="flex flex-col py-3 ">
                            <dt class="py-2 text-blue-600 md:text-lg dark:text-gray-400 ">
                              Area
                            </dt>
                            <p
                              style={{ fontSize: "12px" }}
                              class="text-lg font-semibold md:border-b border-gray-200 text-gray-600 pb-2"
                            >
                              {clientProfile?.area}
                            </p>
                          </div>
                        </dl>
                      </div>
                      <div class="w-full ml-3 md:ml-16">
                        <dl class="text-gray-900 md:divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                          {clientInfo?.user?.email ? (
                            <div class="flex flex-col pb-3">
                              <dt class="py-2 text-blue-600 md:text-lg dark:text-gray-400">
                                Email Address
                              </dt>
                              <p
                                style={{ fontSize: "12px" }}
                                class="text-lg font-semibold text-gray-600"
                              >
                                {clientProfile?.phone_or_email}
                              </p>
                            </div>
                          ) : (
                            <div class="flex flex-col pb-3">
                              <dt class="py-2 text-blue-600 md:text-lg dark:text-gray-400">
                                Phone Number
                              </dt>
                              <p
                                style={{ fontSize: "12px" }}
                                class="text-lg font-semibold text-gray-600"
                              >
                                {clientProfile?.phone_or_email}
                              </p>
                            </div>
                          )}

                          <div class="flex flex-col pt-3">
                            <dt class="py-2 text-blue-600  md:text-lg dark:text-gray-400">
                              Address
                            </dt>
                            <p
                              style={{ fontSize: "12px" }}
                              class="text-lg font-semibold md:border-b border-gray-200 text-gray-600 pb-2"
                            >
                              {clientProfile?.address}
                            </p>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                  {/* <div class="w-full md:w-[650px] my-auto py-6 flex flex-col justify-center gap-2">
                    <div class="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                      <div class="w-full">
                        <dl class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                          <div class="flex flex-col pb-3">
                            <dt class="py-2 text-white md:text-lg dark:text-gray-400">
                              Full Name
                            </dt>
                            <dd class="text-lg font-semibold text-gray-600">Jhons mith</dd>
                          </div>
                          <div class="flex flex-col py-3 ">
                            <dt class="py-2 text-white md:text-lg dark:text-gray-400 ">
                             Area
                            </dt>
                            <dd class="text-lg font-semibold border-b border-gray-200 text-gray-600 pb-2">Abera</dd>
                          </div>
                         
                         
                        </dl>
                      </div>
                      <div class="w-full">
                        <dl class="text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                        <div class="flex flex-col pb-3">
                            <dt class="py-2 text-white md:text-lg dark:text-gray-400">
                              Phone Number
                            </dt>
                            <dd class="text-lg font-semibold text-gray-600">+251913****30</dd>
                          </div>

                          <div class="flex flex-col pt-3">
                            <dt class="py-2 text-white md:text-lg dark:text-gray-400">
                             Address
                            </dt>
                            <dd class="text-lg font-semibold border-b border-gray-200 text-gray-600 pb-2">user address</dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div> */}
                  {/* here */}

                  {/* <div className="mt-0 mb-2 text-xl font-bold leading-normal text-blueGray-400">
                    <h3 className="mb-2 text-xl font-semibold leading-normal text-blueGray-700">
                      Phone :{" "}
                      <span className="text-xl font-normal">017XXXXXXXX</span>
                    </h3>
                    <h3 className="mb-2 text-xl font-semibold leading-normal text-blueGray-700">
                      Area :{" "}
                      <span className="text-xl font-normal">
                        {profileData.area}
                      </span>
                    </h3>
                    <h3 className="mb-2 text-xl font-semibold leading-normal text-blueGray-700">
                      Address :{" "}
                      <span className="text-xl font-normal">
                        {profileData.address}
                      </span>
                    </h3>
                    <h3 className="mb-2 text-xl font-semibold leading-normal text-blueGray-700">
                      Description :{" "}
                      <span className="text-xl font-normal">
                        {profileData.description}
                      </span>
                    </h3>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal && (
        <CreateClientProfile
          handleCloseModal={handleCloseModal}
          initialData={clientProfile}
          handleSaveProfile={handleSaveProfile}
        />
      )}
    </div>
  );
};

export default ClientProfile;
