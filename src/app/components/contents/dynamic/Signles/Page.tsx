import { Frank_Ruhl_Libre } from "next/font/google";
import React from "react";
import RecentPosts from "../Sidebar/RecentPosts";
import SideNewsletter from "../Sidebar/Newsletter";
import About from "../Sidebar/About";

const frank = Frank_Ruhl_Libre({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-old-standard-tt",
});

interface pageProps {
  page: {
    title: string;
    content: string;
    slug: string;
  };
}

export default function pagePage({ page }: pageProps) {
  return (
    <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto mt-16 mb-16">
      <div className="lg:flex gap-16">
        <div className="lg:w-9/12 lg:border-r-[1px] lg:border-slate-200 lg:pr-10">
          <article>
            <h1
              className={`${frank.className} text-2xl md:text-4xl text-blue-950 mb-10 text-center decoration-pink-600 underline`}
            >
              {page.title}
            </h1>
          </article>
          <section>
            <p
              className="post_content text-slate-800 text-[17px] tracking-[.2px] leading-[1.5] mb-8"
              dangerouslySetInnerHTML={{ __html: page.content }}
            ></p>
          </section>
        </div>
        <div className="lg:w-3/12">
          <About />
          <SideNewsletter />
          <RecentPosts />
        </div>
      </div>
    </div>
  );
}
