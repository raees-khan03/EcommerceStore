import React from "react";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div className="px-4 sm:px-8 max-w-6xl mx-auto">
      {/* ── Page Heading ── */}
      <div className="text-2xl text-center pt-10 pb-2 border-t border-gray-200">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* ── Story Section ── */}
      <div className="my-14 flex flex-col md:flex-row gap-12 items-center">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[420px] rounded-sm object-cover shadow-sm"
          alt="About RK Store"
        />

        <div className="flex flex-col justify-center gap-5 md:w-1/2">
          <p className="text-gray-600 text-sm leading-7">
            Welcome to{" "}
            <span className="font-semibold text-gray-800">RK Store</span>, your
            one-stop destination for quality products at the best prices. We
            believe shopping should be simple, convenient, and enjoyable—right
            from your home. Our mission is to bring you the latest trends,
            trusted brands, and everyday essentials all in one place. With
            secure payments and fast delivery, we're here to make your shopping
            experience better every day.
          </p>
          <p className="text-gray-600 text-sm leading-7">
            Discover the joy of shopping with RK Store. We curate the latest
            styles, gadgets, and essentials from trusted brands worldwide. With
            fast delivery and secure payments, your favorite products are just a
            click away. Shop smart, shop easy, shop with confidence.
          </p>

          {/* Mission callout */}
          <div className="mt-2 border-l-4 border-gray-800 pl-5 py-1">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-800 mb-2">
              Our Mission
            </p>
            <p className="text-gray-600 text-sm leading-7">
              Our mission is to make online shopping simple, affordable, and
              accessible for everyone. We strive to deliver quality products,
              secure payments, and fast delivery—every time. Your satisfaction
              is at the heart of everything we do.
            </p>
          </div>
        </div>
      </div>

      {/* ── Why Choose Us ── */}
      <div className="text-2xl pt-4 pb-8">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 mb-24 border border-gray-200 rounded-sm overflow-hidden">
        {/* Card 1 */}
        <div className="group flex flex-col gap-4 px-10 py-12 border-b sm:border-b-0 sm:border-r border-gray-200 hover:bg-gray-50 transition-colors duration-200">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-900 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-800 tracking-wide">
            Quality Assurance
          </p>
          <p className="text-sm text-gray-500 leading-6">
            We guarantee top-quality products, carefully checked before reaching
            you. Our commitment: genuine products with uncompromised quality.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group flex flex-col gap-4 px-10 py-12 border-b sm:border-b-0 sm:border-r border-gray-200 hover:bg-gray-50 transition-colors duration-200">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-900 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-800 tracking-wide">
            Convenience
          </p>
          <p className="text-sm text-gray-500 leading-6">
            Shop anytime, anywhere with just a few clicks. We bring your
            favorite products straight to your doorstep with ease and speed.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group flex flex-col gap-4 px-10 py-12 hover:bg-gray-50 transition-colors duration-200">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-900 shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-800 tracking-wide">
            Exceptional Customer Service
          </p>
          <p className="text-sm text-gray-500 leading-6">
            Our commitment goes beyond selling products. We provide responsive,
            reliable, and friendly customer support at all times. Your
            satisfaction is what we stand for.
          </p>
        </div>
      </div>

      {/* ── Newsletter ── */}
      <NewsLetterBox />
    </div>
  );
};

export default About;
