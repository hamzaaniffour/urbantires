import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RxDividerVertical } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
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
  return content.length > maxLength ? `${content.substring(0, maxLength)}...` : content;
};

const PopularRecipes = async () => {
  const posts = await blog_articles();

  return (
    <section className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto mb-20" aria-label="Popular Recipes Section">
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-violet-950 font-bold mb-5 text-3xl text-center uppercase">
          Featured{" "}
          <span className="bg-blue-800 font-semibold rounded text-white py-0.5 px-2">Articles</span>
        </h2>
        <p className="text-slate-400 max-w-[600px] text-center mb-8">
          From breakfast to dinner, explore a variety of easy-to-follow recipes that bring bold flavors to your table without the hassle.
        </p>
        {posts.length > 0 ? (
          <section className="columns-1 sm:columns-2 lg:columns-2 xl:columns-3 gap-6 space-y-5">
            {posts.map((post) => (
              <div className="break-inside-avoid bg-white shadow-md overflow-hidden" key={post.slug}>
                <Link href={`/${post.slug}`} aria-label={`View recipe: ${post.title}`}>
                  <Image
                    src={post.featuredImage?.node?.sourceUrl!}
                    alt={`Featured image for ${post.title}`}
                    width={400}
                    height={280}
                    objectFit="cover"
                    className="w-full h-auto"
                  />
                </Link>
                <div className="flex justify-center items-center">
                  <Link
                    href={`/${post.slug}`}
                    className="rounded-full h-20 w-20 bg-blue-800 border-[5px] border-white transition-all hover:bg-blue-700 text-white -mt-10 flex justify-center items-center"
                    aria-label={`Read more about ${post.title}`}
                  >
                    <GoPlus className="size-10" />
                  </Link>
                </div>
                <div className="p-4">
                  <div className="flex justify-start items-center gap-1 mt-1 mb-4">
                    <Link
                      href="/about"
                      className="animated-underline text-slate-800 text-sm font-semibold underline decoration-blue-800 underline-offset-2"
                      aria-label="About the author"
                    >
                      Elisabeth Milner
                    </Link>
                    <span>
                      <RxDividerVertical className="text-slate-300" />
                    </span>
                    <p className="text-sm text-slate-500">{formatDate(post.date)}</p>
                  </div>
                  <Link href={`/${post.slug}`} aria-label={`Read ${post.title}`}>
                    <h2 className="text-lg leading-6 font-bold mb-3 text-blue-950 transition-all hover:text-blue-800 capitalize">
                      {post.title}
                    </h2>
                  </Link>
                  <p
                    className="text-gray-600 text-[15px]"
                    dangerouslySetInnerHTML={{ __html: truncateContent(post.content, 100) }}
                  />
                </div>
              </div>
            ))}
          </section>
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </section>
  );
};

export default PopularRecipes;
