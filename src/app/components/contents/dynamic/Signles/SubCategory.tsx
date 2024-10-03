import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Vidaloka } from "next/font/google";
import { GoChevronRight, GoPlus } from "react-icons/go";
import { RxDividerVertical } from "react-icons/rx";
import { blog_articles } from "@/apis/graphql/articles";
import { formatSlug } from "@/tools/formatSlug";

const vidaloka = Vidaloka({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-old-standard-tt",
});

interface Post {
  title: string;
  slug: string;
  content: string;
  date: string;
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    } | null;
  } | null;
}

interface SubCategoryProps {
  category: {
    name: string;
    description: string;
    slug: string;
    featuredImage: {
      node: {
        sourceUrl: string;
        altText: string;
      } | null;
    } | null;
    parentSlug: string;
    posts: {
      nodes: Post[];
    };
  };
}

const truncateContent = (content: string, maxLength: number): string => {
  if (!content) return "";

  const truncated = content.slice(0, maxLength);
  return truncated.length < content.length ? `${truncated}...` : truncated;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

export default async function SubCategoryPage({ category }: SubCategoryProps) {
  const posts = blog_articles();
  return (
    // <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto md:px-6 px-5 2xl:px-0 mt-24 mb-24">

    //   <h1 className={`${anton.className} text-5xl md:text-6xl lg:text-7xl font-bold xl:text-7xl mb-6 text-blue-950 uppercase text-center decoration-lime-400 underline`}>{category.name}</h1>
    //   <div className="flex justify-center items-center mb-16">
    //     <p className="max-w-[900px] font-medium text-lg text-center text-zinc-900">{category.description}</p>
    //   </div>

    //   <h2 className={`${anton.className} text-3xl lg:text-4xl text-zinc-900 font-bold uppercase mb-8 border-l-[6px] border-lime-300 pl-2`}>Featured Guides</h2>
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    //   {category.posts.nodes.map((post) => (
    //     <div key={post.slug} className="w-full">
    //       <Link href={`/${post.slug}`}>
    //         {post.featuredImage && post.featuredImage.node && (
    //           <Image
    //             src={post.featuredImage.node.sourceUrl}
    //             alt={post.featuredImage.node.altText || post.title}
    //             width={300}
    //             height={200}
    //             className="w-full object-cover mb-2 rounded-lg"
    //           />
    //         )}
    //         <h3 className="text-xl text-blue-950 font-semibold hover:text-blue-600">
    //           {post.title}
    //         </h3>
    //       </Link>
    //     </div>
    //   ))}
    // </div>
    // </div>
    <>
      <div className="bg-slate-50 py-2">
        <nav className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto">
          <ol className="flex justify-start items-center gap-2">
            <li>
              <Link
                href="/"
                className="text-slate-800 transition-all hover:text-blue-950 font-semibold text-sm"
              >
                Home
              </Link>
            </li>
            <li>
              <GoChevronRight className="text-slate-400" />
            </li>
            <li className="text-slate-800 transition-all hover:text-blue-950 font-semibold text-sm">
              <Link href={`/${category.parentSlug}`}>
                {formatSlug(category.parentSlug)}
              </Link>
            </li>
            <li>
              <GoChevronRight className="text-slate-400" />
            </li>
            <li className="text-slate-800 transition-all hover:text-blue-950 font-semibold text-sm">
              {category.name}
            </li>
          </ol>
        </nav>
      </div>
      <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto mt-16 mb-16">
        <div className="lg:flex gap-16">
          <div className="lg:w-9/12">
            <h1
              className={`${vidaloka.className} text-5xl md:text-6xl capitalize lg:text-6xl font-bold text-left mb-3 text-blue-950 decoration-[#${process.env.NEXT_PUBLIC_SECONDARY_COLOR}] underline`}
            >
              {category.name}
            </h1>
            <p className="text-sm text-zinc-600 mb-3.5">
              When you purchase through links on our site, we may earn an
              affiliate commission.{" "}
              <Link href="/about-us" className="text-blue-500 underline">
                Here&apos;s how it works.
              </Link>
            </p>
            <p className="max-w-[900px] text-left font-medium text-md text-zinc-900 mb-6">
              {category.description}
            </p>

            <div className="columns-1 sm:columns-2 lg:columns-2 xl:columns-2 gap-6 space-y-5">
              {category.posts.nodes.map((post) => (
                <div
                  key={post.slug}
                  className="break-inside-avoid bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <Link href={`/${post.slug}`}>
                    <Image
                      src={post.featuredImage?.node?.sourceUrl!}
                      alt={post.title}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                  </Link>
                  <div className="flex justify-center items-center">
                    <Link
                      href={`/${post.slug}`}
                      className={`h-14 w-14 bg-white transition-all hover:bg-[#${process.env.NEXT_PUBLIC_SECONDARY_COLOR}] text-blue-950 hover:text-white rounded-full shadow-md -mt-7 flex justify-center items-center`}
                    >
                      <GoPlus className="size-8" />
                    </Link>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-start items-center gap-1.5 my-3">
                      <Link
                        href={`${category.slug}`}
                        className={`text-slate-800 hover:underline hover:decoration-[#${process.env.NEXT_PUBLIC_SECONDARY_COLOR}]`}
                      >
                        {category.name}
                      </Link>
                      <span>
                        <RxDividerVertical className="text-slate-300" />
                      </span>
                      <p className="text-slate-800">{formatDate(post.date)}</p>
                    </div>
                    <Link href={`/${post.slug}`}>
                      <h2
                        className={`${vidaloka.className} text-xl font-bold mb-3 text-blue-950`}
                      >
                        {post.title}
                      </h2>
                    </Link>
                    <p
                      className="text-gray-600"
                      dangerouslySetInnerHTML={{
                        __html: truncateContent(post.content, 100),
                      }}
                    ></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-3/12">
            <div className="">
              {/* Newsletter Start */}
              <div className="mb-8">
                <h3
                  className={`${vidaloka.className} text-blue-950 italic text-3xl font-bold py-3.5 border-y-2 border-slate-200 mb-2`}
                >
                  Stay Connected
                </h3>
                <p className="text-slate-600 mb-4">
                  Subscribe to our newsletter for the latest news, updates, and
                  exclusive offers.
                </p>
                <form action="">
                  <input
                    type="email"
                    className="w-full text-blue-950 font-semibold text-md bg-slate-100 rounded py-3.5 px-4 mb-2"
                    placeholder="Enter your email"
                  />
                  <button
                    className={`w-full bg-[#${process.env.NEXT_PUBLIC_PRIMARY_COLOR}] text-white capitalize font-semibold rounded text-md py-3.5`}
                  >
                    Get Updates
                  </button>
                </form>
                <p className="text-xs text-slate-800 mt-2">
                  By submitting your information you agree to the{" "}
                  <Link href="/terms-of-conditions" className="text-blue-500">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="text-blue-500">
                    Privacy Policy
                  </Link>{" "}
                  and are aged 16 or over.
                </p>
              </div>
              {/* Newsletter End */}
              <section className="mb-8 sticky top-[100px]">
                <h2
                  className={`${vidaloka.className} text-blue-950 italic text-3xl font-bold py-3.5 border-y-2 border-slate-200 mb-4`}
                >
                  Recent Posts
                </h2>
                {(await posts).length > 0 ? (
                  <div>
                    <ol className="list-none space-y-4">
                      {(await posts).slice(0, 1).map((post, index) => (
                        <li key={post.slug} className="mb-4">
                          <div className="relative">
                            <Image
                              src={post.featuredImage?.node?.sourceUrl!}
                              alt={post.title}
                              width={400}
                              height={300}
                              className="w-full h-auto object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black/75 p-2">
                              <div className="flex justify-start items-center gap-2">
                                <span
                                  className={`${vidaloka.className} text-3xl font-bold text-[#${process.env.NEXT_PUBLIC_TERTIARY_COLOR}]`}
                                >
                                  {index + 1}
                                </span>
                                <Link
                                  href={`/${post.slug}`}
                                  className="text-white capitalize leading-[21px] font-semibold text-md"
                                >
                                  {truncateContent(post.title, 50)}
                                </Link>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                      {(await posts).slice(1, 5).map((post, index) => (
                        <li
                          key={post.slug}
                          className="flex items-center space-x-2 border-slate-200 border-b-[1px] pb-2"
                        >
                          <span
                            className={`${vidaloka.className} text-3xl font-bold text-[#${process.env.NEXT_PUBLIC_PRIMARY_COLOR}]`}
                          >
                            {index + 2}
                          </span>
                          <Link
                            href={`/${post.slug}`}
                            className="flex-1 font-semibold text-md text-blue-950 capitalize text-base hover:underline"
                          >
                            {truncateContent(post.title, 50)}
                          </Link>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : (
                  <p>No posts found.</p>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
