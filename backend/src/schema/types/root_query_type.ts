import { GraphQLObjectType, GraphQLID, GraphQLString } from "graphql";
import { ActionType } from "./action_type";
import { UserType } from "./user_type";
import { getUser } from "../../controllers/UserController";

export const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parentValue, { id }, req) {
        return getUser(id);
      },
    },
    currentUser: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      },
    },
  },
});
