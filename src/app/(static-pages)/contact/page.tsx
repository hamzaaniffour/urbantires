import React from "react";
import { Metadata } from "next";
import ContactUS from "@/app/components/contents/static/Pages/ContactUS"

export const metadata: Metadata = {
  title: {
    default: "Contact Us",
    template: "%s | QuickyGarden",
  },
  description: "",
};

const ContactUs = () => {
  return (
    <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6 pt-16">
      <ContactUS />
    </div>
  );
};

export default ContactUs;
