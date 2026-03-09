import React from "react";
import Title from "../Components/Title";
import { assets } from "../assets/assets";
import NewsLetterBox from "../Components/NewsLetterBox";

const Contact = () => {
  return (
    <div className="px-4 sm:px-8 max-w-6xl mx-auto">
      {/* ── Page Heading ── */}
      <div className="text-center text-2xl pt-10 pb-2 border-t border-gray-200">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* ── Main Section ── */}
      <div className="flex flex-col md:flex-row items-center gap-12 my-14 mb-28">
        {/* Image */}
        <img
          src={assets.contact_img}
          alt="Contact RK Store"
          className="w-full md:max-w-[420px] rounded-sm object-cover shadow-sm"
        />

        {/* Info */}
        <div className="flex flex-col justify-center gap-8 w-full md:w-1/2">
          {/* Store Info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <p className="font-semibold text-base text-gray-800">Our Store</p>
            </div>
            <p className="text-sm text-gray-500 leading-6 pl-9">
              Shahdara Lahore Station <br /> Street 7, Pakistan
            </p>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <p className="font-semibold text-base text-gray-800">
                Get In Touch
              </p>
            </div>
            <div className="pl-9 flex flex-col gap-1">
              <a
                href="tel:03257422995"
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors duration-150"
              >
                Tel: 0325-7422995
              </a>
              <a
                href="mailto:sraeeskhan03@gmail.com"
                className="text-sm text-gray-500 hover:text-gray-800 transition-colors duration-150"
              >
                Email: sraeeskhan03@gmail.com
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200" />

          {/* Careers */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="font-semibold text-base text-gray-800">
                Careers at RK Store
              </p>
            </div>
            <p className="text-sm text-gray-500 leading-6 pl-9">
              Learn more about our team and job openings. We're always looking
              for passionate people to join us.
            </p>
            <div className="pl-9">
              <button className="mt-1 px-8 py-3 text-sm font-medium border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 rounded-sm tracking-wide">
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Newsletter ── */}
      <NewsLetterBox />
    </div>
  );
};

export default Contact;
