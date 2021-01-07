import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const ActionType = new GraphQLObjectType({
  name: "ActionType",
  fields: () => ({
    id: { type: GraphQLID },
    timeStarted: { type: GraphQLString },
    timeEnded: { type: GraphQLString },
  }),
});
