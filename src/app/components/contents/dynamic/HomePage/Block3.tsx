import React from "react";
import Image from "next/image";
import Link from "next/link";
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
  return content.length > maxLength ? content.substring(0, maxLength) + "..." : content;
};

const TrendingRecipes = async () => {
  const posts = await blog_articles();

  return (
    <section className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto mb-24">
      <div className="flex flex-col items-center">
        <h2 className="text-violet-950 font-bold mb-5 text-3xl text-center uppercase">
          Tires{" "}
          <span className="bg-blue-800 font-semibold rounded text-white py-0.5 px-2">Pressure</span>
        </h2>
        <p className="text-slate-400 max-w-[600px] text-center mb-8">
          From breakfast to dinner, explore a variety of easy-to-follow recipes that bring bold flavors to your table without the hassle.
        </p>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/${post.slug}`} key={post.slug}>
                <article className="relative mb-8 break-inside-avoid">
                  <span className="absolute bg-white text-blue-950 text-sm font-semibold ml-2 mt-2 px-2 py-0.5 rounded-full">
                    {post.categories.nodes[0].name}
                  </span>
                  <Image
                    src={post.featuredImage?.node?.sourceUrl!}
                    alt={post.title}
                    width={400}
                    height={250}
                    className="w-full h-auto"
                  />
                  <h3 className="text-lg text-blue-800 transition-all hover:text-blue-950 font-bold my-2">
                    {post.title}
                  </h3>
                  <p
                    className="text-slate-500 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: truncateContent(post.content, 90),
                    }}
                  />
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </section>
  );
};

export default TrendingRecipes;