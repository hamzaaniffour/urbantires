import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaPinterestP,
  FaRegShareSquare,
  FaWhatsapp,
} from "react-icons/fa";
import { CiViewTable } from "react-icons/ci";
import { blog_articles } from "@/apis/graphql/articles";
import { GetServerSideProps } from "next";
import { FaXTwitter } from "react-icons/fa6";
import { Frank_Ruhl_Libre } from "next/font/google";
import RecentPosts from "../Sidebar/RecentPosts";
import About from "../Sidebar/About";
import SideNewsletter from "../Sidebar/Newsletter";

const frank = Frank_Ruhl_Libre({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-old-standard-tt",
});

interface PostProps {
  post: {
    title: string;
    content: string;
    featuredImage: {
      node: {
        sourceUrl: string;
        altText: string;
      };
    } | null;
    slug: string;
    author: {
      node: {
        name: string;
        avatar: {
          url: string;
        };
      };
    };
    seo: {
      metaDesc: string;
      title: string;
      opengraphPublishedTime: string;
      readingTime: number;
    };
    categories: {
      nodes: { name: string; slug: string }[];
    };
  };
  featuredPosts: any[];
}

const formatDate = (dateString: string) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(dateString));
};

const truncateContent = (content: string, maxLength: number) => {
  return content.length > maxLength
    ? content.substring(0, maxLength) + "..."
    : content;
};

const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
};

const generateTableOfContents = (
  content: string
): {
  toc: { text: string; id: string; level: number }[];
  modifiedContent: string;
} => {
  const headingRegex = /<h([23])[^>]*>(.*?)<\/h[23]>/g;
  const toc: { text: string; id: string; level: number }[] = [];
  const modifiedContent = content.replace(
    headingRegex,
    (match, level, text) => {
      const cleanText = text.replace(/<[^>]+>/g, "").trim();
      const id = createSlug(cleanText);
      toc.push({ text: cleanText, id, level: parseInt(level) });
      return `<h${level} id="${id}">${text}</h${level}>`;
    }
  );

  return { toc, modifiedContent };
};

export default function Post({ post, featuredPosts = [] }: PostProps) {
  if (!post) {
    return <div>Post not found</div>;
  }

  const { toc, modifiedContent } = generateTableOfContents(post.content);

  return (
    <main className="max-w-[90%] sm:max-w-[95%] md:max-w-[1000px] lg:max-w-[1000px] xl:max-w-[1250px] mx-auto mt-16 mb-16">
      <div className="lg:flex gap-12">
        <TableOfContents toc={toc} />
        <MainContent
          post={post}
          modifiedContent={modifiedContent}
          featuredPosts={featuredPosts}
        />
        <Sidebar featuredPosts={featuredPosts} />
      </div>
      <MobileFooter />
    </main>
  );
}

const TableOfContents = ({ toc }: { toc: { text: string; id: string }[] }) => (
  <nav className="lg:w-2/12 hidden lg:block">
    <div className="sticky top-[100px]">
      <h2
        className={`font-semibold text-lg mb-4 uppercase underline text-slate-700 decoration-amber-500 underline-offset-[3px]`}
      >
        In This Recipe
      </h2>
      <ul>
        {toc.map((item) => (
          <li key={item.id} className="mb-2.5">
            <Link
              href={`#${item.id}`}
              className="toc-link text-zinc-500 text-md transition-all hover:text-slate-950"
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

const MainContent = ({
  post,
  modifiedContent,
  featuredPosts,
}: {
  post: PostProps["post"];
  modifiedContent: string;
  featuredPosts: any[];
}) => (
  <article className="lg:w-7/12">
    <header>
      <nav aria-label="Breadcrumb" className="-mb-3">
        <ol className="flex justify-start items-center gap-2">
          <li className="text-zinc-950 text-xs font-bold uppercase">
            <Link href="/">Home</Link>
          </li>
          <li className="inline-block text-slate-500 text-sm">/</li>
          <li className="text-zinc-950 text-xs font-bold uppercase">
            <Link href={`/${post.categories.nodes[0].slug}`}>
              {post.categories.nodes[0].name}
            </Link>
          </li>
          <li className="inline-block text-slate-500 text-sm">/</li>
          <li
            className="text-zinc-950 text-xs font-bold uppercase"
            aria-current="page"
          >
            {truncateContent(post.title, 30)}
          </li>
        </ol>
      </nav>
      <h1
        className={`${frank.className} text-3xl lg:text-4xl lg:leading-[45px] font-black text-black`}
      >
        {post.title}
      </h1>
      <p className="text-slate-500 text-md my-5">{post.seo.metaDesc}</p>
      <div className="flex justify-start items-center gap-3">
        <div
          className="h-11 w-11 bg-slate-200 rounded-full bg-cover bg-center"
          style={{ backgroundImage: `url(${post.author.node.avatar.url})` }}
        ></div>
        <div className="flex justify-center items-start flex-col">
          <p className="text-slate-900 uppercase text-sm font-bold">
            by: <Link href="/about" className="hover:text-amber-600 transition-all duration-500">{post.author.node.name}</Link>
          </p>
          <time
            dateTime={post.seo.opengraphPublishedTime}
            className="text-slate-500 capitalize text-sm"
          >
            Updated: {formatDate(post.seo.opengraphPublishedTime)}
          </time>
        </div>
      </div>

      <div className="w-full flex justify-start items-center gap-1.5 mb-2 mt-6">
        <ul className="flex justify-center items-center gap-1">
          <li>
            <a
              href="#"
              className="bg-[#1877F2] text-white flex justify-center items-center w-14 h-8"
            >
              <FaFacebookF className="h-5 w-5" />
              <span className="sr-only">Share on Facebook</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="bg-black text-white flex justify-center items-center w-14 h-8"
            >
              <FaXTwitter className="h-5 w-5" />
              <span className="sr-only">Share on Twitter</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="bg-[#E60023] text-white flex justify-center items-center w-14 h-8"
            >
              <FaPinterestP className="h-5 w-5" />
              <span className="sr-only">Share on Pinterest</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="bg-[#25D366] text-white flex justify-center items-center w-14 h-8"
            >
              <FaWhatsapp className="h-5 w-5" />
              <span className="sr-only">Share on WhatsApp</span>
            </a>
          </li>
        </ul>
      </div>
    </header>

    <section>
      {post.featuredImage && (
        <figure>
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            width={0}
            height={0}
            layout="responsive"
            className="mb-8 rounded w-full h-full"
          />
          {post.featuredImage.node.altText && (
            <figcaption className="sr-only">
              {post.featuredImage.node.altText}
            </figcaption>
          )}
        </figure>
      )}

      <div
        className="post_content text-zinc-900 text-[17px] tracking-[.2px] leading-[1.5] mb-8"
        dangerouslySetInnerHTML={{ __html: modifiedContent }}
      />
    </section>
  </article>
);

const Sidebar = ({ featuredPosts }: { featuredPosts?: any[] }) => (
  <div className="lg:w-3/12">
    <About />
    <SideNewsletter />
    <RecentPosts />
  </div>
);

const MobileFooter = () => (
  <footer className="fixed w-full bg-zinc-900 py-4 px-3 left-0 bottom-0 lg:hidden rounded-t-xl">
    <div className="grid grid-cols-2 gap-2">
      <button className="py-2 bg-zinc-900 border-[1px] border-zinc-600 font-semibold !w-full rounded-full text-zinc-50">
        <CiViewTable className="inline-block text-zinc-50 size-5 relative -top-[2.5px] mr-0.5" />{" "}
        In This Recipe
      </button>
      <button className="py-2 bg-zinc-900 border-[1px] border-zinc-600 font-semibold !w-full rounded-full text-zinc-50">
        <FaRegShareSquare className="inline-block text-zinc-50 size-4 relative -top-[2.5px] mr-0.5" />{" "}
        Share
      </button>
    </div>
  </footer>
);

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const featuredPosts = await blog_articles();
    return { props: { featuredPosts } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { featuredPosts: [] } };
  }
};
