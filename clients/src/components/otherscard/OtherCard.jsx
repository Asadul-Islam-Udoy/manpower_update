import React, { useEffect, useState } from "react";
import Glide from "@glidejs/glide";
import { Localhost } from "../../action/host/HostConnection";
import { Link } from "react-router-dom";

const OtherCard = ({data ,lodding}) => {
  useEffect(() => {
    if (!lodding) {
      const slider = new Glide(".glide-08", {
        type: "carousel",
        focusAt: 1,
        animationDuration: 4000,
        autoplay: 4500,
        autoplay: true,
        rewind: true,
        perView: 4,
        gap: 24,
        classes: {
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

  console.log('dother',data)
  const date_convart = (time) => {
    return new Date(time).toLocaleDateString();
  };
  const time_convart = (time) => {
    return new Date(time).toLocaleTimeString();
  };

  return (
    <>
      <div className="header">
        <h1 className="mt-12 mb-4 text-3xl font-bold text-center text-[#25a267]">
          Our Specializations
        </h1>
      </div>
      {/*<!-- Component: Testimonial carousel --> */}
      <div className="relative max-w-screen-xl px-4 mx-auto glide-08">
        {/*    <!-- Slides --> */}
        <div data-glide-el="track" className="overflow-hidden">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-[300px] overflow-hidden p-0 pb-12">
            {data.map((item, index) => (
              <Link to={`/service/details/${item._id}`}>
                <li key={index}>
                  {/*<!-- Component: Basic blog card --> */}
                  <div className="overflow-hidden bg-white rounded shadow-md text-slate-500 shadow-slate-200">
                    {/*  <!-- Image --> */}
                    <figure>
                      <img
                        src={Localhost + `/images/services/${item.image}`}
                        alt="card image"
                        className="hover:scale-110 transition-all ease-linear duration-1000 aspect-video w-[100%]"
                      />
                    </figure>
                    {/*  <!-- Body--> */}
                    <div className="p-2">
                      <header className="mb-2">
                        <h3 className="text-xl font-medium truncate text-slate-700">
                          {item.name.substring(0,30)}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {" "}
                          By George, <span>
                            {date_convart(item.updatedAt)}
                          </span>{" "}
                          - <span>{time_convart(item.updatedAt)}</span>
                        </p>
                      </header>
                      <p className="line-clamp-2">
                      {item.description.substring(0,80)}
                      </p>
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
          className="flex items-center justify-center w-full gap-2 -mt-6"
          data-glide-el="controls[nav]"
        >
          <button
            className="p-4 group"
            data-glide-dir="=0"
            aria-label="goto slide 1"
          >
            <span className="block w-2 h-2 transition-colors duration-300 rounded-full bg-white/20 opacity-70 ring-1 ring-slate-700 focus:outline-none"></span>
          </button>
          <button
            className="p-4 group"
            data-glide-dir="=1"
            aria-label="goto slide 2"
          >
            <span className="block w-2 h-2 transition-colors duration-300 rounded-full bg-white/20 opacity-70 ring-1 ring-slate-700 focus:outline-none"></span>
          </button>
          <button
            className="p-4 group"
            data-glide-dir="=2"
            aria-label="goto slide 3"
          >
            <span className="block w-2 h-2 transition-colors duration-300 rounded-full bg-white/20 opacity-70 ring-1 ring-slate-700 focus:outline-none"></span>
          </button>
        </div>
      </div>
      {/*<!-- End Testimonial carousel --> */}
    </>
  );
};
export default OtherCard;
