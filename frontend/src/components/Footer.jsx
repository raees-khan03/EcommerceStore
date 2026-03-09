import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-20 border-t">
      {/* Main Footer Content */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 my-10 text-sm px-4">
        {/* Brand */}
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni velit
            ullam molestias quos aliquid eligendi, voluptates, eaque provident
            perspiciatis eos ea, totam iste! Mollitia labore dolorum
            exercitationem tenetur expedita facilis.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="mb-5 text-base font-semibold tracking-wide">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            {["Home", "About Us", "Delivery", "Privacy Policy"].map((item) => (
              <li
                key={item}
                className="cursor-pointer hover:text-black transition-colors duration-200 w-fit"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p className="mb-5 text-base font-semibold tracking-wide">
            GET IN TOUCH
          </p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+92 325 7422995</li>
            <li className="break-all">sraeeskhan03@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <p className="py-4 text-xs text-center text-gray-500">
          Copyright &copy; 2025 raees.com — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
