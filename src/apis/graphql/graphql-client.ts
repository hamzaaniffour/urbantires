import { GraphQLClient } from "graphql-request";

const endpoint = `https://dev-tastyeats.pantheonsite.io/graphql`;
export const client = new GraphQLClient(endpoint);
