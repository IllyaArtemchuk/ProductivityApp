import { RootQueryType } from "./types/root_query_type";
import { GraphQLSchema } from "graphql";
import { mutation } from "./mutations";

export const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: mutation,
});
