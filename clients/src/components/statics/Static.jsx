import React, { useEffect, useState } from "react";
import "./Static.css";
const Statics = () => {
  const [accuracy_rate, setaccuracy_rate] = useState(0);
  const [payroll_managed, setpayroll_managed] = useState(0);
  const [processing_free, setprocessing_free] = useState(0);
  const [staff_last_year, setstaff_last_year] = useState(0);

  useEffect(() => {
    rangeFunction();
  }, [accuracy_rate, payroll_managed, processing_free, staff_last_year]);

  const rangeFunction = () => {
    if (accuracy_rate >= 99) {
    } else {
      setTimeout(() => {
        setaccuracy_rate((pre) => pre + 1);
      }, 10);
    }
    if (payroll_managed >= 147) {
    } else {
      setTimeout(() => {
        setpayroll_managed((pre) => pre + 1);
      }, 10);
    }
    if (processing_free >= 20) {
    } else {
      setTimeout(() => {
        setprocessing_free((pre) => pre + 1);
      }, 10);
    }
    if (staff_last_year >= 99) {
    } else {
      setTimeout(() => {
        setstaff_last_year((pre) => pre + 1);
      }, 10);
    }
  };
  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 h-[110px] relative rounded-md top-10  z-10">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg  sm:grid grid-cols-4">
          <div class="flex flex-col md:p-6 p-2 text-center  border-gray-100 dark:border-gray-700 ">
            <dt
              class="order-2 mt-2 text-lg font-medium leading-6 text-[#25a267] dark:text-gray-400"
              id="item-1"
            >
              Accuracy Rate Chart
            </dt>
            <dd
              class="order-1 md:text-5xl text-xl  font-extrabold leading-none text-orange-400 dark:text-indigo-100"
              aria-describedby="item-1"
              id="starsCount"
            >
              {accuracy_rate}%
            </dd>
          </div>
          <div class="flex flex-col md:p-6 p-2 text-center  border-gray-100 dark:border-gray-700 ">
            <dt class="order-2 mt-2 text-lg font-medium leading-6 text-[#25a267] dark:text-gray-400">
              Payroll Managed
            </dt>
            <dd
              class="order-1 md:text-5xl text-xl font-extrabold leading-none text-orange-400 dark:text-indigo-100"
              id="downloadsCount"
            >
              {payroll_managed}
            </dd>
          </div>
          <div class="flex flex-col md:p-6 p-2 text-center  border-gray-100 dark:border-gray-700 ">
            <dt class="order-2 mt-2 text-lg font-medium leading-6 text-[#25a267] dark:text-gray-400">
              Processing Fee
            </dt>
            <dd
              class="order-1 md:text-5xl text-xl font-extrabold leading-none text-orange-400 dark:text-indigo-100"
              id="sponsorsCount"
            >
              ${processing_free}
            </dd>
          </div>
          <div class="flex flex-col md:p-6 p-2 text-center  border-gray-100 dark:border-gray-700 ">
            <dt class="order-2 mt-2 text-lg font-medium leading-6 text-[#25a267] dark:text-gray-400">
              Staff Last Year
            </dt>
            <dd
              class="order-1 md:text-5xl text-xl font-extrabold leading-none text-orange-400 dark:text-indigo-100"
              id="sponsorsCount"
            >
              {staff_last_year}
            </dd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statics;
