import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ClientlogoutAction } from "../../action/auth_user/UserAction";

export default function MenuCustomList({ clientInfo }) {
  const [openMenu, setOpenMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(ClientlogoutAction());
  };
  return (
    <>
      <div class="flex items-center gap-10 justify-center relative">
        <Link
          onClick={() => setOpenMenu((pre) => !pre)}
          class=" bg-gray-200 rounded-md px-3.5 py-2 m-1 overflow-hidden relative group cursor-pointer border-2 font-medium border-[#25a267] text-[#25a267] "
        >
          <span class="absolute  w-64 h-0 transition-all duration-300 origin-center rotate-45 -translate-x-20 bg-[#25a267] top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
          <span class="relative text-[#25a267] transition duration-300 group-hover:text-white ease">
            Dashboard
          </span>
        </Link>
        {openMenu && (
          <div className="w-auto absolute  text-gray-400 italic flex rounded-md flex-col  bg-white mt-32 p-3">
            <Link
              to={`/user/profile/${clientInfo?.user?._id}`}
              className="m-1 bg-white hover:bg-sky-100 hover:text-black hover:rounded-sm border pl-4 pr-4"
            >
              profile
            </Link>
            <Link
              onClick={logoutHandler}
              className="m-1 bg-white hover:bg-sky-100 hover:text-black border pl-4 pr-4"
            >
              logout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
