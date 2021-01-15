import {
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLString,
} from "graphql";
import { findActions } from "../../controllers/ActionController";
import { ActionType } from "./action_type";

const ActivitiesType = new GraphQLObjectType({
  name: "ActivitiesType",
  fields: {
    title: { type: GraphQLString },
    color: { type: GraphQLString },
    actions: {
      type: new GraphQLList(ActionType),
      resolve(parentValue, args) {
        return findActions(parentValue.actions);
      },
    },
  },
});

const CategoriesType = new GraphQLObjectType({
  name: "CategoriesType",
  fields: {
    category_name: { type: GraphQLString },
    color: { type: GraphQLString },
    activities: { type: new GraphQLList(ActivitiesType) },
  },
});

export const CurrentActionType = new GraphQLObjectType({
  name: "CurrentActionType",
  fields: {
    category: { type: GraphQLString },
    activity: { type: GraphQLString },
    timeStarted: { type: GraphQLString },
    minutes: { type: GraphQLInt },
  },
});

export const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    currentAction: { type: CurrentActionType },
    categories: { type: new GraphQLList(CategoriesType) },
  }),
});
