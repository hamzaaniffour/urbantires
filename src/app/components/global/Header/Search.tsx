"use client";
import { Frank_Ruhl_Libre } from "next/font/google";
import React, { useState } from "react";
import { RiSearch2Line, RiCloseLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Link from "next/link";

interface Post {
  id: number;
  title: {
    rendered: string;
  };
  slug: string;
  content: {
    rendered: string;
  };
  _embedded: {
    "wp:featuredmedia": [
      {
        source_url: string;
        alt_text: string;
      }
    ];
  };
}

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

const Search = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const handleSearchClick = async () => {
    if (searchTerm.trim()) {
      setLoading(true);
      NProgress.start();

      const response = await fetch(
        `https://dev-tastyeats.pantheonsite.io/wp-json/wp/v2/posts?search=${encodeURIComponent(
          searchTerm
        )}&_embed`
      );
      const data: Post[] = await response.json();
      setPosts(data);

      NProgress.done();
      setLoading(false);
    }
  };

  const searchVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <div>
      {showSearch ? (
        <RiCloseLine
          className="text-slate-500 transition-all hover:text-slate-800 h-5 w-5 cursor-pointer"
          onClick={handleSearch}
        />
      ) : (
        <RiSearch2Line
          className="text-slate-500 transition-all hover:text-slate-800 h-5 w-5 cursor-pointer"
          onClick={handleSearch}
        />
      )}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={searchVariants}
            transition={{ duration: 0.3 }}
            className="bg-slate-50 border-t-[1px] border-slate-100 py-1.5 pb-0.5 w-full h-screen absolute left-0 mt-5 shadow overflow-y-auto max-h-[calc(100vh-100px)]"
          >
            <div className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1300px] mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearchClick();
                }}
                className="flex justify-center items-center"
              >
                <input
                  type="text"
                  placeholder="Search the site..."
                  className={`${frank.className} py-2 outline-none w-full placeholder:text-slate-400 bg-transparent text-2xl`}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                  type="submit"
                  className="mt-2 py-2 px-4 bg-blue-600 text-white rounded font-semibold"
                >
                  Search
                </button>
              </form>

              {loading ? (
                <div className="mt-2 text-center">Loading...</div>
              ) : (
                <div className="mt-2 overflow-y-auto custom-scrollbar">
                  {posts.length > 0 && (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-t-2 border-slate-100 pt-5">
                      {posts.map((post) => (
                        <li key={post.slug} className="flex flex-col h-full">
                          <Link
                            href={post.slug}
                            onClick={handleSearch}
                            className="!text-left flex flex-col h-full"
                          >
                            <div className="flex-grow">
                              {post._embedded?.["wp:featuredmedia"] && (
                                <Image
                                  src={
                                    post._embedded["wp:featuredmedia"][0]
                                      .source_url
                                  }
                                  alt={
                                    post._embedded["wp:featuredmedia"][0]
                                      .alt_text
                                  }
                                  className="w-full h-48 object-cover mb-3"
                                  width={400}
                                  height={200}
                                  quality={100}
                                />
                              )}
                              <h3 className="text-blue-600 text-xl hover:underline mb-3">
                                {post.title.rendered}
                              </h3>
                              <div
                                className="text-sm text-gray-600"
                                dangerouslySetInnerHTML={{
                                  __html: truncateContent(
                                    post.content.rendered,
                                    120
                                  ),
                                }}
                              />
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;
