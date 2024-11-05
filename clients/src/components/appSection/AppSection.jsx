import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getHomeAppsAction } from "../../action/auth_admin/AdminMaintainAction";
import { Localhost } from "../../action/host/HostConnection";
import Lodder from "../lodder/Lodder";

const AppSection = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  let isInView = useInView(ref, { infinite: true });
  const { lodding, apps } = useSelector((state) => state.homePagesState);

  useEffect(() => {
    dispatch(getHomeAppsAction());
  }, [dispatch]);
  return (
    <>
      {lodding && <Lodder />}
      <section
        ref={ref}
        className="max-w-screen-xl px-4 mx-auto mb-8 text-gray-800"
      >
        <div className="items-center justify-center md:mt-40 md:flex">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.5 }}
            className="flex items-center justify-center mt-12 overflow-hidden lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
          >
            <img
              src={Localhost + `/images/apps/${apps[0]?.image}`}
              alt=""
              className="object-contain transition-all duration-1000 ease-linear rounded-md hover:scale-110 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.5 }}
            className="flex flex-col justify-center text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left"
          >
            <h1 className="mt-8 text-xl font-bold md:mt-0 md:text-2xl">{apps[0]?.title}</h1>
            <p className="mt-6 mb-8 text-lg sm:mb-12">{apps[0]?.description}</p>
            <div>
              <button className="px-4 py-2 border-2 text-xl font-bold rounded-md border-[#25a267] text-[#25a267] hover:bg-[#25a267] hover:text-white">
                Download App
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default AppSection;
