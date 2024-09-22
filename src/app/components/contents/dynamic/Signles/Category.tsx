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
    <>
      <div className="bg-white py-2.5 !pb-[11px]">
        <nav className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto">
          <ol className="flex justify-start items-center gap-2 !mb-0">
            <li>
              <Link
                href="/"
                className="text-slate-800 transition-all hover:text-black font-semibold text-sm"
              >
                Home
              </Link>
            </li>
            <li>
              <GoChevronRight className="text-slate-400" />
            </li>
            <li className="text-slate-800 transition-all hover:text-black font-semibold text-sm">
              {category.name}
            </li>
          </ol>
        </nav>
      </div>
      <div className="bg-orange-50 py-10 border-b-2 border-orange-100">
        <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto">
          <h1
            className={`text-4xl text-center md:text-5xl md:leading-[60px] text-black font-black mb-5`}
          >
            {category.name}
          </h1>
          <p className="text-slate-800 text-lg text-center max-w-4xl mx-auto">
            {category.description}
          </p>
          {/* <div className="lg:flex gap-20">
            <div className="lg:w-12/12">
              <div className="">
                {hasSubcategories && (
                  <div className="mb-8">
                    <p className="text-md font-semibold text-slate-800 mb-2 capitalize">
                      Our expert research will help you find the best
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {category?.children?.nodes.map((subCategory) => (
                        <Link
                          href={`${category.slug}/${subCategory.slug}`}
                          key={subCategory.slug}
                        >
                          <div
                            key={subCategory.slug}
                            className="bg-white border-[1px] border-slate-200 h-28 w-full flex justify-center items-center flex-col"
                          >
                            <div className="h-9 w-9 bg-slate-200 mb-2 rounded-full"></div>
                            <h2 className="font-semibold text-center text-[15px]">
                              {subCategory.name}
                            </h2>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto mt-16 mb-16">
        <div className="lg:flex gap-12 mt-5">
          <div className="lg:w-9/12 lg:border-r-[2px] lg:border-slate-100 lg:pr-12">
            <h3
              className={`text-4xl md:leading-[60px] text-black font-black relative z-30`}
            >
              Featured Articles
            </h3>
            <div className="h-2 bg-oranges-200 mb-0 max-w-[265px] relative -top-6"></div>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* First column with one large article */}
              {category.posts.nodes.slice(0, 1).map((post) => (
                <div
                  key={post.slug}
                  className="bg-white shadow-md overflow-hidden sm:col-span-3"
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
                  </Link>
                  <div className="flex justify-center items-center">
                    <Link
                      href={`/${post.slug}`}
                      className={`rounded-full h-20 w-20 bg-amber-600 border-[5px] border-white transition-all hover:bg-amber-500 text-white -mt-10 flex justify-center items-center`}
                    >
                      <GoPlus className="size-10" />
                    </Link>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-start items-center gap-1 mt-1 mb-4">
                      <Link
                        href="/about"
                        className={`animated-underline text-slate-800 text-sm font-semibold underline decoration-amber-600 underline-offset-2`}
                      >
                        Elisabeth Milner
                      </Link>
                      <span>
                        <RxDividerVertical className="text-slate-300" />
                      </span>
                      <p className="text-sm text-slate-500">
                        {formatDate(post.date)}
                      </p>
                    </div>
                    <Link href={`/${post.slug}`}>
                      <h2
                        className={`text-2xl leading-6 font-bold mb-3 text-black transition-all hover:text-amber-600 capitalize`}
                      >
                        {post.title}
                      </h2>
                    </Link>
                    <p
                      className="text-gray-600 text-[15px]"
                      dangerouslySetInnerHTML={{
                        __html: truncateContent(post.content, 180),
                      }}
                    ></p>
                  </div>
                </div>
              ))}
              {/* Second column with one large article */}
              {category.posts.nodes.slice(1, 8).map((post) => (
                <div
                  key={post.slug}
                  className="bg-white shadow-md overflow-hidden sm:col-span-1"
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
                  </Link>
                  <div className="flex justify-center items-center">
                    <Link
                      href={`/${post.slug}`}
                      className={`rounded-full h-20 w-20 bg-amber-600 border-[5px] border-white transition-all hover:bg-amber-500 text-white -mt-10 flex justify-center items-center`}
                    >
                      <GoPlus className="size-10" />
                    </Link>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-start items-center gap-1 mt-1 mb-4">
                      <Link
                        href="/about"
                        className={`animated-underline text-slate-800 text-sm font-semibold underline decoration-amber-600 underline-offset-2`}
                      >
                        Elisabeth Milner
                      </Link>
                      <span>
                        <RxDividerVertical className="text-slate-300" />
                      </span>
                      <p className="text-sm text-slate-500">
                        {formatDate(post.date)}
                      </p>
                    </div>
                    <Link href={`/${post.slug}`}>
                      <h2
                        className={`text-lg leading-6 font-bold mb-3 text-black transition-all hover:text-amber-600 capitalize`}
                      >
                        {post.title}
                      </h2>
                    </Link>
                    <p
                      className="text-gray-600 text-[15px]"
                      dangerouslySetInnerHTML={{
                        __html: truncateContent(post.content, 100),
                      }}
                    ></p>
                  </div>
                </div>
              ))}
            </section>

            <div className="border-y-2 border-slate-200 my-12 py-3">
              <p className={`text-xl text-center text-black font-semibold`}>
                More About {category.name}
              </p>
            </div>

            <section className="">
              {category.posts.nodes.map((post) => (
                <div key={post.slug}>
                  <div className="bg-slate-50 text-gray-50 mb-3">
                    <div className="container grid grid-cols-12 mx-auto bg-white shadow-md">
                      <div
                        className="bg-no-repeat bg-cover bg-center bg-gray-700 col-span-full lg:col-span-4"
                        style={{
                          backgroundImage: `url(${post.featuredImage?.node?.sourceUrl})`,
                        }}
                      ></div>
                      <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
                        <div className="flex justify-start">
                          <span className="px-2 py-1 text-xs rounded-full bg-amber-200 font-semibold text-amber-700">
                            {category.name}
                          </span>
                        </div>
                        <h3 className="text-2xl font-semibold mt-3 text-black">
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
                          className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm text-amber-600"
                        >
                          <span className="animated-underline font-semibold underline decoration-amber-600 underline-offset-2">
                            Learn more{" "}
                            <BsArrowRight className="inline size-4 relative -top-[0.5px] ml-0.5" />
                          </span>
                        </Link>
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex space-x-2">
                            <span className="self-center text-sm text-slate-700">
                              <FiUser className="inline size-4 relative -top-[1px]" />{" "}
                              Elizabeth Carter
                            </span>
                          </div>
                          <span className="text-xs text-slate-700">
                            {formatDate(post.date)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-b-[1px] border-slate-200 mb-3"></div>
                </div>
              ))}
            </section>
          </div>
          <div className="lg:w-3/12">
            <About />
            <SideNewsletter />
            <RecentPosts />
          </div>
        </div>
      </div>
    </>
  );
}
