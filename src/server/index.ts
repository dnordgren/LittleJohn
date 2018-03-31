import {
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

const UserType: GraphQLObjectType = require("./types/user");

const RootQueryType: GraphQLObjectType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => {
    return {
      user: {
        type: UserType,
        description: "", // todo
        args: {
          apiKey: { type: new GraphQLNonNull(GraphQLString) },
        },
        resolve: (obj, args, { loaders }) => {
          return loaders.usersByApiKeys.load(args.apiKey);
        },
      },
    };
  },
});

const ljSchema: GraphQLSchema = new GraphQLSchema({
  query: RootQueryType,
});

module.exports = ljSchema;
