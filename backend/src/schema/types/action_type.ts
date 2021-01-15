import {
  GraphQLID,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const ActionType = new GraphQLObjectType({
  name: "ActionType",
  fields: () => ({
    id: { type: GraphQLID },
    timeStarted: { type: GraphQLString },
    timeEnded: { type: GraphQLString },
    minutes: { type: GraphQLInt },
  }),
});
