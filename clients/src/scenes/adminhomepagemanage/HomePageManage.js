import { Box, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tokens } from "../../theme";
import Sidebar from "../global/Sidebar";
import Topbar from "../global/Topbar";
import AppsCreateModal from "../../components/modal/AppsCreateModal";
import VideoCreateModal from "../../components/modal/VideoCreateModal";
import { getHomeAppsAction, getHomeVideosAction } from "../../action/auth_admin/AdminMaintainAction";
import { Localhost } from "../../action/host/HostConnection";

function HomePageManage() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isSidebar, setIsSidebar] = useState(true);
  const dispatch = useDispatch();
  const [showVideoModal,setShowVideoModal] = useState(false);
  const [showAppsModal,setShowAppsModal] = useState(false);
  const {lodding,apps,videos} = useSelector((state)=>state.homePagesState);
  useEffect(()=>{
   dispatch(getHomeAppsAction());
   dispatch(getHomeVideosAction());
  },[dispatch])
  return (
    <div className="sidbar__app">
      <Sidebar isSidebar={isSidebar} />
      <div
        className={
          theme.palette.mode === "dark"
            ? "sidbar__content"
            : "sidbar__container__2"
        }
      >
        {showVideoModal && <VideoCreateModal/>}
        {showAppsModal && <AppsCreateModal/>}
        <Topbar setIsSidebar={setIsSidebar} />
        <Box m="20px">
          <div className="flex justify-around">
            <button onClick={()=>setShowVideoModal((pre)=>!pre)} style={{backgroundColor:theme.palette.mode === "dark"?"rgb(18, 48, 85)":"white"}} className=" p-3 rounded-md ">New Video Create</button>
            <button onClick={()=>setShowAppsModal((pre)=>!pre)} style={{backgroundColor:theme.palette.mode === "dark"?"rgb(18, 48, 85)":"white"}} className=" p-3 rounded-md ">New Apps Image Create</button>
          </div>
          <section
            style={{
              backgroundColor:
                theme.palette.mode === "dark"
                  ? "rgb(18, 48, 85)"
                  : "rgb(225, 218, 218)",
            }}
            className="w-full mt-[97px] px-7 md:w-[100%] py-8 antialiased dark:bg-gray-900 md:py-16"
          >
            <div
              style={{
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? "rgb(18, 48, 85)"
                    : "rgb(225, 218, 218)",
              }}
              className="mx-auto max-w-screen-2xl px-4 2xl:px-0"
            >
              <div className="mx-auto max-w-7xl">
                <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold  dark:text-white sm:text-2xl">
                    Home Page Manage
                  </h2>
                </div>

                {/* videos section */}
                <div className="mt-6 flow-root sm:mt-8">
                  <div className="divide-y ">
                    <div className="flex flex-wrap items-center gap-y-4 py-6">
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium  dark:text-gray-400">
                          Video ID:
                        </dt>
                        <dd className="mt-1.5 text-base text-[9px]  dark:text-white">
                          <a href="#" className="hover:underline">
                           {videos[0]?._id}
                          </a>
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium  dark:text-gray-400">
                          Title:
                        </dt>
                        <p className="mt-1.5 text-base text-[9px]  dark:text-white">
                        {videos[0]?.title}
                        </p>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium  dark:text-gray-400">
                          Description
                        </dt>
                        <dd className="mt-1.5 text-base text-[9px]  dark:text-white">
                        {videos[0]?.description}
                        </dd>
                      </dl>
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium  dark:text-gray-400">
                          Video
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold  dark:text-white">
                          <video
                            style={{ height: "50px", width: "50px" }}
                            src= {Localhost + `/images/videos/${videos[0]?.video}`}
                            alt=""
                          />
                        </dd>
                      </dl>
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium  dark:text-gray-400">
                          Cover Image
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold  dark:text-white">
                          <img
                            style={{ height: "50px", width: "50px" }}
                            src= {videos[0]?.coverimage}
                            alt=""
                          />
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>

                {/* apps section */}
                <div className="mt-6 flow-root sm:mt-8">
                  <div className="divide-y ">
                    <div className="flex flex-wrap items-center gap-y-4 py-6">
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium  dark:text-gray-400">
                          Apps ID:
                        </dt>
                        <dd className="mt-1.5 text-base text-[9px]  dark:text-white">
                          <a href="#" className="hover:underline">
                          {apps[0]?._id}
                          </a>
                        </dd>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium  dark:text-gray-400">
                          Title:
                        </dt>
                        <p className="mt-1.5 text-base text-[9px]  dark:text-white">
                          {apps[0]?.title}
                        </p>
                      </dl>

                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium  dark:text-gray-400">
                          Description
                        </dt>
                        <dd className="mt-1.5 text-base text-[9px]  dark:text-white">
                        {apps[0]?.description}
                        </dd>
                      </dl>
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium  dark:text-gray-400">
                          Image
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold  dark:text-white">
                          <img
                            style={{ height: "50px", width: "50px" }}
                            src= {Localhost + `/images/apps/${apps[0]?.image}`}
                            alt=""
                          />
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Box>
      </div>
    </div>
  );
}

export default HomePageManage;
