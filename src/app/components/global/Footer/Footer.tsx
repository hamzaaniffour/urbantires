import React from "react";
import Categories from "./UnselfLinks";
import QuickLinks from "./QuickLinks";
import Link from "next/link";
import {
    FaFacebookSquare,
    FaInstagramSquare,
    FaYoutubeSquare,
  } from "react-icons/fa";
  import { FaSquareXTwitter } from "react-icons/fa6";
import Newsletter from "./Newsletter";

const Footer = () => {
  return (
    <div className="bg-white shadow-2xl py-10 pb-4">
      <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto">
        <div className="lg:flex gap-10">
          <div className="lg:w-4/12 mt-8 lg:mt-0">
            <h4 className="text-[21px] text-black font-bold -mb-3">Who We Are?</h4>
            <div className="bg-orange-200 h-[10px] max-w-[135px] mb-5"></div>
            <p className="text-md text-slate-500 mb-5">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Natus corporis, vel culpa optio, aspernatur magnam aperiam voluptatum rem quaer.</p>
            <div className="flex justify-start items-center gap-1.5">
                <span className="font-semibold text-sm uppercase">Let's be friends:</span>
                <ul className="flex justify-center items-center gap-1">
                <li>
                    <Link href="/">
                      <FaFacebookSquare className="size-7 text-zinc-950 transition-all duration-300 hover:text-amber-600" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <FaSquareXTwitter className="size-7 text-zinc-950 transition-all duration-300 hover:text-amber-600" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <FaYoutubeSquare className="size-7 text-zinc-950 transition-all duration-300 hover:text-amber-600" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/">
                      <FaInstagramSquare className="size-7 text-zinc-950 transition-all duration-300 hover:text-amber-600" />
                    </Link>
                  </li>
                </ul>
            </div>
          </div>
          <div className="lg:w-2/12 mt-8 lg:mt-0">
            <h4 className="text-[21px] text-black font-bold -mb-3">Unself Links</h4>
            <div className="bg-orange-200 h-[10px] max-w-[125px] mb-5"></div>
            <Categories />
          </div>
          <div className="lg:w-2/12 mt-8 lg:mt-0">
            <h4 className="text-[21px] text-black font-bold -mb-3">Quick Links</h4>
            <div className="bg-orange-200 h-[10px] max-w-[120px] mb-5"></div>
            <QuickLinks />
          </div>
          <div className="lg:w-4/12 mt-8 lg:mt-0">
            <h4 className="text-[21px] text-black font-bold -mb-3">Keep In Touch</h4>
            <div className="bg-orange-200 h-[10px] max-w-[140px] mb-5"></div>
            <p className="text-zinc-800 text-md">
              Stay informed about the latest trends in seating plans!
            </p>
            <div className="my-3">
              <Newsletter />
            </div>
            <p className="text-slate-600 text-sm">
              We will not send you spam. Unsubscribe at any time.
            </p>
          </div>
        </div>
        <div className="border-t-[1px] border-slate-200 my-2.5 pt-6 text-center mt-5">
            © 2024 <Link href="/" className="font-semibold">TastyEast</Link>. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
