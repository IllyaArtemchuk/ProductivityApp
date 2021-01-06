import { GraphQLObjectType, GraphQLScalarType, GraphQLString } from "graphql";
import { UserType } from "./types/user_type";
import {
  newCategory,
  newActivitiy,
  deleteCategory,
  deleteActivity,
} from "../controllers/UserController";

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
    deleteCategory: {
      type: UserType,
      args: {
        userID: { type: GraphQLString },
        categoryName: { type: GraphQLString },
      },
      resolve(parentValue, { userID, categoryName }, req) {
        return deleteCategory(userID, categoryName);
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
    deleteActivity: {
      type: UserType,
      args: {
        userID: { type: GraphQLString },
        categoryName: { type: GraphQLString },
        activityTitle: { type: GraphQLString },
      },
      resolve(parentValue, { userID, categoryName, activityTitle }, req) {
        return deleteActivity(userID, categoryName, activityTitle);
      },
    },
  },
});
