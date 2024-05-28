import React from "react";

const Navbar = () => {
  return (
    <div className="h-[100px] fixed top-0 z-10 inset-0 shadow-lg bg-white  right-0 py-2/5 px-12 flex justify-between items-center">
      <a href="/" className="block h-full">
        <img src="/icons/Logo8(500).png" className="h-full " />
      </a>
      <div className="hidden sm:flex justify-between w-[60%] max-w-[500px]">
        <a href="/" className="text-primary text-xl font-bold">
          Home
        </a>
        <a href="/catalogue" className="text-primary text-xl font-bold">
          Catalogue
        </a>
        <a href="/favorite" className="text-primary text-xl font-bold">
          Favorite
        </a>
        <a
          href="https://www.linkedin.com/in/julia-dinda-591930285"
          className="text-primary text-xl font-bold"
        >
          About Us
        </a>
      </div>
    </div>
  );
};

export default Navbar;
