import React, { useState } from "react";
import { BsBagCheck } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import ClientOrder from "../../components/clientprofile/ClientOrder";
import ClientProfile from "../../components/clientprofile/ClientProfile";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Localhost } from "../../action/host/HostConnection";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [menuOpen, setMenuOpen] = useState(true);
  const { clientInfo, clientProfile } = useSelector(
    (state) => state.userLoginState
  );
  const { id } = useParams();
  return (
    <>
      <Header />
      <div className="min-h-screen overflow-hidden bg-gray-200">
        <div className="flex flex-col max-w-screen-xl py-2 mx-auto md:py-24 md:flex-row ">
          <nav
            className={`flex flex-col mt-20 md:pt-0 bg-white w-full md:w-64 h-auto md:h-screen px-4 text-gray-900 border  shadow-[rgba(6,_24,_44,_0.4)_0px_0px_0px_2px,_rgba(6,_24,_44,_0.65)_0px_4px_6px_-1px,_rgba(255,_255,_255,_0.08)_0px_1px_0px_inset] rounded-md md:mt-[20px] ${
              menuOpen ? "block" : "hidden"
            }  md:block `}
          >
            {clientProfile?.avatar ? (
              <div className="flex flex-col items-center justify-center mt-8">
                <img
                  src={Localhost + `/images/avatars/${clientProfile?.avatar}`}
                  className="w-20 h-20 mx-auto rounded-full"
                  alt="Client"
                />
                <span className="mt-2 text-xl font-semibold text-white">
                  {clientProfile?.username}
                </span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center mt-8">
                <img
                  src="https://www.kaartech.com/wp-content/uploads/2023/05/hw_client-img.png"
                  className="w-20 h-20 mx-auto rounded-full"
                  alt="Client"
                />
                <span className="mt-2 text-xl font-semibold text-white">
                  {clientProfile?.phone_or_email}
                </span>
              </div>
            )}

            <div className="mt-10 mb-4">
              <ul className="ml-4">
                <li
                  className="flex items-center px-4 py-4 mb-2 text-gray-400 border-gray-300 rounded-lg cursor-pointer hover:text-black hover:bg-white hover:font-bold"
                  onClick={() => {
                    setActiveTab("profile");
                    setMenuOpen(false);
                  }}
                >
                  <HomeIcon />
                  <Link to="/">
                    <span className="ml-2">Home</span>
                  </Link>
                </li>
                <li
                  className="flex items-center px-4 py-4 mb-2 text-blue-400 border-gray-300 rounded-lg cursor-pointer hover:text-black hover:hover:bg-white hover:font-bold"
                  onClick={() => {
                    setActiveTab("profile");
                    setMenuOpen(false);
                  }}
                >
                  <FaUserCircle />
                  <span className="ml-2">Profile</span>
                </li>
                {/* {clientInfo?.user?._id == id && ( */}
                  <li
                    className="flex items-center px-4 py-4 mb-2 text-blue-400 border-gray-300 rounded-lg cursor-pointer hover:text-black hover:hover:bg-white hover:font-bold"
                    onClick={() => {
                      setActiveTab("order");
                      setMenuOpen(false);
                    }}
                  >
                    <BsBagCheck />
                    <span className="ml-2">My Order</span>
                  </li>
                {/* )} */}
                {clientInfo?.user?._id == id && (
                  <li
                    className="flex items-center px-4 py-4 mb-2 text-blue-400 border-gray-300 rounded-lg cursor-pointer hover:text-black hover:bg-white hover:font-bold"
                    onClick={() => {
                      setActiveTab("profile");
                      setMenuOpen(false);
                    }}
                  >
                    <ConnectWithoutContactIcon />
                    <Link to="/user/helps">
                      <span className="ml-2">Helps</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </nav>

          {/* <button
            className="md:hidden mt-20 fixed bg-[#a2b341]  text-white px-4 py-2 rounded-md  mx-auto"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <IoSettings className="animate-spin" />
            ) : (
              <IoSettings className="animate-spin" />
            )}
          </button> */}

          <div className="flex-1">
            <div className={`flex-1 md:mt-0 ${menuOpen ? "-mt-14" : ""}`}>
              {activeTab === "profile" && <ClientProfile />}
            </div>
            <div className={`flex-1 mt-16 md:mt-0 ${menuOpen ? "mt-14" : ""}`}>
              {activeTab === "order" && <ClientOrder />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ClientDashboard;
