import React from "react";
import Logo from "./img/logo.png";
import { MdShoppingBasket } from "react-icons/md";

const Header = () => {
  return (
    <header className="fixed z-50 w-screen p-6 px-16">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <div className="flex items-center justify-center gap-2">
          <img src={Logo} alt="logo" className="w-10 object-cover" />
          <p className="text-headingColor text-xl font-bold">E-Canteen</p>
        </div>

        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer cursor-pointer hover:text">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer cursor-pointer hover:text">
              Menu
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer cursor-pointer hover:text">
              About Us
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer cursor-pointer hover:text">
              Service
            </li>
          </ul>

          <div className="relative flex items-center justify-center">
            <MdShoppingBasket className="text-textColor text-2xl ml-8 cursor-pointer" />
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>
        </div>
      </div>

      {/* mobile  */}
      <div className="flex md:hidden w-full h-full "></div>
    </header>
  );
};

export default Header;