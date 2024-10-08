import React from "react";
import Logo from "./Logo";
import Menu from "./Menu";
import Right from "./Right";

const Navbar = () => {
  return (
    <>
      <div className="bg-blue-800 text-white text-sm text-center py-2.5 italic">Explore the Top-Performing and Innovative Tires of 2024</div>
      <nav className="py-2.5 sticky top-0 z-50 bg-white shadow" role="navigation">
        <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex justify-center items-center gap-16">
              <Logo />
              <Menu />
            </div>
            <div>
              <Right />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
