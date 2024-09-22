"use client";
import React from "react";
import Image from "next/image";
import Recipe from "@/public/assets/Newsletter/recipe.jpeg";
import Popup from "./Popup";

const Newsletter = () => {
  const [popup, setPopup] = React.useState(false);

  const handleSubscribe = () => {
    setPopup(true);
  };

  return (
    <div className="py-16 bg-white mb-14">
      <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto">
        <div className="lg:flex">
          <div className="lg:w-6/12 bg-green-100 text-black font-bold text-center flex justify-center items-center">
            <div className="relative overflow-hidden">
              <Image
                className="w-full object-contain"
                src={Recipe}
                alt="Elizabeth Carter"
                width={0}
                height={0}
                quality={100}
                objectFit="cover"
                layout="responsive"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t from-amber-400/45 to-transparent opacity-75`}
              ></div>
            </div>
          </div>
          <div className="lg:w-6/12 bg-slate-50 px-10 py-8 lg:py-0 text-black font-bold text-center flex justify-center items-center flex-col">
            <h3
              className={`text-4xl md:text-5xl md:leading-[60px] text-center text-black font-black capitalize`}
            >
              Keep in Touch!
            </h3>
            <div className="flex justify-center items-center flex-col">
              <div className="max-w-[400px] mx-auto">
                <div className="h-1 bg-orange-200 my-6 w-[100px]"></div>
              </div>
              <div className="max-w-[400px] mx-auto">
                <p className="text-slate-600 text-md text-center mb-8 font-normal">
                  Sign up and I&#39;ll send you great tire care tips and driving
                  tips!
                </p>
                <button
                  onClick={handleSubscribe}
                  className="py-3 rounded bg-amber-600 text-white font-semibold w-full mb-2 uppercase"
                  type="button"
                >
                  Sign up for my emails
                </button>
                <span className="text-sm text-slate-500 font-normal text-center">
                  We will not send you spam. Unsubscribe at any time.
                </span>
              </div>
            </div>
          </div>
        </div>
        <Popup popup={popup} setPopup={setPopup} />
      </div>
    </div>
  );
};

export default Newsletter;
