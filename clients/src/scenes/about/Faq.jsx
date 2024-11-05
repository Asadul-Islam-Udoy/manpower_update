import React, { useState } from "react";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };
  const faq = [
    {
      question: "How can I get started?",
      answer:
        "Getting started is easy! Sign up for an account, and you'll have access to our platform's features. No credit card required for the initial signup.",
    },
    {
      question: "What is the pricing structure?",
      answer:
        "Our pricing structure is flexible. We offer both free and paid plans. You can choose the one that suits your needs and budget.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We offer comprehensive customer support. You can reach out to our support team through various channels, including email, chat, and a knowledge base.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time without any hidden fees. We believe in providing a hassle-free experience for our users.",
    },
  ];

  return (
    <section className="py-10 sm:py-16">
      <div className="">
        <div className="max-w-screen-xl px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold leading-tight text-[#25a267] dark:text-black sm:text-4xl lg:text-5xl">
            Explore Common Questions
          </h2>
        </div>
        <div className="max-w-screen-xl px-4 mx-auto mt-8 space-y-4 md:mt-16">
          {faq.map((item, index) => (
            <div
              key={index}
              className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50"
            >
              <button
                type="button"
                onClick={() => toggleQuestion(index)}
                className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
              >
                <span className="flex text-lg font-semibold text-black">
                  {item.question}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`w-6 h-6 text-gray-400 transform transition-transform duration-200 ${
                    openQuestion === index ? "rotate-0" : "-rotate-180"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                style={{ display: openQuestion === index ? "block" : "none" }}
                className="px-4 pb-5 sm:px-6 sm:pb-6"
              >
                <p className="text-gray-400">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center text-[#25a267] text-base mt-9">
          Still have questions?
          <span className="font-medium transition-all duration-200 cursor-pointer text-tertiary hover:text-tertiary focus:text-tertiary hover-underline">
            Contact our support
          </span>
        </p>
      </div>
    </section>
  );
};

export default FAQ;
