import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RxDividerVertical } from "react-icons/rx";
import { GoChevronRight, GoPlus } from "react-icons/go";
import RecentPosts from "../Sidebar/RecentPosts";
import About from "../Sidebar/About";
import SideNewsletter from "../Sidebar/Newsletter";
import { BsArrowRight } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { Frank_Ruhl_Libre } from "next/font/google";

const frank = Frank_Ruhl_Libre({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-old-standard-tt",
});

interface Post {
  title: string;
  slug: string;
  content: string;
  date: string;
  seo: {
    readingTime: number;
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    } | null;
  } | null;
}

interface CategoryProps {
  category: {
    name: string;
    description: string;
    categoryImage: string;
    slug: string;
    posts: {
      nodes: Post[];
    };
    children?: {
      nodes: {
        posts: { nodes: Post[] };
        name: string;
        slug: string;
        description: string;
      }[];
    };
  };
}

const truncateContent = (content: string, maxLength: number) => {
  if (content.length > maxLength) {
    return content.substring(0, maxLength) + "...";
  }
  return content;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

export default async function Category({ category }: CategoryProps) {
  const hasSubcategories =
    category.children?.nodes && category.children.nodes.length > 0;

  return (
    <main>
      <header className="bg-white py-2.5 !pb-[11px]">
        <nav className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto" aria-label="Breadcrumb">
          <ol className="flex justify-start items-center gap-2 !mb-0">
            <li>
              <Link
                href="/"
                className="text-slate-800 transition-all hover:text-blue-950 font-semibold text-sm"
              >
                Home
              </Link>
            </li>
            <li>
              <GoChevronRight className="text-slate-400" aria-hidden="true" />
            </li>
            <li className="text-slate-800 transition-all hover:text-blue-950 font-semibold text-sm" aria-current="page">
              {category.name}
            </li>
          </ol>
        </nav>
      </header>
      <section className="bg-blue-50 py-10 border-b-2 border-blue-100">
        <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto">
          <h1
            className={`text-4xl text-center md:text-5xl md:leading-[60px] text-blue-950 font-black mb-5 ${frank.className}`}
          >
            {category.name}
          </h1>
          <p className="text-slate-800 text-lg text-center max-w-4xl mx-auto">
            {category.description}
          </p>
        </div>
      </section>
      <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto mt-16 mb-16">
        <div className="lg:flex gap-12 mt-5">
          <section className="lg:w-9/12 lg:border-r-[2px] lg:border-slate-100 lg:pr-12">
            <h2
              className={`${frank.className} text-4xl -mb-3.5 text-blue-950 font-black relative z-30`}
            >
              Featured Articles
            </h2>
            <div className="h-2.5 bg-blue-200 mb-7 max-w-[280px]"></div>

            <div className="grid grid-cols-2 gap-2 md:gap-4">
              {category.posts.nodes.slice(0, 2).map((post) => (
                <article
                  key={post.slug}
                  className="col-span-1 relative bg-white shadow-md overflow-hidden"
                >
                  <Link href={`/${post.slug}`}>
                    <Image
                      src={post.featuredImage?.node?.sourceUrl!}
                      alt={post.featuredImage?.node?.altText!}
                      width={400}
                      height={280}
                      objectFit="cover"
                      className="w-full h-auto"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-xl text-white font-bold mb-1">
                        {post.title}
                      </h3>
                      <time dateTime={post.date} className="text-sm">{formatDate(post.date)}</time>
                    </div>
                  </Link>
                </article>
              ))}

              {category.posts.nodes.slice(2, 3).map((post) => (
                <article
                  key={post.slug}
                  className="col-span-2 relative bg-white shadow-md overflow-hidden"
                >
                  <Link href={`/${post.slug}`}>
                    <Image
                      src={post.featuredImage?.node?.sourceUrl!}
                      alt={post.featuredImage?.node?.altText!}
                      width={800}
                      height={500}
                      objectFit="cover"
                      className="w-full h-auto"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white bg-gradient-to-t from-black to-transparent">
                      <h3 className="text-3xl text-white font-bold mb-2">
                        {post.title}
                      </h3>
                      <time dateTime={post.date} className="text-sm">{formatDate(post.date)}</time>
                    </div>
                  </Link>
                </article>
              ))}
            </div>

            <div className="border-y-2 border-slate-200 my-12 py-3">
              <p className={`text-xl text-center text-blue-950 font-semibold`}>
                More About {category.name}
              </p>
            </div>

            <div>
              {category.posts.nodes.map((post) => (
                <article key={post.slug} className="mb-3">
                  <div className="container grid grid-cols-12 mx-auto bg-white shadow-md">
                    <div
                      className="bg-no-repeat bg-cover bg-center bg-gray-700 col-span-full lg:col-span-4"
                      style={{
                        backgroundImage: `url(${post.featuredImage?.node?.sourceUrl})`,
                      }}
                      role="img"
                      aria-label={post.featuredImage?.node?.altText || post.title}
                    ></div>
                    <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
                      <div className="flex justify-start">
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-200 font-semibold text-blue-700">
                          {category.name}
                        </span>
                      </div>
                      <h3 className="text-2xl font-semibold mt-3 text-blue-950">
                        {post.title}
                      </h3>
                      <p
                        className="flex-1 pt-2 text-slate-900"
                        dangerouslySetInnerHTML={{
                          __html: truncateContent(post.content, 110),
                        }}
                      ></p>
                      <Link
                        rel="noopener noreferrer"
                        href={`/${post.slug}`}
                        className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm text-blue-800"
                      >
                        <span className="animated-underline font-semibold underline decoration-blue-800 underline-offset-2">
                          Learn more{" "}
                          <BsArrowRight className="inline size-4 relative -top-[0.5px] ml-0.5" aria-hidden="true" />
                        </span>
                      </Link>
                      <footer className="flex items-center justify-between pt-2">
                        <div className="flex space-x-2">
                          <span className="self-center text-sm text-slate-700">
                            <FiUser className="inline size-4 relative -top-[1px]" aria-hidden="true" />{" "}
                            Easton Boehm
                          </span>
                        </div>
                        <time dateTime={post.date} className="text-xs text-slate-700">
                          {formatDate(post.date)}
                        </time>
                      </footer>
                    </div>
                  </div>
                  <div className="border-b-[1px] border-slate-200 mb-3"></div>
                </article>
              ))}
            </div>
          </section>
          <aside className="lg:w-3/12">
            <About />
            <SideNewsletter />
            <RecentPosts />
          </aside>
        </div>
      </div>
    </main>
  );
}