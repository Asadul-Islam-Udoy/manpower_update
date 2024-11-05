import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import { Localhost } from "../../action/host/HostConnection";
import { Link } from "react-router-dom";

const AllService = ({ data, lodding }) => {
  useEffect(() => {
    if (!lodding) {
      const slider = new Glide(".glide-04", {
        type: "carousel",
        focusAt: 1,
        perView: 4,
        autoplay: 3500,
        animationDuration: 700,
        gap: 24,
        classNames: {
          nav: {
            active: "[&>*]:bg-wuiSlate-700",
          },
        },
        breakpoints: {
          1024: {
            perView: 2,
          },
          640: {
            perView: 1,
          },
        },
      }).mount();

      return () => {
        slider.destroy();
      };
    }
  }, [data]);

  return (
    <>
      <div className="py-20 mt-24 bg-blue-50">
        <div className="header">
          <h1 className="mb-4 text-3xl font-bold text-center text-[#25a267]">
            For Your Home
          </h1>
        </div>
        {/*<!-- Component: Testimonial carousel --> */}
        <div className="relative max-w-screen-xl px-4 mx-auto glide-04 ">
          {/*    <!-- Slides --> */}
          <div data-glide-el="track" className="overflow-hidden">
            <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-[300px] overflow-hidden p-0 pb-4">
              {data?.map((item, index) => (
                <Link
                  to={`/category/basic/services/${item.service_category_id._id}/${item.service_category_id.category_name}`}
                >
                  <li key={index}>
                    {/*<!-- Component: Basic blog card --> */}
                    <div className="overflow-hidden bg-white border rounded shadow-md text-slate-500 shadow-slate-200 border-[#25a267]">
                      {/*  <!-- Image --> */}
                      <div className="p-2">
                      <figure>
                        <img
                          src={Localhost + `/images/services/${item.image}`}
                          alt="card image"
                          className="w-full h-48 transition-all duration-1000 ease-linear hover:scale-110 aspect-video"
                        />
                      </figure>
                      {/*  <!-- Body--> */}
                      <div  className="pt-1"> 
                          <h3 className="text-xl font-medium truncate text-slate-700">
                            {item.name.substring(0, 25)}
                          </h3> 
                      </div>
                      </div>
                    </div>
                    {/*<!-- End Basic blog card --> */}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          {/*    <!-- Indicators --> */}
          <div
            className="flex items-center justify-center w-full gap-2 p-4"
            data-glide-el="controls"
          >
            <button
              className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
              data-glide-dir="<"
              aria-label="prev slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <title>prev slide</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
            </button>
            <button
              className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
              data-glide-dir=">"
              aria-label="next slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <title>next slide</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>
        {/*<!-- End Testimonial carousel --> */}
      </div>
    </>
  );
};
export default AllService;
