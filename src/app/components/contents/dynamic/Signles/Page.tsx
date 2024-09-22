import { Vidaloka } from "next/font/google";
import React from "react";
// import Aboutme from "../../static/Sidebar/Aboutme";
// import Newsletter from "../../static/Sidebar/Newsletter";
// import RecentPosts from "../../static/Sidebar/RecentPosts";

const vidaloka = Vidaloka({
  subsets: ["latin"],
  weight: "400",
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
              className={`${vidaloka.className} text-2xl text-left md:text-4xl text-zinc-950 mb-10 decoration-emerald-500 underline`}
            >
              {page.title}
            </h1>
            <div
              className="post_content text-zinc-800 font-normal text-lg"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </article>
        </div>
        <div className="lg:w-3/12">
          {/* <Aboutme />
          <Newsletter />
          <RecentPosts /> */}
        </div>
      </div>
    </div>
  );
}
