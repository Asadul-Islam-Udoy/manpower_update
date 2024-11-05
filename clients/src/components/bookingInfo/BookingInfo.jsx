import React from "react";
import { FaHandPointRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const BookingInfo = () => {
  const location = useLocation();
  // const navigate = useNavigate();
  const { cart,  formData, selectedhour, price } = location.state;

  const handleEdit = () => {
    // navigate("/book-service"); 
  };

  const handleProceed = () => {
   
    // console.log("Proceed with booking:", cart, formData);
  }; 

  return (
    <div className="md:p-12 bg-gray-100 md:pt-36 pt-28 p-4 pb-14">
      <h1 className="text-3xl font-bold text-center mb-10">Review Your Booking</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mx-auto max-w-5xl">
        <h2 className="text-2xl font-semibold mb-6 text-center">Services Selected</h2>
        {cart.map((item, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-bold flex items-center gap-2"><FaHandPointRight />{item.title}</h3>
            {/* <p>{item.description}</p> */}
          </div>
        ))}
        <p className="mb-2"><strong>Selected Hour: </strong> {selectedhour} hours</p>
        <p className="mb-2"><strong>Service Price: </strong> {price} TK</p>

        <h2 className="text-2xl font-semibold mt-10 mb-6 text-center">Your Information</h2>
        <p className="mb-2"><strong>Full Name:</strong> {formData?.name}</p>
        <p className="mb-2"><strong>Phone Number:</strong> {formData.phone}</p>
        <p className="mb-2"><strong>Email:</strong> {formData.email}</p>
        <p className="mb-2"><strong>Date:</strong> {formData.date}</p>
        <p className="mb-2"><strong>Address:</strong> {`${formData.area}, ${formData.city}, ${formData.state}, ${formData.postCode}`}</p>

        <div className="flex justify-between mt-8">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Edit
          </button>
          <button
            onClick={handleProceed}
            className="bg-green-500 text-white py-2 px-4 rounded-lg"
          >
            Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingInfo