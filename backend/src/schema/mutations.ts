import { GraphQLObjectType, GraphQLScalarType, GraphQLString } from "graphql";
import { UserType } from "./types/user_type";
import {
  newCategory,
  newActivitiy,
  deleteCategory,
  deleteActivity,
} from "../controllers/UserController";
import { ActionType } from "./types/action_type";
import { newAction, deleteAction } from "../controllers/ActionController";

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
    createAction: {
      type: ActionType,
      args: {
        userID: { type: GraphQLString },
        categoryName: { type: GraphQLString },
        activityTitle: { type: GraphQLString },
        timeStarted: { type: GraphQLString },
        timeEnded: { type: GraphQLString },
      },
      resolve(
        parentValue,
        { userID, categoryName, activityTitle, timeStarted, timeEnded },
        req
      ) {
        return newAction(
          userID,
          categoryName,
          activityTitle,
          timeStarted,
          timeEnded
        );
      },
    },
    deleteAction: {
      type: ActionType,
      args: {
        actionID: { type: GraphQLString },
        userID: { type: GraphQLString },
        categoryName: { type: GraphQLString },
        activityTitle: { type: GraphQLString },
      },
      resolve(
        parentValue,
        { actionID, userID, categoryName, activityTitle },
        req
      ) {
        return deleteAction(actionID, userID, categoryName, activityTitle);
      },
    },
  },
});
