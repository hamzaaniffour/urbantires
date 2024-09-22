import React from "react";
import { Frank_Ruhl_Libre } from "next/font/google";
import NewsForm from "@/app/components/contents/static/Sidebar/NewsForm";
import Link from "next/link";

const frank = Frank_Ruhl_Libre({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-old-standard-tt",
});

const SideNewsletter = async () => {
  return (
    <div className="mb-8">
      <h2
        className={`${frank.className} text-3xl md:leading-[60px] -mb-6 text-black font-black relative z-30`}
      >
        Newsletter
      </h2>
      <div className="h-2 bg-orange-200 mb-5 max-w-[145px]"></div>
      <p className="text-slate-800 text-sm -mt-3 mb-3">
        Subscribe to our newsletter for the latest news, updates, and exclusive
        offers.
      </p>
      <div className="my-3">
        <NewsForm />
      </div>
      <p className="text-xs text-slate-800 mt-2">
        By submitting your information you agree to the{" "}
        <Link href="/terms-conditions" className="text-blue-500">
          Terms & Conditions
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="text-blue-500">
          Privacy Policy
        </Link>{" "}
        and are aged 16 or over.
      </p>
    </div>
  );
};

export default SideNewsletter;
