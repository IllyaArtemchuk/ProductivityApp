import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLString,
  GraphQLUnionType,
} from "graphql";
import { UserType } from "./types/user_type";
import {
  newCategory,
  newActivitiy,
  deleteCategory,
  deleteActivity,
  updateCurrentAction,
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
        color: { type: GraphQLString },
      },
      resolve(parentValue, { userID, categoryName, color }, req) {
        return newCategory(userID, categoryName, color);
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
        color: { type: GraphQLString },
      },
      resolve(
        parentValue,
        { userID, categoryName, activityTitle, color },
        req
      ) {
        return newActivitiy(userID, categoryName, activityTitle, color);
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
    updateCurrentAction: {
      type: UserType,
      args: {
        userID: { type: GraphQLString },
        category: { type: GraphQLString },
        activity: { type: GraphQLString },
        timeStarted: { type: GraphQLString },
        minutes: { type: GraphQLInt },
      },
      resolve(
        parentValue,
        { userID, category, activity, timeStarted, minutes },
        req
      ) {
        return updateCurrentAction(userID, {
          category,
          activity,
          timeStarted,
          minutes,
        });
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
        minutes: { type: GraphQLInt },
      },
      resolve(
        parentValue,
        {
          userID,
          categoryName,
          activityTitle,
          timeStarted,
          timeEnded,
          minutes,
        },
        req
      ) {
        return newAction(
          userID,
          categoryName,
          activityTitle,
          timeStarted,
          timeEnded,
          minutes
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
