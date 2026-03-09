import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex flex-row items-center justify-center gap-1">
      <h2 className="text-2xl sm:text-3xl">
        <span className="text-gray-400 font-normal">{text1} </span>
        <span className="text-gray-800 font-semibold">{text2}</span>
      </h2>
      <div className="flex items-center gap-2 mt-1">
        <p className="h-[1.5px] w-8 bg-gray-700"></p>
      </div>
    </div>
  );
};

export default Title;
