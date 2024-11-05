import React from "react";
import Header from "../components/header/Header";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Lodder from "../components/lodder/Lodder";
function Test() {
  const cardData = [
    {
      img: "/images/gas.webp",
      alt: "image",
      title: "Gas Stove  Service",
    },
    {
      img: "/images/paint.webp",
      alt: "image",
      title: "Painting Services",
    },
    {
      img: "/images/plambing.webp",
      alt: "image",
      title: "Plumbing  Service",
    },
    {
      img: "/images/homecleaning.webp",
      alt: "image",
      title: "Home Cleaning Service",
    },
    {
      img: "/images/homeshifting.webp",
      alt: "image",
      title: "Home Shifting Service",
    },
    {
      img: "/images/plambing.webp",
      alt: "image",
      title: "Plumbing  Service",
    },
    {
      img: "/images/homecleaning.webp",
      alt: "image",
      title: "Home Cleaning Service",
    },
    {
      img: "/images/homeshifting.webp",
      alt: "image",
      title: "Home Shifting Service",
    },
  ];
  return (
    <>
      <div
        style={{ backgroundColor: "#436da7" }}
        className="min-h-screen overflow-hidden"
      >
        <Lodder />
        <Header />
        <div className="flex items-center flex-col justify-center  w-[100%] mt-20 ">
          <div className=" md:w-[50%] py-3 w-[100%] mt-7 flex items-center flex-col justify-center ">
            <h1 className="md:text-5xl text-4xl text-center p-2 font-serif">
              Our Suite of Workers Solutions
            </h1>
            <p className=" block  md:w-[80%] w-[75%]  text-center">
              Our comprehensive family of brands address the complex workforce
              challenges organizations face today, from contingent and permanent
              staffing to talent management, outsourcing, and talent
              development. We deliver the solutions that drive your business
              forward.
            </p>
          </div>
        </div>
        <div className=" w-full p-4  bg-slate-300"></div>
        <div class="flex flex-wrap justify-center m-1  w-full  ">
          {cardData?.map((item) => (
            <div class="p-4 max-w-sm">
              <div class="flex rounded-md h-full dark:bg-gray-800 bg-transparent p-8 flex-col hover:border-[0.3px] border-blue-400">
                <div class="flex items-center min-w-[200px] mb-3">
                  <div class="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full dark:bg-[#25a267] bg-[#25a267] text-white flex-shrink-0">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <h2 class="text-white dark:text-white text-lg font-medium">
                    {item.title}
                  </h2>
                </div>

                <div className="flex overflow-hidden rounded-full justify-center w-full transition-all">
                  <img
                    src={item.img}
                    className="rounded-full border h-48 w-48 hover:scale-110 transition-all ease-linear duration-1000"
                  />
                </div>
                <div class="flex flex-col justify-between py-1 flex-grow">
                  <div className="w-full py-1 rounded-full flex justify-center border">
                    <Stack spacing={1}>
                      <Rating
                        name="half-rating"
                        defaultValue={5}
                        precision={0.2}
                      />
                    </Stack>
                  </div>
                  <div className="flex w-[98%] py-1 justify-between">
                    <Link
                      to=""
                      className="mt-3 p-2 justify-center hover:bg-transparent hover:border hover:text-white transition-all ease-linear w-[48%] bg-white  text-black dark:text-white  inline-flex items-center"
                    >
                      View Profile
                    </Link>
                    <Link
                      to=""
                      class="mt-3 p-2 w-[48%] justify-center bg-white hover:bg-transparent hover:border hover:text-white transition-all ease-linear text-black dark:text-white  inline-flex items-center"
                    >
                      Add Worker
                    </Link>
                  </div>
                  <div className="w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Test;

{/* <div class="contacts-item">
<h3 class="contacts-title">
  <i class="fas fa-globe-americas"></i>
  Worker Is Free
</h3>
{userInfo?.user?.userType === "admin" ? (
  <div>
    {["YES", "NO"].map((i) => (
      <FormControlLabel
        label={i}
        control={
          <Checkbox
            {...label}
            color="secondary"
            onClick={() => isfreeHandler(singleworker?._id, i)}
            style={{
              backgroundColor:
                singleworker?.is_free == i ? "green" : "",
            }}
          />
        }
      />
    ))}
  </div>
) : (
  <div>
    <a href="http://www.robertsmith.com" class="contacts-text">
      {singleworker?.is_free}
    </a>
  </div>
)}
</div> */}