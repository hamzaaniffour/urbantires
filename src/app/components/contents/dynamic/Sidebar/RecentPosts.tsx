import React from "react";
import { Frank_Ruhl_Libre } from "next/font/google";
import { author_details } from "@/apis/graphql/author";
import Image from "next/image";
import Link from "next/link";
import { blog_articles } from "@/apis/graphql/articles";

const frank = Frank_Ruhl_Libre({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-old-standard-tt",
});

const truncateContent = (content: string, maxLength: number) => {
  if (content.length > maxLength) {
    return content.substring(0, maxLength) + "...";
  }
  return content;
};

const RecentPosts = async () => {
  const posts = await blog_articles();

  return (
    <div className="mb-8 sticky top-[80px]">
      <h2
        className={`${frank.className} text-3xl md:leading-[60px] -mb-6 text-blue-950 font-black relative z-30`}
      >
        Recent Posts
      </h2>
      <div className="h-2 bg-pink-200 mb-5 max-w-[170px]"></div>
      <div>
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li className="mb-3" key={post.slug}>
                <Link
                  href={`/${post.slug}`}
                  className="flex justify-center items-center gap-2"
                >
                  <Image
                    src={post.featuredImage?.node?.sourceUrl!}
                    alt={post.featuredImage?.node?.altText || post.title}
                    width={80}
                    height={30}
                    className="float-left w-20 rounded"
                  />
                  <div className="flex-col">
                    <h3 className="text-[13px] mb-1 text-blue-950 font-semibold">
                      {truncateContent(post.title!, 40)}
                    </h3>
                    <p className="text-[11px] text-slate-600">
                      By: {post.author?.node?.name}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
};

export default RecentPosts;
