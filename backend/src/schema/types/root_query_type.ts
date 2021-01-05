import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { UserType } from "./user_type";

export const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, args, req) {
        return req.user;
      },
    },
  },
});
