import React from "react";
import { Localhost } from "../../action/host/HostConnection";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
function BookingWorker({ workersItems }) {
  return (
    <>
      <div className="bg-gradient-to-b  ">
        <div className="w-full mx-auto flex md:block flex-col justify-center items-center  py-10  gap-4">
          {workersItems?.length >0 &&
          <h1 className="text-2xl  w-[100%] md:w-[81%] text-center font-serif border-b-[1px] rounded-full">
            Your Services Workers
          </h1>
          }
          {workersItems?.map((item) => (
            <div className="bg-transparent my-5 border md:ml-10 shadow-sm inline-block m-2 min-w-60 h-36 p-2 rounded-lg border-t-4 border-blue-500 relative overflow-hidden">
              <div className="justify-center mb-4  relative">
                <div className="absolute top-1 right-0 left-[135px] border bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  <Link className=" text-[10px]" to={`/worker/Profile/${item?.user?._id}`}>history</Link>
                </div>
                <img
                  className="w-[40px] h-[40px] rounded-full border-2 border-blue-500 shadow-md"
                  src={Localhost + `/images/avatars/${item.avatar}`}
                  alt="worker profile image"
                />
              </div>
              <div>
                <Stack spacing={1}>
                  <Rating name="half-rating" defaultValue={5} precision={0.2} />
                </Stack>
              </div>
              <h2 className=" mt-3 ml-4 text-lg font-semibold text-gray-800">
                {item.username}
              </h2>
            </div>
          ))}
          {workersItems?.length<0 &&
              <h1 className="w-full md:ml-28 text-green-500">Don't  worry admin will be  create your servic worker! you can booking    </h1>
          }
       
        </div>
      </div>
    </>
  );
}

export default BookingWorker;
