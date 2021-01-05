import { RootQueryType } from "./types/root_query_type";
import { GraphQLSchema } from "graphql";

const mutation = require("./mutations");

export const schema = new GraphQLSchema({
  query: RootQueryType,
});
