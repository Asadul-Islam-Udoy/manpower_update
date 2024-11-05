import React, { useState } from "react";
import { AddressInfoBookingCardAction } from "../../action/auth_user/ServicesBookingCartAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
const ServiceForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name,
      phone,
      area,
      state,
      city,
      address,
    };
    dispatch(AddressInfoBookingCardAction(obj));
    navigate("/service/booking/details");
  };

  return (
    <div className="p-4 pb-1 bg-white md:p-12">
      <div className="mx-auto w-full border max-w-[500px] bg-transparent p-6 rounded-lg">
        <h1 className="mb-3 text-3xl font-bold text-center text-orange-300">
          Your Information
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-3 font-serif block text-base font-medium text-[#07074D]"
            > 
              Full Name <sup>*</sup>
            </label>
            <div className="flex border-b-[1px]  rounded-md items-center justify-center">
            <BadgeIcon style={{color:'white'}} />
            <input
              type="text"
              name="name"
              required
              id="name"
              placeholder="Enter your full name"
              className="w-full px-1 py-3 font-serif text-base text-white bg-transparent outline-none focus:shadow-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="mb-3 font-serif block text-base font-medium text-[#07074D]"
            >
              Phone Number<sup>*</sup>
            </label>
            <div className="flex border-b-[1px] rounded-md items-center justify-center">
              <PhoneIcon style={{color:'white'}} />
              <input
                type="text"
                name="phone"
                required
                id="phone"
                placeholder="Enter your phone number"
                className="w-full    bg-transparent py-3 px-1 text-base font-serif text-[white] outline-none "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-5">
            <div className="mb-5">
              <label
                htmlFor="state"
                className="mb-3 font-serif block text-base font-medium text-[#07074D]"
              >
                Address<sup>*</sup>
              </label>
              <div className="flex border-b-[1px] rounded-md items-center justify-center">
              
              <AccountBalanceIcon style={{color:'white'}} />
              <input
                type="text"
                required
                name="state"
                id="state"
                placeholder="Enter your address"
                className="w-full  bg-transparent py-3 px-1 text-base font-serif text-[white] outline-none "
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="area"
              className="mb-3 block font-serif text-base font-medium text-[#07074D]"
            >
              Area<sup>*</sup>
            </label>
            <div className="flex border-b-[1px] rounded-md items-center justify-center">
            
            < AddHomeWorkIcon style={{color:'white'}} />
            <input
              type="text"
              required
              name="area"
              id="area"
              placeholder="Enter your area"
              className="w-full  bg-transparent py-3 px-1 text-base font-serif text-[white] outline-none "
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="area"
              className="mb-3 block text-base font-serif font-medium text-[#07074D]"
            >
              State<sup>*</sup>
            </label>
           <div className="flex border-b-[1px] rounded-md items-center justify-center">
            <AddBusinessIcon style={{color:'white'}} />
            <input
              type="text"
              required
              name="state"
              id="state"
              placeholder="Enter your state"
              className="w-full bg-transparent py-3 px-1 text-base font-serif text-[white] outline-none "
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
            </div>
          </div>

          <div className="mb-5">
            <label
              htmlFor="city"
              className="mb-3 block text-base font-serif font-medium text-[#07074D]"
            >
              City<sup>*</sup>
            </label>
            <div className="flex border-b-[1px] rounded-md items-center justify-center">
            <BusinessIcon style={{color:'white'}} />
            <input
              type="text"
              name="city"
              required
              id="city"
              placeholder="Enter your city"
              className="w-full  bg-transparent py-3 px-1 text-base font-serif text-[white]] outline-none "
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            </div>
          </div>
          <button
            type="submit"
            className="hover:shadow-form w-full rounded-sm hover:bg-gray-300 bg-[white] font-serif transition-all text-orange-400  py-[10px] px-4 text-center text-base font-semibold  outline-none"
          >
            Book Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
