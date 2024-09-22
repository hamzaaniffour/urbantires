import React from "react";
import Image from "next/image";
import Link from "next/link";
import Miscellaneous from "../../../../public/assets/Miscellaneous.jpeg";
import SweetTreats from "../../../../public/assets/SweetTreats.jpeg";
import SavoryDishes from "../../../../public/assets/SavoryDishes.jpeg";
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

const TrendingRecipes = async () => {
  const posts = await blog_articles();

  return (
    <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto mb-24">
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-violet-950 font-bold mb-5 text-3xl text-center uppercase">
          Trending{" "}
          <span className="bg-amber-600 rounded text-white px-2 py-0.5">
            Recipes
          </span>
        </h2>
        <p className="text-slate-400 max-w-[600px] text-center mb-8">
          From breakfast to dinner, explore a variety of easy-to-follow recipes
          that bring bold flavors to your table without the hassle.
        </p>
        {posts.length > 0 ? (
          <section className="columns-1 sm:columns-2 lg:columns-2 xl:columns-3 gap-8">
            {posts.map((post) => (
              <Link href={`/${post.slug}`} key={post.slug}>
                <div className="break-inside-avoid mb-8">
                  <div className="flex justify-start items-start">
                    <span className="absolute bg-white text-black text-sm font-semibold ml-2 mt-2 px-2 py-0.5 rounded-full">
                      {post.categories.nodes[0].name}
                    </span>
                    <Image
                      src={post.featuredImage?.node?.sourceUrl!}
                      alt={post.title}
                      width={400}
                      height={250}
                    />
                  </div>
                  <h3 className="text-lg text-amber-600 transition-all hover:text-black font-bold my-2">
                    {post.title}
                  </h3>
                  <p
                    className="text-slate-500 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: truncateContent(post.content, 90),
                    }}
                  ></p>
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default TrendingRecipes;
