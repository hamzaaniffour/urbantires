// /app/[...slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import { getContentBySlug, getAllSlugs } from "@/apis/graphql/content";
import { Metadata, ResolvingMetadata } from "next";
import Article from "../components/contents/dynamic/Signles/Article";
import Page from "../components/contents/dynamic/Signles/Page";
import Category from "../components/contents/dynamic/Signles/Category";
import SubCategory from "../components/contents/dynamic/Signles/SubCategory";

// import Page from "@/app/components/contents/dynamic/Content/Page";
// import Post from "@/app/components/contents/dynamic/Content/Post";
// import Category from "@/app/components/contents/dynamic/Content/Category";
// import SubCategory from "@/app/components/contents/dynamic/Content/SubCategory";

type Props = {
  params: { slug: string[] };
};

async function fetchContent(slug: string[]) {
  let content = await getContentBySlug(slug.join("/"));
  if (!content) {
    const parentSlug = slug[0];
    const parentContent = await getContentBySlug(parentSlug);
    if (parentContent?.type === "category") {
      const childSlug = slug.slice(1).join("/");
      content = await getContentBySlug(childSlug);
      if (content) {
        content = { ...content, parentSlug, isSubCategory: true };
      }
    }
  }
  return content;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const content = await fetchContent(params.slug);
  if (!content) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  const description =
    content.description ||
    (content.content ? content.content.substring(0, 160) : "");

  switch (content.type) {
    case "category":
      return { title: content.name, description };
    case "page":
      return { title: content.title, description };
    case "post":
      return {
        title: content.title,
        description: content.seo?.metaDesc || description,
        openGraph: {
          title: content.seo?.title || content.title,
          description: content.seo?.metaDesc || description,
          type: "article",
          publishedTime: content.seo?.opengraphPublishedTime,
          modifiedTime: content.seo?.opengraphModifiedTime,
          authors: [content.author?.node?.name],
          images: [
            {
              url: content.featuredImage?.node?.sourceUrl || "",
              alt: content.featuredImage?.node?.altText || "",
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: content.seo?.title || content.title,
          description: content.seo?.metaDesc || description,
          images: [content.featuredImage?.node?.sourceUrl || ""],
        },
      };
    default:
      return { title: "Content", description: "Dynamic content page" };
  }
}

export default async function DynamicPage({ params }: Props) {
  const content = await fetchContent(params.slug);
  if (!content) notFound();

  return content.isSubCategory ? (
    <SubCategory category={content} />
  ) : content.type === "category" ? (
    <Category category={content} />
  ) : content.type === "page" ? (
    <Page page={content} />
  ) : content.type === "post" ? (
    <Article post={content} featuredPosts={[]} />
  ) : (
    notFound()
  );
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug: slug.split("/") }));
}
