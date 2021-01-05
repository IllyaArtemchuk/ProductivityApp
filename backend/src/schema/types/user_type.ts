import { GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

const ActivitiesType = new GraphQLObjectType({
  name: "ActivitiesType",
  fields: {
    title: { type: GraphQLString },
  },
});

const CategoriesType = new GraphQLObjectType({
  name: "CategoriesType",
  fields: {
    name: { type: GraphQLString },
    activities: { type: new GraphQLList(ActivitiesType) },
  },
});

export const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
    categories: { type: new GraphQLList(CategoriesType) },
  }),
});
