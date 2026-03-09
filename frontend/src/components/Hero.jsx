import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <section className="border-2 border-gray-100 flex flex-col sm:flex-row">
      {/* Text Content */}
      <div className="w-full sm:w-1/2 flex flex-col items-start justify-center px-6 sm:px-10 py-10 sm:py-16 order-2 sm:order-1">
        {/* Bestseller Label */}
        <div className="flex items-center gap-2 mb-3">
          <p className="h-[2px] w-8 sm:w-10 bg-gray-600"></p>
          <h2 className="text-sm sm:text-[18px] font-medium text-gray-700 tracking-widest">
            OUR BESTSELLER
          </h2>
        </div>

        {/* Heading */}
        <h1 className="prata-regular text-3xl sm:text-4xl lg:text-5xl text-gray-800 leading-snug mb-4">
          Latest Arrivals
        </h1>

        {/* Shop Now CTA */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <h2 className="text-sm sm:text-[18px] font-medium text-gray-700 tracking-widest group-hover:text-black transition-colors duration-200">
            SHOP NOW
          </h2>
          <p className="h-[1.5px] w-8 sm:w-10 bg-gray-600 transition-all duration-300 group-hover:w-16 group-hover:bg-black"></p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="w-full sm:w-1/2 order-1 sm:order-2">
        <img
          src={assets.hero_img}
          alt="Latest Arrivals"
          className="w-full h-64 sm:h-full object-cover object-top"
        />
      </div>
    </section>
  );
};

export default Hero;
