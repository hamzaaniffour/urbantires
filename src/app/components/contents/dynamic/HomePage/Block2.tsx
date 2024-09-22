import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RxDividerVertical } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import SweetTreats from "../../../../public/assets/SweetTreats.jpeg";
import { blog_articles } from "@/apis/graphql/articles";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

const truncateContent = (content: string, maxLength: number) => {
  if (content.length > maxLength) {
    return content.substring(0, maxLength) + "...";
  }
  return content;
};

const PopularRecipes = async () => {
  const posts = await blog_articles();

  return (
    <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto mb-20">
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-violet-950 font-bold mb-5 text-3xl text-center uppercase">
          Popular{" "}
          <span className="bg-amber-600 rounded text-white px-2 py-0.5">
            Recipes
          </span>
        </h2>
        <p className="text-slate-400 max-w-[600px] text-center mb-8">
          From breakfast to dinner, explore a variety of easy-to-follow recipes
          that bring bold flavors to your table without the hassle.
        </p>
        {posts.length > 0 ? (
          <section className="columns-1 sm:columns-2 lg:columns-2 xl:columns-3 gap-6 space-y-5">
            {posts.map((post) => (
              <div
                className="break-inside-avoid bg-white shadow-md overflow-hidden"
                key={post.slug}
              >
                <Link href={`/${post.slug}`}>
                  <Image
                    src={post.featuredImage?.node?.sourceUrl!}
                    alt={post.title}
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
                    <p className="text-sm text-slate-500">{formatDate(post.date)}</p>
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
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default PopularRecipes;
