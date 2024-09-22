import { gql } from "graphql-request";
import { client } from "@/apis/graphql/graphql-client";

export interface Post {
  id: string;
  title: string;
  date: string;
  content: string;
  seo: {
    metaDesc: string;
    title: string;
    opengraphPublishedTime: string;
    opengraphModifiedTime: string;
  };
  slug: string;
  author: {
    node: {
      name: string;
    };
  };
  categories: {
    nodes: {
      name: string;
      slug: string;
    }[];
  };
  featuredImage: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  } | null;
}

interface PostsQueryResult {
  posts: {
    nodes: Post[];
  };
}

// Sweet Treats Queries
const SweetTreats = gql`
  query GetPosts {
    posts(
      first: 3
      where: {
        orderby: { field: DATE, order: DESC }
        categoryName: "Garden Furniture"
      }
    ) {
      nodes {
        id
        title
        content
        date
        slug
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
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
        }
      }
    }
  }
`;
// Sweet Treats Posts
export async function sweet_treats_articles(): Promise<Post[]> {
  try {
    const data = await client.request<PostsQueryResult>(SweetTreats);
    return data.posts.nodes;
  } catch (error) {
    return [];
  }
}

// Savory Dishes Queries
const SavoryDishes = gql`
  query GetPosts {
    posts(
      first: 3
      where: {
        orderby: { field: DATE, order: DESC }
        categoryName: "Tyre Sizes"
      }
    ) {
      nodes {
        id
        title
        content
        slug
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
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
        }
      }
    }
  }
`;
// TYRE_PRESSURE Posts
export async function savory_dishes_articles(): Promise<Post[]> {
  try {
    const data = await client.request<PostsQueryResult>(SavoryDishes);
    return data.posts.nodes;
  } catch (error) {
    return [];
  }
}

// Miscellaneous Queries
const Miscellaneous = gql`
  query GetPosts {
    posts(
      first: 3
      where: {
        orderby: { field: DATE, order: DESC }
        categoryName: "Bike Tyres"
      }
    ) {
      nodes {
        id
        title
        content
        slug
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
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
        }
      }
    }
  }
`;
// Miscellaneous Posts
export async function miscellaneous_articles(): Promise<Post[]> {
  try {
    const data = await client.request<PostsQueryResult>(Miscellaneous);
    return data.posts.nodes;
  } catch (error) {
    return [];
  }
}

const AllPosts = gql`
  query GetPosts {
    posts(
      first: 12
    ) {
      nodes {
        id
        title
        content
        date
        slug
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
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
        }
      }
    }
  }
`;
// Blog Page Articles
export async function blog_articles(): Promise<Post[]> {
  try {
    const data = await client.request<PostsQueryResult>(AllPosts);
    return data.posts.nodes;
  } catch (error) {
    return [];
  }
}
