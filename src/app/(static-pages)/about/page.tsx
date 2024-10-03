import React from "react";
import { Metadata } from "next";
import Aboutme from "@/app/components/contents/static/Pages/Aboutme";

export const metadata: Metadata = {
  title: {
    default: "About Me",
    template: "%s | Tastyeats",
  },
  description: "",
  // twitter: {
  //   card: "summary_large_image",
  // },
};

const About = () => {
  return <Aboutme />;
};

export default About;
