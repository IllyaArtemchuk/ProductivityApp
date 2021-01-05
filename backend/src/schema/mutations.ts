import { GraphQLObjectType, GraphQLString } from "graphql";
import { UserType } from "./types/user_type";

export const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createCategory: {
            type: UserType,
            args: {
                
            }
        }
    }
})