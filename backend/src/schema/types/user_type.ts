import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { findActions } from "../../controllers/ActionController";
import { ActionType } from "./action_type";

const ActivitiesType = new GraphQLObjectType({
  name: "ActivitiesType",
  fields: {
    title: { type: GraphQLString },
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
    activities: { type: new GraphQLList(ActivitiesType) },
  },
});

export const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    categories: { type: new GraphQLList(CategoriesType) },
  }),
});
