import { GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "./types/user_type";
import { newCategory, newActivitiy } from "../controllers/UserController";

export const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createCategory: {
      type: UserType,
      args: {
        userID: { type: GraphQLString },
        categoryName: { type: GraphQLString },
      },
      resolve(parentValue, { userID, categoryName }, req) {
        return newCategory(userID, categoryName);
      },
    },
    createActivity: {
      type: UserType,
      args: {
        userID: { type: GraphQLString },
        categoryName: { type: GraphQLString },
        activityTitle: { type: GraphQLString },
      },
      resolve(parentValue, { userID, categoryName, activityTitle }, req) {
        return newActivitiy(userID, categoryName, activityTitle);
      },
    },
  },
});
