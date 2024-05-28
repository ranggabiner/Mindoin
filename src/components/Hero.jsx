import React from "react";

const Hero = () => {
  return (
    <div className="w-full h-[600px] relative">
      <img
        src="/heros/food-large.jpg"
        className="absolute object-cover w-full h-full "
      />{" "}
      <div className="absolute flex px-4 flex-col gap-4 -translate-y-1/2 top-1/2 left-1/2 -translate-x-1/2">
        <p className="text-primary font-bold text-3xl text-center">
        A Platform that Helps You Find the Best Betawi Food and Restaurant Places
        </p>
        <a
          href="#main"
          className="bg-primary w-fit px-4 py-2 rounded-lg text-white font-bold mx-auto"
        >
          Let's Find Out{" "}
        </a>
      </div>
    </div>
  );
};

export default Hero;
