import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { Localhost } from "../../action/host/HostConnection";


const CreateClientProfile = ({initialData,handleCloseModal,handleSaveProfile}) => {
  const [username,setUsername] =useState(initialData?.username)
  const [area,setArea] =useState(initialData?.area)
  const [address,setAddress] =useState(initialData?.address)
  const [profile_description,setProfileDescription] =useState(initialData?.profile_description)
  const [avatar,setAvatar] =useState('')
  const [showavatar,setShowAvatar] =useState(initialData?.avatar);

  const handleSubmit = (e) => {
    e.preventDefault();
    const myfrom = new FormData();
    myfrom.set('username',username);
    myfrom.set('address',address);
    myfrom.set('area',area);
    myfrom.set('profile_description',profile_description);
    if(avatar){
      myfrom.set('avatar',avatar)
    }
    handleSaveProfile(myfrom);
  };

  return (
    <div className="py-10 pt-36 md:pb-20 md:mt-0 flex justify-center items-center fixed left-0 top-0 z-[1055] bg-black bg-opacity-65 h-full w-full overflow-y-auto overflow-x-hidden outline-none">
      <div className="bg-white shadow-2xl md:mt-0 mt-[30%] rounded-xl p-8 w-full md:w-3/4 lg:w-1/2">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-serif font-extrabold text-gray-800 mb-4">
            Create Client Profile
          </h1>
          <button onClick={handleCloseModal} className="text-3xl text-red-600">
            <MdClose />
          </button>
        </div>
        <p className="text-gray-500 mb-8">
          Fill out the form below to create your profile.
        </p>

        <form onSubmit={handleSubmit}>
          {/* Profile Image Upload */}
          <div className="flex justify-center mb-6">
            <div className="relative w-36 h-36 bg-gray-200 rounded-full overflow-hidden">
              {avatar? (
                <img
                 src={avatar && URL.createObjectURL(avatar)}
                  className="object-cover w-full h-full"
                />
              ) : (
                <img
                  src={Localhost + `/images/avatars/${showavatar}`}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              )}

              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                
                <label className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
                    fill="none"

                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
                    ></path>
                  </svg>
                  <input
                    onChange={(e)=>setAvatar(e.target.files[0])}
                    type="file"
                    // id="avatar"
                    name="avatar"
                    hidden
                  />
                </label>
              </div>
            </div>
          </div>
          <p className="text-center text-gray-500 mb-6">Upload Profile Image</p>

          {/* User Name */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              User Name
            </label>
            <input
              onChange={(e)=>setUsername(e.target.value)}
              type="text"
              id="userName"
              name="username"
              value={username}
              className="w-full p-4 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Area and Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="area">
                Area
              </label>
              <input
                onChange={(e)=>setArea(e.target.value)}
                type="text"
                id="area"
                name="area"
                value={area}
                className="w-full text-black p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your area"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="address">
                Address
              </label>
              <input
                  onChange={(e)=>setAddress(e.target.value)}
                type="text"
                id="address"
                name="address"
                value={address}
                className="w-full text-black p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your address"
              />
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={profile_description}
              onChange={(e)=>setProfileDescription(e.target.value)}
              className="w-full text-black p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a description"
            ></textarea>
          </div>

          {/* Save Button */}
          <div>
            <button
              type="submit"
              className="w-full py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClientProfile;