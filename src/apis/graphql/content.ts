import { gql } from "@apollo/client";
import client from "@/apis/apollo/apollo-client";

export async function getAllSlugs() {
  const { data } = await client.query({
    query: gql`
      query GetAllSlugs {
        categories(first: 100) {
          nodes {
            slug
          }
        }
        pages(first: 100) {
          nodes {
            slug
          }
        }
        posts {
          nodes {
            slug
          }
        }
      }
    `,
  });

  return [
    ...data.categories.nodes.map((n: { slug: any }) => n.slug),
    ...data.pages.nodes.map((n: { slug: any }) => n.slug),
    ...data.posts.nodes.map((n: { slug: any }) => n.slug),
  ];
}

export async function getContentBySlug(slug: string) {
  const { data } = await client.query({
    query: gql`
      query GetContentBySlug($slug: ID!) {
        category(id: $slug, idType: SLUG) {
          id
          name
          slug
          categoryImage
          description
          posts(first: 5, where: { orderby: { field: DATE, order: DESC } }) {
            nodes {
              title
              slug
              content
              date
              seo {
                readingTime
              }
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
          children {
            nodes {
              name
              slug
              description
              posts {
                nodes {
                  title
                  date
                  slug
                  content
                  featuredImage {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                }
              }
            }
          }
        }

        page(id: $slug, idType: URI) {
          id
          title
          content
          slug
        }

        post(id: $slug, idType: SLUG) {
          id
          title
          content
          slug
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          seo {
            metaDesc
            title
            opengraphPublishedTime
            opengraphModifiedTime
            readingTime
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    `,
    variables: { slug },
  });

  if (data.category) return { ...data.category, type: "category" };
  if (data.page) return { ...data.page, type: "page" };
  if (data.post) return { ...data.post, type: "post" };

  return null;
}
