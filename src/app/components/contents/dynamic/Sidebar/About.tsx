import React from "react";
import { Frank_Ruhl_Libre } from "next/font/google";
import { author_details } from "@/apis/graphql/author";
import Image from "next/image";

const frank = Frank_Ruhl_Libre({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-old-standard-tt",
});

const truncateContent = (content: string, maxLength: number) => {
  if (content.length > maxLength) {
    return content.substring(0, maxLength) + "...";
  }
  return content;
};

const About = async () => {
  const author = await author_details();

  return (
    <div className="mb-8">
      <h2
        className={`${frank.className} text-3xl md:leading-[60px] -mb-6 text-blue-950 font-black relative z-30`}
      >
        About me
      </h2>
      <div className="h-2 bg-pink-200 mb-5 max-w-[135px]"></div>
      <div className="relative overflow-hidden flex justify-center items-start">
        <Image
          className="w-full object-contain"
          src={author!.avatar.url}
          alt={author!.name}
          width={0}
          height={0}
          quality={100}
          objectFit="contain"
          layout="responsive"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-pink-700/45 to-transparent opacity-75`}
        ></div>
      </div>
      <div className="mt-3">
        <p className="text-slate-800 text-[15px]">
          {truncateContent(author!.description, 200)}
        </p>
      </div>
    </div>
  );
};

export default About;
