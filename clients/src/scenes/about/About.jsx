import React from "react";
import FAQ from "./Faq";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const About = () => {
  return (
    <>
      <Header />
      <div className="pt-24 bg-white md:pt-40">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center">
            <h1 className="text-center text-2xl md:text-5xl font-bold mb-16  text-[#25a267]   inline-block">
              Why Choose Us
            </h1>
          </div>
          <div className="flex justify-between px-6 overflow-hidden bg-hero">
            <div className="flex flex-col gap-5 md:gap-16 md:flex-row ">
              <div className="w-full md:w-3/4 ">
                <p className="text-[#25a267] font-medium mb-4">Our plans</p>
                <h1 className="mb-10 text-3xl font-bold text-[#25a267]">
                  Pick from our partnership plus <br /> service plans
                </h1>

                <ol class="">
                  <li class="flex space-x-2.5 rtl:space-x-reverse">
                    <span class="flex items-center justify-center w-10 h-10 border  rounded-full shrink-0 font-bold text-xl bg-[#25a267] text-white">
                      1
                    </span>
                    <span>
                      <h3 class="font-medium text-2xl text-[#25a267] leading-tight">
                        Enrichment Plan
                      </h3>
                      <p class="text-sm text-gray-400 pt-2 pb-4">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Obcaecati ipsam magni incidunt sapiente nemo
                        delectus voluptatem dolore placeat. Similique
                        dignissimos dolore itaque officia maiores voluptatum
                        veritatis odit nam corporis ullam, quibusdam adipisci
                        quae. Ab dolorem sint quasi delectus officia id?
                      </p>
                    </span>
                  </li>

                  <li class="flex space-x-2.5 rtl:space-x-reverse">
                    <span class="flex items-center justify-center w-10 h-10 border  rounded-full shrink-0 font-bold text-xl bg-[#25a267] text-white">
                      2
                    </span>
                    <span>
                      <h3 class="font-medium text-2xl text-[#25a267] leading-tight">
                        Corporate plan
                      </h3>
                      <p class="text-sm text-gray-400 pt-2 pb-4">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Obcaecati ipsam magni incidunt sapiente nemo
                        delectus voluptatem dolore placeat. Similique
                        dignissimos dolore itaque officia maiores voluptatum
                        veritatis odit nam corporis ullam, quibusdam adipisci
                        quae. Ab dolorem sint quasi delectus officia id?
                      </p>
                    </span>
                  </li>

                  <li class="flex space-x-2.5 rtl:space-x-reverse">
                    <span class="flex items-center justify-center w-10 h-10 border  rounded-full shrink-0 font-bold text-xl bg-[#25a267] text-white">
                      3
                    </span>
                    <span>
                      <h3 class="font-medium leading-tight text-[#25a267] text-2xl">
                        Full service plan
                      </h3>
                      <p class="text-sm text-gray-400 pt-2 pb-4">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Obcaecati ipsam magni incidunt sapiente nemo
                        delectus voluptatem dolore placeat. Similique
                        dignissimos dolore itaque officia maiores voluptatum
                        veritatis odit nam corporis ullam, quibusdam adipisci
                        quae. Ab dolorem sint quasi delectus officia id?
                      </p>
                    </span>
                  </li>
                </ol>
              </div>
              <div className="flex items-center w-full md:w-1/2 ">
                <img
                  className="h-[600px] md:w-[550px] w-full"
                  src="/images/worker2.avif"
                />
              </div>
            </div>
          </div>
        </div>
        <FAQ />
      </div>
      <Footer />
    </>
  );
};

export default About;
